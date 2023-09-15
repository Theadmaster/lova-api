import Secret from 'src/entity/secret';
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
    interface Page {
        pageNum: number | undefined,
        pageSize: number
    }
    let page:Page = body

    ctx.body = await SecretService.getSentences(page);
  }

  static async getAllSentences(ctx) {

    let body:any = ctx.request.body
    interface Page {
        pageNum: number,
        pageSize: number
    }
    let page:Page = body

    ctx.body = await SecretService.getAllSentences(page);
  }

  static async modifySentence(ctx) {

    let body:Secret = ctx.request.body
    

    ctx.body = await SecretService.modifySentence(body);
  }
}
