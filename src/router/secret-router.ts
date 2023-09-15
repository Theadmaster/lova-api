import SecretController from '../controller/secret-controller';

const baseApi: string = '/api/v1'

export default [
  {
    path: baseApi + '/addSentence',
    method: 'post',
    action: SecretController.addSentence
  },
  {
    path: baseApi + '/deleteSentence',
    method: 'post',
    action: SecretController.deleteSentence
  },
  {
    path: baseApi + '/getSentences',
    method: 'post',
    action: SecretController.getSentences
  },
  {
    path: baseApi + '/getAllSentences',
    method: 'post',
    action: SecretController.getAllSentences
  },
  {
    path: baseApi + '/modifySentence',
    method: 'post',
    action: SecretController.modifySentence
  },
];
