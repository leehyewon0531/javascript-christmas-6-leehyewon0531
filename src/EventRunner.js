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
  }
}

export default EventRunner;