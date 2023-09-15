const env = process.env.NODE_ENV;

module.exports = {
  type: 'mysql',
  host: 'gertyt.cn',
  // host: 'http://101.34.73.36',
  port: 3306,
  username: 'root',
  password: 'gert-mysql',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [`${env == 'dev' ? 'src' : 'dist'}/entity/*{.ts,.js}`]
};
