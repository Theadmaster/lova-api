export default class ApiMsg {
    /**
     * status
     * 400 请求错误，一般是参数不合法
     * 401 登录过期
     * 200 成功
     * 500 数据库或其他内部异常
     * <p>
     * msg 返回消息
     * data 返回数据
     * error 错误堆栈信息
     */
    private status: number;
    private msg: string;
    private data: object;
    private error: string;

    public static sessionInvalid(): ApiMsg {
        let msg: ApiMsg = new ApiMsg();
        msg.setStatus(401);
        msg.setMsg("登录状态已过期，请重新登录!");
        return msg;
    }

    public static authInvalid(msgstr: string = "请求受限"): ApiMsg {
        let msg: ApiMsg= new ApiMsg();
        msg.setStatus(403);
        msg.setMsg(msgstr);
        return msg;
    }

    public static parameterError(msgStr: string): ApiMsg {
        let msg: ApiMsg = new ApiMsg();
        msg.setStatus(400);
        msg.setMsg(msgStr);
        return msg;
    }

    public static databaseError(msgStr: string, errorMsg?: string): ApiMsg {
        let msg: ApiMsg = new ApiMsg();
        msg.setStatus(500);
        msg.setMsg(msgStr);
        errorMsg && msg.setError(errorMsg);
        return msg;
    }

    public static success(msgStr: string, obj?: object): ApiMsg {
        let msg: ApiMsg = new ApiMsg();
        msg.setMsg(msgStr);
        msg.setStatus(200);
        obj && msg.setData(obj);
        return msg;
    }

    public getStatus():number {
        return this.status;
    }

    public setStatus(status: number):void {
        this.status = status;
    }

    public getMsg():string {
        return this.msg;
    }

    public setMsg(msg: string):void {
        this.msg = msg;
    }

    public getData(): object {
        return this.data;
    }

    public setData(data: object): void {
        this.data = data;
    }

    public getError(): string {
        return this.error;
    }

    public setError(error: string): void {
        this.error = error;
    }
}
