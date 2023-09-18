import 'reflect-metadata';
import * as Koa from 'koa';
import * as cors from 'koa2-cors'
import { createConnection } from 'typeorm';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import jwtUtils from './utils/jwtUtils';
import AppRoutes from './router/index';


createConnection()
  .then(async connection => {
    // create koa app
    const app = new Koa();
    const router = new Router();
    const port = process.env.PORT || 3000;

    router.prefix('/api')
    
    // auth jwt
    router.use(['/admin'], jwtUtils.validateToken.bind(jwtUtils))
    
    // register all application routes
    AppRoutes.forEach(route => router[route.method](route.path, route.action));

    app.use(cors())
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(port);

    console.log(`应用启动成功 端口:${port}`);
  })
  .catch(error => console.log('TypeORM 链接失败: ', error));
