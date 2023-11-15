import InputView from "./InputView.js";
import { appetizer } from "./MenuList/appetizer.js";
import { beverage } from "./MenuList/beverage.js";
import { dessert } from "./MenuList/dessert.js";
import { mainMenu } from "./MenuList/mainMenu.js";
import OutputView from "./OutputView.js";
import { BENEFIT_LIST } from "./constants/benefits.js";
import { GIVEAWAY_LIST } from "./constants/giveaway.js";

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
    this.showBeforeDiscount(menuObj);
    this.showGiveaway(menuObj);
    this.showBenefitDetails(visitDate, menuObj);
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

  showBeforeDiscount(menuObj) {
    OutputView.printBeforeDiscount();
    const calculatedPrice = this.calculateBeforeDiscount(menuObj);
    const addedCommaPrice = this.addCommas(calculatedPrice);
    OutputView.printMsg(`${addedCommaPrice}원\n`);
  }

  calculateBeforeDiscount(menuObj) {
    const keys = Object.keys(menuObj);
    let result = 0;

    keys.forEach(el => {
      result += this.findPrice(el) * menuObj[el];
    })

    return result;
  }

  addCommas(num) {
    return num.toLocaleString('ko-KR');
  }
  
  findPrice(name) {
    for (const key in appetizer) {
      if(appetizer[key].get_name == name) return appetizer[key].get_price;
    }
    for (const key in beverage) {
      if(beverage[key].get_name == name) return beverage[key].get_price;
    }
    for (const key in dessert) {
      if(dessert[key].get_name == name) return dessert[key].get_price;
    }
    for (const key in mainMenu) {
      if(mainMenu[key].get_name == name) return mainMenu[key].get_price;
    }
  }

  showGiveaway(menuObj) {
    OutputView.printGiveaway();
    const calculateBeforeDiscount = this.calculateBeforeDiscount(menuObj);
    if(calculateBeforeDiscount >= 120000) {
      OutputView.printMsg(GIVEAWAY_LIST.champagneGiveaway);
      return;
    }
    if(calculateBeforeDiscount < 120000) {
      OutputView.printMsg(GIVEAWAY_LIST.none);
      return;
    }
  }

  showBenefitDetails(visitDate, menuObj) {
    OutputView.printBenefitDetails();
    const calculateBeforeDiscount = this.calculateBeforeDiscount(menuObj);
    if(calculateBeforeDiscount < 10000) {
      OutputView.printMsg(BENEFIT_LIST.none);
      return;
    }
    if(calculateBeforeDiscount >= 10000) {
      const formattedChristmasDday = this.addCommas(this.calculateChristmasDday(visitDate));
      OutputView.printMsg(BENEFIT_LIST.christmasDday + `-${formattedChristmasDday}원\n`);
      
    }
  }

  calculateChristmasDday(visitDate) {
    if(visitDate > 25) return 0;
    if(visitDate <= 25) return (1000 + (visitDate - 1) * 100);
  }
}

export default EventRunner;