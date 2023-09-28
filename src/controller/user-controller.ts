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
    
    ctx.body = await UserService.adminLogin(ctx, loginForm)
  }

  static async getAdminUserInfo(ctx) {

    ctx.body = await UserService.getAdminUserInfo(ctx)

  }

  static async miniUserLogin(ctx) {

    let code = ctx.request.body.code

    console.log('code:', code);

    ctx.body = await UserService.miniUserLogin(ctx, code)
  }

  static async saveMiniUserInfo(ctx) {
    let userInfo = ctx.request.body

    // console.log('userinfo:', userInfo);

    ctx.body = await UserService.saveMiniUserInfo(ctx, userInfo)
  }
}
