const fs = require('fs')
const path = require('path')

/** 判断文件的类型，是不是属于图片,传入请求头的mimetype */
exports.isImg = (mimetype) => {
    const imgMimeArr = ["image/gif","image/x-png","image/pjpeg","image/jpeg","image/bmp","image/png"]
    return imgMimeArr.includes(mimetype)
}

/** 封装一个方法，传入读取文件的地址和写入文件的地址 同步写入 */
exports.writeInFile = (readPath, writePath) => {
    const fileData = fs.readFileSync(readPath) //拿到文件先读 拿到读的值
    fs.writeFileSync(writePath, fileData)  //再写入到预设地址当中，（图片存储的地址）
}

/** 给文件重新命名防止文件覆盖，加上时间戳的方法 */
exports.rename = (name) => {
    let timer = Number(new Date())
    return timer + name
}


/** 判断有没有这两个文件夹，没有就创建这两个 */
exports.isHasDir = () => {
    const uploadFileDir = path.resolve(__dirname, '../public/files');
    const uploadImgDir = path.resolve(__dirname, '../public/images');
    const uploadMdDir = path.resolve(__dirname, '../public/md');
	if (!fs.existsSync(uploadFileDir)) {
		fs.mkdirSync(uploadFileDir)
    }
    if (!fs.existsSync(uploadImgDir)) {
		fs.mkdirSync(uploadImgDir)
    }
    if (!fs.existsSync(uploadMdDir)) {
		fs.mkdirSync(uploadMdDir)
	}
}

//去除查询参数里面的空值
exports.removeEmpty = function(obj){
    let resObj = {}
    for (const i in obj) {
       if(obj[i]){
           resObj[i] = obj[i]
       }
    }
    return resObj;
}