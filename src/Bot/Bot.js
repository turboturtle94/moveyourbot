export default class Bot {
    constructor(x, y) {
        this.xCoord = x;
        this.yCoord = y;
        this.prevXCoord = x;
        this.prevYCoord = y;
        this.weight = 0;
    }
    getCurrentPosition() {
        return {
            xCoord: this.xCoord,
            yCoord: this.yCoord
        }
    }
    setCurrentPosition(x, y) {
        this.xCoord = x;
        this.yCoord = y;
    }
    getPrevPosition() {
        return {
            xCoord: this.prevXCoord,
            yCoord: this.prevYCoord
        }
    }
    setPrevPosition(x, y) {
        this.prevXCoord = x;
        this.prevYCoord = y;
    }
    moveBot(direction) {
        const { x, y } = this.getCurrentPosition();
        this.setPrevPosition(x, y);
        switch (direction)
        {
            case "E":
                this.setCurrentPosition(x, y + 1);
                break;
            case "W":
                this.setCurrentPosition(x, y - 1);
                break;
            case "S":
                this.setCurrentPosition(x + 1, y);
                break;
            case "N":
                this.setCurrentPosition(x - 1, y);
                break;
            case "NE":
                this.setCurrentPosition(x - 1, y + 1);
                break;
            case "NW":
                this.setCurrentPosition(x - 1, y - 1);
                break;
            case "SE":
                this.setCurrentPosition(x + 1, y + 1);
                break;
            case "SW":
                this.setCurrentPosition(x + 1, y - 1);
                break;
            default: return this.getCurrentPosition();
        }
        return this.getCurrentPosition();
    }


}