import CommonService from '../service/common-service';

export default class CommonController {
  static async uploadFile(ctx) {
    ctx.body = await CommonService.uploadFile();
  }
}
