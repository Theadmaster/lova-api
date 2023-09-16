import UserService from '../service/user-service';

export default class UserController {
  static async addUser(ctx) {

    let query:object = ctx.request.query
    let body:object = ctx.request.body
    console.log( query, body);
    
    
    ctx.body = await UserService.addUser();
  }

  static async adminLogin(ctx) {

    interface Login {
      username: string,
      password: string
    }

    let loginForm:Login = ctx.request.body
    // console.log(loginForm);
    
    ctx.body = await UserService.adminLogin(loginForm);
  }
}
