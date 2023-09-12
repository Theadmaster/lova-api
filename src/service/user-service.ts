import { Context } from 'koa';
import { getManager } from 'typeorm';
import User from '../entity/user';

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
}
