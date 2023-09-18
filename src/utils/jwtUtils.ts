const jwt = require('jsonwebtoken')
const crypto = require('crypto')
import { Context } from 'koa'
import ApiMsg from '../common/api-msg'

export interface JwtOptions {
    secret: string;
    expiresIn: number;
    excludePath: Array<RegExp>;
}

export enum TokenErrorType {
    TOKEN_EXPIRED_ERROR = 'TokenExpiredError',
    JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError'
}

class JwtUtils {
    public secret: string;
    public expiresIn: number;
    public excludePath: Array<RegExp>;
    private static instance: JwtUtils = null;
    public constructor(options: JwtOptions) {
        const { secret, expiresIn, excludePath } = options;
        // logger.info(options)
        // console.log(options);
        
        this.secret = crypto.createHmac('sha256', secret).digest('hex')
        this.excludePath = excludePath
        this.expiresIn = expiresIn;
        // console.log(this.secret);
        
    }
    public async validateToken(ctx: Context, next): Promise<void> {
        const path = ctx.request.path;
        // 校验是否为请求白名单
        const isExcludePath = this.excludePath.some(function (e: RegExp) {
            // console.log(e);
            
            return e.test(path);
        })
        if (isExcludePath) {
            return await next();
        }
        const token = (ctx.get('Authorization') || '').split(' ').pop();
        if (!token) {
            // emitter.emit('errorResponse', ctx, HttpStatus.UNAUTHORIZED, '请求未携带token,请检查请求头');
            ctx.body = ApiMsg.authInvalid('请求未携带token,请检查请求头')
            return;
        }
        try {
            const { id } = jwt.verify(token, this.secret) as { id: number } // 校验不通过会抛出错误
        } catch (error) {
            const { name } = error;
            switch (name) {
                case TokenErrorType.TOKEN_EXPIRED_ERROR: {
                    // emitter.emit('errorResponse', ctx, HttpStatus.UNAUTHORIZED, 'token已过期');
                    ctx.body = ApiMsg.authInvalid('token已过期')
                    break;
                }
                case TokenErrorType.JSON_WEB_TOKEN_ERROR: {
                    // emitter.emit('errorResponse', ctx, HttpStatus.UNAUTHORIZED, '非法token');
                    ctx.body = ApiMsg.authInvalid('非法token')
                    break;
                }
                default:
                    break;
            }
            return;
        }
        await next()
    }
    public auth(ctx: Context, payload) {
        const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
        return token;
    }
    public static getInstance() {
        if (!JwtUtils.instance) {
            JwtUtils.instance = new JwtUtils({
                excludePath: [
                    /\/api\/admin\/user\/login/,
                    /\/swagger-html/,
                    /\/swagger-json/,
                    /\/uploads\/\w+/,
                    /\/captcha/,
                ],
                secret: 'Gertlova',
                expiresIn: 60 * 60 * 24
            });
        }
        return JwtUtils.instance;
    }
}
const jwtUtils = Object.freeze(JwtUtils.getInstance());
export default jwtUtils;
