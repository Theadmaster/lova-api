import { Context } from 'koa';
import { getManager } from 'typeorm';
import User from '../entity/user';
import UserAdmin from 'src/entity/user-admin';
import ApiMsg from 'src/common/api-msg';

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

  static async adminLogin(loginForm: any) {

    const UserRepository = getManager().getRepository(UserAdmin)
                         
    // const user = await UserRepository.createQueryBuilder("user_admin")
    //             .select(['username', 'password', 'auth'])
    //             .where({username: loginForm.username})
    //             .getOne()
    // console.log('shuch', user);

    const user = await UserRepository.query(`select * from user_admin where user_admin.username=${loginForm.username}`)
    
    if (user && user.password === loginForm.password) {
      let info = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
      return ApiMsg.success('login success', info)
    } else {
      return ApiMsg.parameterError('用户名或密码错误！请重新登陆。')
    }
  }
}
