import EventRunner from "./EventRunner.js";

class App {
  async run() {
    const runner = new EventRunner();

    runner.run();
  }
}

export default App;
