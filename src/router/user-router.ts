import UserController from '../controller/user-controller';

const baseApi: string = '/api/v1'

export default [
  {
    path: baseApi + '/addUser',
    method: 'post',
    action: UserController.addUser
  }
];
