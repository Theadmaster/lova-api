import CommonController from '../controller/common-controller';

export default [
  {
    path: '/v1/uploadFile',
    method: 'post',
    action: CommonController.uploadFile
  }
];
