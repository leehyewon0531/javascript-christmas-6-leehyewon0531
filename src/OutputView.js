import { OUTPUT_LIST, GUIDE_MSG } from "./constants/guideMsg.js";
import { Console } from '@woowacourse/mission-utils';

const OutputView = {
	printOrderMenu() {
		Console.print(OUTPUT_LIST.orderMenu);
	},

	printBeforeDiscount() {
		Console.print(OUTPUT_LIST.beforeDiscount);
	},

	printGiveaway() {
		Console.print(OUTPUT_LIST.giveaway);
	},

	printBenefitDetails() {
		Console.print(OUTPUT_LIST.benefitDetails);
	},

	printTotalBenefit() {
		Console.print(OUTPUT_LIST.totalBenefit);
	},

	printAfterDiscount() {
		Console.print(OUTPUT_LIST.afterDiscount);
	},

	printEventBadge() {
		Console.print(OUTPUT_LIST.eventBadge);
	},

	printWelcomeMsg() {
		Console.print(GUIDE_MSG.welcome);
	},

	printEventBenefitMsg(date) {
		Console.print(date+GUIDE_MSG.eventBenefit);
	},

	printMsg(msg) {
		Console.print(msg);
	}
}

export default OutputView;