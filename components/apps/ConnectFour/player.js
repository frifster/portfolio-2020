import { COMPUTER } from "./constants";

export class Player {
    constructor(token, type = COMPUTER) {
        this.playerToken = token;
        this.playerType = type;
    }

    static chooseRandomColumn(validColumns) {
        const randomIndex = Math.floor(Math.random() * validColumns.length)

        return validColumns[randomIndex]
    }

    intelligentChooseOfRandomColumn(validColumns) {
        // TODO: ADD Strategy so that com player can choose intelligently
    }

    toString() {
        return `${this.playerToken}`
    }

    valueOf() {
        return this.playerToken
    }
}
