export default class Utility {
  /**
   * Generates a string of given length
   * 
   * @static
   * @param {Number} stringLength 
   * @returns 
   * @memberof Utility
   */
  static generateRandomString(stringLength) {
    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < stringLength; i++)
      text += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

    return text;
  }

  /**
   * Deep merges objects sent as arguments
   * 
   * @static
   * @returns 
   * @memberof Utility
   */
  static merge() {
    let result = {};
    if (!arguments || !arguments.length) {
      return result;
    }

    for (let i = 0; i < arguments.length; i++) {
      let currentArg = arguments[i];
      if (!currentArg) {
        continue;
      }
      Object.keys(currentArg).forEach(key => {
        if (Utility.isObject(currentArg[key]) && result[key] && Utility.isObject(result[key])) {
          result[key] = Utility.merge(result[key], currentArg[key]);
        } else {
          result[key] = currentArg[key];
        }
      });
    }
    return result;
  }

  /**
   * Determines if a variable is Plain JS Object
   * 
   * @static
   * @param {any} data 
   * @returns {Boolean}
   * @memberof Utility
   */
  static isObject(data) {
    if (!data) return false;
    return (Object.prototype.toString.call(data) === '[object Object]');
  }
}