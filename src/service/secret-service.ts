import { Context } from 'koa';
import { createQueryBuilder, getManager } from 'typeorm';
import Secret from '../entity/secret';
import ApiMsg from '../common/api-msg';

export default class SecretService {
  static async addSentence(sentenceInfo: any) {
    
    const SecretRepository = getManager().getRepository(Secret);

    let secret = new Secret()
    secret.text = sentenceInfo.text
    secret.countdown = sentenceInfo.countdown
    secret.level = sentenceInfo.level
    
    const newCategory = SecretRepository.create(secret);
    
    await SecretRepository.save(newCategory);

    return ApiMsg.success('添加成功！');
  }

  static async deleteSentence(sentenceInfo: any) {
    
    const SecretRepository = getManager().getRepository(Secret);

    let id = sentenceInfo.sentenceId

    const sentence = await SecretRepository.findOne({ where: {id: id}})
    
    await SecretRepository.delete(sentence);
    
    return ApiMsg.success('添加成功！');
  }

  static async getSententces(page: any) {
    const list = await getManager().getRepository(Secret)
                .createQueryBuilder("secret")
                // .skip(page.pageNum * page.pageSize)
                .orderBy("RAND()")
                .take(page.pageSize)
                .getMany()

    let res = { data: list }

    return ApiMsg.success('获取成功!', res)
  }
}
