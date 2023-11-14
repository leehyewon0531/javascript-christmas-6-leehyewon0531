import { BENEFIT_LIST, GUIDE_MSG } from "./constants/guideMsg.js";
import { Console } from '@woowacourse/mission-utils';

const OutputView = {
	printOrderMenu() {
		Console.print(BENEFIT_LIST.orderMenu);
	},

	printBeforeDiscount() {
		Console.print(BENEFIT_LIST.beforeDiscount);
	},

	printGiveaway() {
		Console.print(BENEFIT_LIST.giveaway);
	},

	printBenefitDetails() {
		Console.print(BENEFIT_LIST.benefitDetails);
	},

	printTotalBenefit() {
		Console.print(BENEFIT_LIST.totalBenefit);
	},

	printAfterDiscount() {
		Console.print(BENEFIT_LIST.afterDiscount);
	},

	printEventBadge() {
		Console.print(BENEFIT_LIST.eventBadge);
	},

	printWelcomeMsg() {
		Console.print(GUIDE_MSG.welcome);
	},

	printEventBenefitMsg() {
		Console.print(GUIDE_MSG.eventBenefit);
	}
}

export default OutputView;