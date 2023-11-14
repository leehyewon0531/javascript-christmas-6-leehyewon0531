import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class EventRunner {
  async run() {
    OutputView.printWelcomeMsg();
    const visitDate = await InputView.readDate();
    // visitDate 유효성 검사

    const menuAndQuantity = await InputView.readMenu();
    // menuAndQuantity 유효성 검사

    OutputView.printEventBenefitMsg(`12월 ${visitDate}일에 `);

    const menuObj = this.makeOrderMenuObj(menuAndQuantity);
    this.showOrderMenu(menuObj);
  }

  showOrderMenu(menuObj) {
    OutputView.printOrderMenu();
    const formattedList = this.formatOrderMenu(menuObj);
    OutputView.printMsg(formattedList);
  }

  formatOrderMenu(menuObj) {
    let result = '';
    for (const key in menuObj) {
      result += `${key} ${menuObj[key]}개\n`;
    }
    return result;
  }

  makeOrderMenuObj(menuAndQuan) {
    const obj = {};
    const splitMenu = menuAndQuan.split(',');
    splitMenu.forEach(el => {
      const [menu, quantity] = el.split('-');
      obj[menu] = quantity;
    });
    return obj;
  }
}

export default EventRunner;