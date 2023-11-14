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
    this.showOrderMenu(menuAndQuantity);
  }

  showOrderMenu(menuAndQuan) {
    OutputView.printOrderMenu();
    const formattedList = this.formatOrderMenu(menuAndQuan);
    OutputView.printMsg(formattedList);
  }

  formatOrderMenu(menuAndQuan) {
    const splitMenu = menuAndQuan.split(',');
    let result = '';
    splitMenu.forEach(el => {
      const [menu, quantity] = el.split('-');
      result += `${menu} ${quantity}개\n`;
    });
    return result;
  }
}

export default EventRunner;