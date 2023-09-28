import { Context } from 'koa';
import { getManager } from 'typeorm';
import Moment from '../entity/moment';
import ApiMsg from '../common/api-msg';

export default class MomentService {
  // 获取时刻
  static async getMoments(context: Context, body: any) {
    const { page, userId, coupleId} = body

    const MomentRepository = getManager().getRepository(Moment);
    try {
      let userIdsToFind = [userId, coupleId]
      const list = await MomentRepository.createQueryBuilder("moment")
                    .where("moment.user_id IN (:...userIds)", { userIds: userIdsToFind })
                    .skip((page.pageNum-1) * page.pageSize)
                    .take(page.pageSize)
                    .getMany()
      return ApiMsg.success('success', {data: list})
    } catch (error) {
      return ApiMsg.databaseError(error)
    }

  }

  // 创建时刻
  static async addMoment(context: Context, body: any) {
    const { nickName, location, text, images, video, userId } = body;
    try {
      const MomentRepository = getManager().getRepository(Moment);
      let moment = new Moment()
      moment.user_id = userId
      moment.nickname = nickName
      moment.location = location
      const momentRes = await MomentRepository.create(body)

      return ApiMsg.success('success', momentRes)
    } catch (error) {
      return ApiMsg.databaseError(error)
    }
    
  }

  // 删除时刻
  static async deleteMoment(context: Context, body: any) {
    
  }

}
