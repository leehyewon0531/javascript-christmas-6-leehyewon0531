import InputView from "./InputView.js";
import OutputView from "./OutputView.js";

class App {
  async run() {
    OutputView.printWelcomeMsg();
    InputView.readDate();
  }
}

export default App;
