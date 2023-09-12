import SecretService from '../service/secret-service';

export default class SecretController {
  static async addSentence(ctx) {

    let body:any = ctx.request.body

    ctx.body = await SecretService.addSentence(body);
  }

  static async deleteSentence(ctx) {

    let body:any = ctx.request.body

    ctx.body = await SecretService.deleteSentence(body);
  }

  static async getSentences(ctx) {

    let body:any = ctx.request.body

    ctx.body = await SecretService.getSententces(body);
  }
}
