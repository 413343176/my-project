let Util = {

  /**
   * sdk版本号
   * @type {number}
   */
  version: 0.1,
  checkFileSize: function (fileSize) {
    let maxFileSize = 2 * 1024 * 1024;
    if (fileSize > maxFileSize) {
      return false
    }
    return true;
  },
  /**
   * 发送网络请求，通信协议必须是http或https，数据协议必须是json
   * @param {number} fileSize 文件大小
   * @param {number} ind 序号
   */
  formatFileSize: function (fileSize, ind) {
    var units = ["B", "KB", "MB", "GB"];
    if (fileSize < 1024 || ind === units.length - 1) {
      return fileSize.toFixed(1) + units[ind];
    }
    return this.formatFileSize(fileSize / 1024, ++ind);

  },

  showError(error, vueComponet) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data.message);
      console.log(error.response.status);
      console.log(error.response.headers);
      vueComponet.$message({
        showClose: true,
        message: error.response.data.message,
        type: "error"
      });
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  },
  dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString() // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  },
  splitFileName(path) {
    let last_len = path.lastIndexOf(".");
    let len = path.length;
    let prefixPath = path.substring(0, last_len);
    let suffixPath = path.substring(last_len, len);
    return [prefixPath, suffixPath]
  }

}
export default Util;
