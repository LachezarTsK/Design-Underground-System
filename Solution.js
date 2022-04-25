
var UndergroundSystem = function () {
    this.checkInData = new Map();
    this.journeyData = new Map();
};

/** 
 * @param {number} ID 
 * @param {string} checkInStation 
 * @param {number} checkInTime
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (ID, checkInStation, checkInTime) {
    this.checkInData.set(ID, new CheckIn(checkInStation, checkInTime));
};

/** 
 * @param {number} ID 
 * @param {string} checkOutStation 
 * @param {number} checkOutTime
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (ID, checkOutStation, checkOutTime) {
    let checkIn = this.checkInData.get(ID);
    this.checkInData.delete(ID);

    let journey = checkIn.checkInStation + "->" + checkOutStation;
    if (!this.journeyData.has(journey)) {
        this.journeyData.set(journey, [0, 0]);
    }

    this.journeyData.get(journey)[0] += checkOutTime - checkIn.checkInTime;
    this.journeyData.get(journey)[1]++;
};

/** 
 * @param {string} startStation 
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (startStation, endStation) {
    let journey = startStation + "->" + endStation;
    return  this.journeyData.get(journey)[0] / this.journeyData.get(journey)[1];
};

function CheckIn(checkInStation, checkInTime) {
    this.checkInStation = checkInStation;
    this.checkInTime = checkInTime;
}
