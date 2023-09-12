import UserService from '../service/user-service';

export default class HomeController {
  static async addUser(ctx) {
    ctx.body = await UserService.addUser();
  }
}
