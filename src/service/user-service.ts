import { Context } from 'koa';
import { getManager } from 'typeorm';
import User from '../entity/user';
import UserAdmin from '../entity/user-admin';
import ApiMsg from '../common/api-msg';
import jwtUtils from '../utils/jwtUtils';

let username;

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

      return ApiMsg.success('login success')
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
}
