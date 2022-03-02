export default class Bot {
    constructor(x, y) {
        this.xCoord = x;
        this.yCoord = y;
        this.prevXCoord = x;
        this.prevYCoord = y;
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
        switch (direction)
        {
            case "E": return this.getCurrentPosition();
            case "W": return this.getCurrentPosition();
            case "S": return this.getCurrentPosition();
            case "N": return this.getCurrentPosition();
            case "NE": return this.getCurrentPosition();
            case "NW": return this.getCurrentPosition();
            case "NE": return this.getCurrentPosition();
            case "SE": return this.getCurrentPosition();
            case "SW": return this.getCurrentPosition();
            default: return this.getCurrentPosition();
        }
    }
}