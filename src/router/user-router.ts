import UserController from '../controller/user-controller';

const baseUrl = '/admin'

const routes = [
  {
    path: '/addUser',
    method: 'post',
    action: UserController.addUser
  },
  {
    path: '/user/login',
    method: 'post',
    action: UserController.adminLogin
  },
  {
    path: '/user/info',
    method: 'get',
    action: UserController.getAdminUserInfo
  },
]

routes.forEach(route => route.path = baseUrl + route.path)

export default routes;
