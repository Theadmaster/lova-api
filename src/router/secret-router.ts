import SecretController from '../controller/secret-controller';


export default [
  {
    path: '/admin/addSentence',
    method: 'post',
    action: SecretController.addSentence
  },
  {
    path: '/admin/deleteSentence',
    method: 'post',
    action: SecretController.deleteSentence
  },
  {
    path: '/v1/getSentences',
    method: 'post',
    action: SecretController.getSentences
  },
  {
    path: '/admin/getAllSentences',
    method: 'post',
    action: SecretController.getAllSentences
  },
  {
    path: '/admin/modifySentence',
    method: 'post',
    action: SecretController.modifySentence
  },
];
