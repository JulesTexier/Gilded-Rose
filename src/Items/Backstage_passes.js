var { Item } = require('../gilded_rose.js');

class Backstage_Passes extends Item {
  constructor(name, sellIn, quality, type) {
    super(name, sellIn, quality)
    this.type = type;
    this.addQuality();
    this.loseSellin();
    this.checkFiveDays();
    this.checkNegativeQuality();
    this.checkPeremptionDate();
    this.overFifty();
    this.checkTenDays();
    this.checkZeroDays();
  };

  addQuality() {
      this.quality += 1;
      return this;
    }

  loseSellin() {
    this.sellIn -= 1;
    return this;
  }

  checkZeroDays(){
    if(this.sellIn < 0){
      this.quality = 0;
    };
    return this;
  }

  checkFiveDays(){
    if(this.sellIn <= 5){
      this.quality += 2;
    };
    return this;
  }

  checkTenDays(){
    if(this.sellIn <= 10 && this.sellIn > 5){
      this.quality += 1;
    };
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
  Backstage_Passes
}
