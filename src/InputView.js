import { GUIDE_MSG } from "./constants/guideMsg.js";
import { Console } from "@woowacourse/mission-utils";

const InputView = {
	async readDate() {
		const input = await Console.readLineAsync(GUIDE_MSG.visitDate);
		return input;
	},

	async readMenu() {
		const input = await Console.readLineAsync(GUIDE_MSG.menuAndQuantity);
		return input;
	}
}

export default InputView;