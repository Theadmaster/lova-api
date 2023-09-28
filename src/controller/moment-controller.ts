import MomentService from '../service/moment-service';

export default class MomentController {
  static async getMoments(ctx) {
    // userId \ coupleId \ page
    let body = ctx.request.body
    ctx.body = await MomentService.getMoments(ctx, body);
  }

  static async addMoment(ctx) {

    let body = ctx.request.body
    ctx.body = await MomentService.addMoment(ctx, body);
  }

  static async deleteMoment(ctx) {

    let body = ctx.request.body
    ctx.body = await MomentService.deleteMoment(ctx, body);
  }
}
