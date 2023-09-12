import UserService from '../service/user-service';

export default class UserController {
  static async addUser(ctx) {

    let query:object = ctx.request.query
    let body:object = ctx.request.body
    console.log( query, body);
    
    
    ctx.body = await UserService.addUser();
  }
}
