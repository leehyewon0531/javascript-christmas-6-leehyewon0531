import InputView from "./InputView.js";
import { appetizer } from "./MenuList/appetizer.js";
import { beverage } from "./MenuList/beverage.js";
import { dessert } from "./MenuList/dessert.js";
import { mainMenu } from "./MenuList/mainMenu.js";
import OutputView from "./OutputView.js";
import { BENEFIT_LIST } from "./constants/benefits.js";
import { GIVEAWAY_LIST } from "./constants/giveaway.js";
import { starDayArr, weekendArr } from "./constants/day.js";
import { BADGES } from "./constants/badges.js";
import Validator from "./Validator.js";
import { ERROR_MSG } from "./constants/errorMsg.js";

class EventRunner {
  async run() {
    OutputView.printWelcomeMsg();
    let flag = false;
    let visitDate = '';

    do {
      try {
        visitDate = await InputView.readDate();
        Validator.isNumber(visitDate, ERROR_MSG.invalidDate);
        Validator.isValidDate(visitDate);

        flag = true;
      } catch(err) {
        OutputView.printMsg(err.message);
      }
    } while(!flag);

    flag = false;
    let menuAndQuantity = '';
    let menuObj = {};

    do {
      try {
        menuAndQuantity = await InputView.readMenu();
        Validator.isValidMenu(menuAndQuantity);

        menuObj = this.makeOrderMenuObj(menuAndQuantity);
        Validator.isInMenu(menuObj);
        Validator.isOverRange(menuObj);
        Validator.isOnlyBeverage(menuObj);

        flag = true;
      } catch(err) {
        OutputView.printMsg(err.message);
      }
    } while(!flag);

    OutputView.printEventBenefitMsg(`12월 ${visitDate}일에 `);

    this.showOrderMenu(menuObj);
    this.showBeforeDiscount(menuObj);
    this.showGiveaway(menuObj);
    const totalDiscount = this.showBenefitDetails(visitDate, menuObj);
    this.showTotalBenefit(totalDiscount);
    this.showAfterDiscount(this.calculateBeforeDiscount(menuObj) - totalDiscount + (this.calculateGiveaway(menuObj) ? 25000 : 0));
    this.showEventBadge(totalDiscount);
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
    const menuArr = [];
    const splitMenu = menuAndQuan.split(',');
    splitMenu.forEach(el => {
      const [menu, quantity] = el.split('-');
      menuArr.push(menu);
      obj[menu] = quantity;
    });
    Validator.isDuplicateMenu(menuArr);
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
    const appetizerKey = EventRunner.findInAppetizer(name);
    if(appetizerKey) return appetizer[appetizerKey].get_price;
    
    const beverageKey = EventRunner.findInBeverage(name);
    if(beverageKey) return beverage[beverageKey].get_price;

    const dessertKey = EventRunner.findInDessert(name);
    if(dessertKey) return dessert[dessertKey].get_price;

    const mainMenuKey = EventRunner.findInMainMenu(name);
    if(mainMenuKey) return mainMenu[mainMenuKey].get_price;
  }

  static findInAppetizer(name) {
    for (const key in appetizer) {
      if(appetizer[key].get_name == name) return key;
    }
    return '';
  }

  static findInBeverage(name) {
    for (const key in beverage) {
      if(beverage[key].get_name == name) return key;
    }
    return '';
  }

  static findInDessert(name) {
    for (const key in dessert) {
      if(dessert[key].get_name == name) return key;
    }
    return '';
  }

  static findInMainMenu(name) {
    for (const key in mainMenu) {
      if(mainMenu[key].get_name == name) return key;
    }
    return '';
  }

  showGiveaway(menuObj) {
    OutputView.printGiveaway();
    
    if(this.calculateGiveaway(menuObj)){
      OutputView.printMsg(GIVEAWAY_LIST.champagneGiveaway);
      return;
    }
    if(!this.calculateGiveaway(menuObj)) {
      OutputView.printMsg(GIVEAWAY_LIST.none);
      return;
    }
  }

  calculateGiveaway(menuObj) {
    const beforeDiscount = this.calculateBeforeDiscount(menuObj);
    if(beforeDiscount >= 120000) return true;
    if(beforeDiscount < 120000) return false;
  }

  showBenefitDetails(visitDate, menuObj) {
    OutputView.printBenefitDetails();
    let totalDiscount = 0;

    const calculateBeforeDiscount = this.calculateBeforeDiscount(menuObj);
    if(calculateBeforeDiscount < 10000) {
      OutputView.printMsg(BENEFIT_LIST.none);
      return 0;
    }
    if(calculateBeforeDiscount >= 10000) {
      const christmasDdayDiscount = this.calculateChristmasDday(visitDate);
      totalDiscount += christmasDdayDiscount;
      const formattedChristmasDday = this.addCommas(christmasDdayDiscount);
      OutputView.printMsg(BENEFIT_LIST.christmasDday + `-${formattedChristmasDday}원`);
      
      const weekdayDiscount = this.calculateWeekday(visitDate, menuObj);
      totalDiscount += weekdayDiscount;
      const formattedWeekday = this.addCommas(weekdayDiscount);
      OutputView.printMsg(BENEFIT_LIST.weekday + `-${formattedWeekday}원`);

      const specialDiscount = this.calculateSpecial(visitDate);
      totalDiscount += specialDiscount;
      const formattedSpecial = this.addCommas(specialDiscount);
      OutputView.printMsg(BENEFIT_LIST.special + `-${formattedSpecial}원`);

      const giveawayDiscount = this.calculateGiveaway(menuObj) ? 25000 : 0;
      totalDiscount += giveawayDiscount;
      const formattedGiveaway = this.addCommas(giveawayDiscount);
      OutputView.printMsg(BENEFIT_LIST.giveawayEvent + `-${formattedGiveaway}원\n`);

      return totalDiscount;
    }
  }

  calculateChristmasDday(visitDate) {
    if(visitDate > 25) return 0;
    if(visitDate <= 25) return (1000 + (visitDate - 1) * 100);
  }

  calculateWeekday(visitDate, menuObj) {
    if(weekendArr.includes(Number(visitDate))) return 0;

    let dessertCnt = 0;
    if(!weekendArr.includes(Number(visitDate))) {
      const keys = Object.keys(menuObj);

      keys.forEach(el => {
        if(EventRunner.findInDessert(el)) dessertCnt += menuObj[el];
      })

      return dessertCnt * 2023;
    }
  }

  calculateSpecial(visitDate) {
    if(starDayArr.includes(Number(visitDate))) return 1000;
    if(!starDayArr.includes(Number(visitDate))) return 0;
  }

  showTotalBenefit(total) {
    OutputView.printTotalBenefit();
    const formattedTotal = this.addCommas(total);
    OutputView.printMsg(`-${formattedTotal}원\n`);
  }

  showAfterDiscount(afterDiscount) {
    OutputView.printAfterDiscount();
    const formattedAfterDiscount = this.addCommas(afterDiscount);
    OutputView.printMsg(`${formattedAfterDiscount}원\n`);
  }

  showEventBadge(totalDiscount) {
    OutputView.printEventBadge();
    
    if(totalDiscount < 5000) {
      OutputView.printMsg(BADGES.none);
      return;
    }

    if((totalDiscount >= 5000) && (totalDiscount < 10000)) {
      OutputView.printMsg(BADGES.star);
      return;
    }

    if((totalDiscount >= 10000) && (totalDiscount < 20000)) {
      OutputView.printMsg(BADGES.tree);
      return;
    }

    if(totalDiscount >= 20000) {
      OutputView.printMsg(BADGES.santa);
      return;
    }
  }
}

export default EventRunner;