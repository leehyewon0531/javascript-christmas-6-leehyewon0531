import { ERROR_MSG } from "./constants/errorMsg.js";

class Validator {
  static makeErrorMsg(errorMsg) {
    return `[ERROR] ${errorMsg}`;
  }

  static isValidDate(date) {
    const dateNum = Number(date);
    if((dateNum < 1) || (dateNum > 31)) throw new Error(this.makeErrorMsg(ERROR_MSG.invalidDate));
  }

  static isNumber(value, errorMsg) {
    const regEx = /^[1-9]\d*$/;
    if(!value.match(regEx)) throw new Error(this.makeErrorMsg(errorMsg));
  }

  static isValidMenu(menuAndQuan) {
    if(this.checkComma(menuAndQuan)) {
      const splitArr = menuAndQuan.split(',');
      this.isValidMenuFormat(splitArr);
      return;
    }
    if(!this.checkComma(menuAndQuan)) {
      this.isValidMenuFormatEach(menuAndQuan);
      return;
    }
  }

  static isValidMenuFormat(splitArr) {
    splitArr.forEach(el => {
      if(this.checkWhitespace(el)) throw new Error(this.makeErrorMsg(ERROR_MSG.invalidMenuFormat));
      this.isValidMenuFormatEach(el);
    })
  }

  static isValidMenuFormatEach(el) {
    if(!this.checkHyphen(el)) throw new Error(this.makeErrorMsg(ERROR_MSG.invalidMenuFormat));
    
    const eachArr = el.split('-');
    if(!this.isKorean(eachArr[0])) throw new Error(this.makeErrorMsg(ERROR_MSG.invalidMenuFormat));
    this.isNumber(eachArr[1], ERROR_MSG.invalidMenuFormat);
  }

  static isKorean(str) {
    const koreanRegex = /^[가-힣]*$/;
    return koreanRegex.test(str);
  }

  static checkWhitespace(str) {
    return /\s/.test(str);
  }

  static checkHyphen(str) {
    return /-/.test(str);
  }

  static checkComma(str) {
    return /,/.test(str);
  }
}

export default Validator;