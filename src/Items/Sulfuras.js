var { Item } = require('../gilded_rose.js');

class Sulfuras extends Item {
  constructor(name, sellIn, quality, type) {
    super(name, sellIn, quality)
    this.type = type;
    this.overFifty();
  };

  overFifty(){
    if(this.quality >= 50){
      this.quality = 50;
    }
  }

}

module.exports = {
  Sulfuras
}
