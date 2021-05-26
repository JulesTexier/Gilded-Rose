var { Item } = require('../gilded_rose.js');

class Conjured extends Item {
  constructor(name, sellIn, quality, type) {
    super(name, sellIn, quality)
    this.type = type;
    this.loseQuality();
    this.loseSellin();
    this.checkFiveDays();
    this.checkNegativeQuality();
    this.checkPeremptionDate();
    this.overFifty();
    this.checkTenDays();
    this.checkZeroDays();
  }

  loseQuality() {
      this.quality -= 2;
      return this;
    }
  
  loseSellin() {
    this.sellIn -= 1;
    return this;
  }

  checkPeremptionDate(){
    if(this.sellIn <= 0){
      this.quality -= 1
      return this
    }
  }

  checkNegativeQuality(){
    if(this.quality <= 0){
      this.quality = 0;
    }
  }

  overFifty(){
    if(this.quality >= 50){
      this.quality = 50;
    }
  }
}

module.exports = {
  Conjured
}
