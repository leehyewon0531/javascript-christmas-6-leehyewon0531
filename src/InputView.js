import { GUIDE_MSG } from "./constants/guideMsg";

const InputView = {
    async readDate() {
        const input = await Console.readLineAsync(GUIDE_MSG.visitDate);
        return input;
    }
}

export default InputView;