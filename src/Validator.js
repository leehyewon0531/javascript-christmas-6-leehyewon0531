import { ERROR_MSG } from "./constants/errorMsg.js";

class Validator {
  static makeErrorMsg(errorMsg) {
    return `[ERROR] ${errorMsg}`;
  }

  static isValidDate(date) {
    const dateNum = Number(date);
    if((dateNum < 1) || (dateNum > 31)) throw new Error(this.makeErrorMsg(ERROR_MSG.invalidDate));
  }

  static isNumber(value) {
    const regEx = /^[1-9]\d*$/;
    if(!value.match(regEx)) throw new Error(this.makeErrorMsg(ERROR_MSG.invalidDate));
  }
}

export default Validator;