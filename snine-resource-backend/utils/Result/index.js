const { CODE_ERROR, CODE_SUCCESS, CODE_TOKEN_EXPIRED, CODE_REPEAT, CODE_WARNING } = require('../constant/index')

/**
 * data:返回的数据
 * msg:提示信息语，不传或者传一个参数默认操作成功
 * options： 更多额外的参数
 * @desc：调用该方法返回，统一返回格式。
 * @demo：new Result(resData,'上传成功').success(res)
 */
class Result {
    constructor ( data, msg = '操作成功', options) {
        this.data = null
        if(arguments.length === 0){
            this.msg = '操作成功'
        } else if (arguments.length === 1) {
            this.data = data
            this.msg = '操作成功'
        } else {
            this.data = data 
            this.msg = msg 
            if(options) {
                this.options = options
            }
        }
    }

    createResult() {
        if (!this.code) {
            this.code = CODE_SUCCESS
        }
        let base = {
            code: this.code,
            msg: this.msg
        }

        if (this.data) {
            base.data = this.data
        }

        if (this.options) {
            base = { ...base, ...this.options}
        }
        return base;
    }

    json(res) {
        res.json(this.createResult())
    }

    success(res) {
        this.code = CODE_SUCCESS
        this.json(res)
    }

    fail(res) {
        this.code = CODE_ERROR
        this.json(res)
    }

    warning(res) {
        this.code = CODE_WARNING
        this.json(res)
    }

    repeat(res){
        this.code = CODE_REPEAT
        this.json(res)
    }

    jwtError(res) {
        this.code = CODE_TOKEN_EXPIRED
        this.json(res)
    }
}

module.exports = Result