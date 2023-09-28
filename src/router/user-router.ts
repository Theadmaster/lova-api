import UserController from '../controller/user-controller';

// const baseUrl = '/admin'

const routes = [
  {
    path: '/admin/addUser',
    method: 'post',
    action: UserController.addUser
  },
  {
    path: '/admin/user/login',
    method: 'post',
    action: UserController.adminLogin
  },
  {
    path: '/admin/user/info',
    method: 'get',
    action: UserController.getAdminUserInfo
  },
  {
    path: '/v1/mini/login',
    method: 'post',
    action: UserController.miniUserLogin
  },
  {
    path: '/v1/mini/userInfo',
    method: 'post',
    action: UserController.saveMiniUserInfo
  },
]

// routes.forEach(route => route.path = baseUrl + route.path)

export default routes;
