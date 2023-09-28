import MomentController from '../controller/moment-controller';

export default [
  {
    path: '/v1/getMoments',
    method: 'get',
    action: MomentController.getMoments
  },
  {
    path: '/v1/addMoment',
    method: 'post',
    action: MomentController.addMoment
  },
  {
    path: '/v1/deleteMoment',
    method: 'post',
    action: MomentController.deleteMoment
  },

];
