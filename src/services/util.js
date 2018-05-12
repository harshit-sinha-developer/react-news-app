export default class Utility {
  static generateRandomString(stringLength) {
    const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < stringLength; i++)
      text += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));

    return text;
  }
}