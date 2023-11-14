import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.printWelcomeMsg();
    const visitDate = await InputView.readDate();
    // visitDate 유효성 검사

    const menuAndQuantity = await InputView.readMenu();
    // menuAndQuantity 유효성 검사

    OutputView.printEventBenefitMsg();
  }
}

export default App;
