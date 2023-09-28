import { Context } from 'koa';
import { getManager, getConnection } from 'typeorm';
import User from '../entity/user';
import UserAdmin from '../entity/user-admin';
import ApiMsg from '../common/api-msg';
import jwtUtils from '../utils/jwtUtils';
const axios = require('axios')
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')

import { AppSecret, AppID } from '../common/pub-config'

// admin
let username;
// const AppSecret = '134af51c2671be35b4b8909e4b154cbf'
// const AppID = 'wxe3eed3038a9689bc'

export default class UserService {
  static async addUser(context?: Context) {

    const UserRepository = getManager().getRepository(User);

    let user = new User()
    user.username = 'Gert'
    user.gender = 1
    user.appid = '123'
    user.openid= '333'
    user.nickname = 'tyt'
    user.unionid = 'huencashdfagasdf'
    user.session_key = 'asdjlkhju'
    user.access_token = 'qiwhfnaklsujdnf'
    user.phone = '19858185202'
    user.user_id = '12314'

    const newCategory = UserRepository.create(user);

    await UserRepository.save(newCategory);

    return 'add success';
  }

  // admin login
  static async adminLogin(ctx: Context, loginForm: any) {

    const UserRepository = getManager().getRepository(UserAdmin)
                         
    // const user = await UserRepository.createQueryBuilder("user_admin")
    //             .select(['username', 'password', 'auth'])
    //             .where({username: loginForm.username})
    //             .getOne()
    // console.log('shuch', user);

    const user = await UserRepository.createQueryBuilder("userAdmin")
                .where("userAdmin.username = :username", {username: loginForm.username})
                .getOne()

    if (user && user.password === loginForm.password) {
      let token = jwtUtils.auth(ctx, loginForm)
      username = loginForm.username

      return ApiMsg.success('login success', {token: token})
    } else {
      return ApiMsg.parameterError('用户名或密码错误！请重新登陆。')
    }
  }

  static async getAdminUserInfo(ctx: Context) {
    const UserRepository = getManager().getRepository(UserAdmin)

    const userInfo = await UserRepository.createQueryBuilder("userAdmin")
                    .select([ 'userAdmin.avatar', 'userAdmin.role'])
                    .where("userAdmin.username = :username", {username: username})
                    .getOne()

    return ApiMsg.success('success', userInfo)
  }

  // wechat mini-program login
  static async miniUserLogin(ctx: Context, code: string) {
    
    let openid:string;
    let session_key: string;

    await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`)
    .then(({data}) => {
      console.log(data);
      openid = data.openid
      session_key = data.session_key
    }).catch(err => {
      console.log(err);
    })
    try {
      const UserRepository = getManager().getRepository(User)
      await UserRepository.createQueryBuilder()
                  .insert()
                  .into(User)
                  .values([{openid: openid, session_key: session_key}])
                  .execute()

    } catch (e) {
      return ApiMsg.databaseError(e)
    }

    return ApiMsg.success('success', {openid: openid, session_key: session_key})
  }

  // store mini program user info 
  static async saveMiniUserInfo(ctx: Context, userInfo: any) {

    // decode rowData
    const {openId, sessionKey, encryptedData, iv} = userInfo

    const data = userInfo.userInfo

    // let pc = new WXBizDataCrypt(AppID, sessionKey)

    // console.log('pc', pc);

    // let data = pc.decryptData(encryptedData , iv)

    // console.log('解密后 data: ', data)

    try {
      const UserRepository = getManager().getRepository(User)
      
      const recordToUpdate = await UserRepository.findOne({ where: { openid: openId} });
      let userId:number;
      
      if (recordToUpdate) {
        userId = recordToUpdate.id
        recordToUpdate.nickname = data.nickName;
        recordToUpdate.avatar = data.avatarUrl;
        recordToUpdate.gender = data.gender;
      
        await UserRepository.save(recordToUpdate);
      }
      // await getConnection()
      //     .createQueryBuilder()
      //     .update(User)
      //     .set({nickname: data.nickName, avatar: data.avatarUrl, gender: data.gender})
      //     .where('openid=:openid', {openid: openid})
      //     .execute()
      return ApiMsg.success('success', { userId })
    } catch(e) {
      console.log(e);
      
      return ApiMsg.databaseError(e)
    }

    
  }
}
