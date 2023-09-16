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

    let id = sentenceInfo.id

    const sentence = await SecretRepository.findOne({ where: {id: id}})
    
    await SecretRepository.delete(sentence);
    
    return ApiMsg.success('添加成功！');
  }

  // mini rand
  static async getSentences(page: any) {
    const list = await getManager().getRepository(Secret)
                .createQueryBuilder("secret")
                // .skip(page.pageNum * page.pageSize)
                .orderBy("RAND()")
                .take(page.pageSize)
                .getMany()

    let res = { data: list }

    return ApiMsg.success('获取成功!', res)
  }

  // get all sentences
  static async getAllSentences(page: any) {
    const SecretRepository = getManager().getRepository(Secret)
    const count = await SecretRepository.createQueryBuilder("secret")
                  .getCount()

    const list = await SecretRepository
                .createQueryBuilder("secret")
                .skip((page.pageNum-1) * page.pageSize)
                .take(page.pageSize)
                .getMany()

    let res = { data: list, pageInfo: {
      pageNum: page.pageNum,
      pageSize: page.pageSize,
      count: count
    } }

    return ApiMsg.success('获取成功!', res)
  }

  // modify
  static async modifySentence(sentenceInfo: Secret) {

    console.log('info', sentenceInfo);

    let sentence = new Secret()
    sentence.text = sentenceInfo.text
    sentence.countdown = sentenceInfo.countdown
    sentence.level = sentenceInfo.level
    
    await getManager().getRepository(Secret)
        .createQueryBuilder()
        .update(Secret)
        .set(sentence)
        .where({ id: sentenceInfo.id })
        .execute();

    return ApiMsg.success('修改成功！');
  }
}
