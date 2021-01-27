/**
* 发送邮件
* @param {string} to 收件方邮箱
* @param {string} title 内容标题
* @param {string} verCode 邮件内容
* 
*/
exports.sendEmail =  (to,title,verCode) => {
  const nodemailer = require('nodemailer'); //引入依赖
  /**
   * 详细配置文件地址： node_modules/lib/well-known/services
   */
  let transporter = nodemailer.createTransport({
    //   host: 'smtp.163.com',
    //   port: 465,
    //   secure: true,
      service: '163', // 代号吧 设置后无需设置主机端口选项 详情https://nodemailer.com/smtp/well-known/
      auth: {
          user: 'J_longyan@163.com', //发送方邮箱
          pass: 'VBMDOMUNNDEQQUTW' //发送方邮箱的授权码,一般去邮箱设置里面找，应该可以找到
      }
  });
  let path = 'www.baidu.com'
  let info = {
      from: 'J_longyan@163.com',//发送方邮箱
      to: to, 
      subject: title,
      html: `欢迎注册Snine资源系统，您的验证码是：${verCode}，请 <a href=${path}>点此激活您的账户</a> ,有效期五分钟！,`
      // text:''  也可以用纯文本 二选一
  }
    //发送邮件
  return new Promise( (resolve,reject) => {
    transporter.sendMail(info,(err,data) => {
        err ? reject(err) : resolve(data)
    })
  })
}
