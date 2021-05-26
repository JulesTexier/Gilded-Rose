var { Shop, Item } = require('../src/gilded_rose.js');
var { Aged_Brie } = require('../src/Items/Aged_Brie');
var { Mana_Cake } = require('../src/Items/Mana_Cake');
var { Dexterity_Vest } = require('../src/Items/Dexterity_Vest');
var { Backstage_Passes } = require('../src/Items/Backstage_passes');
var { Conjured } = require('../src/Items/Conjured');
const { Sulfuras } = require('../src/Items/Sulfuras.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Dexterity_Vest("+5 Dexterity Vest", 10, 20, "+5"));
    listItems.push(new Mana_Cake("Mana Cake", 3, 6, "Mana"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Aged_Brie("Aged Brie", 20, 30, "Brie"));
    listItems.push(new Backstage_Passes ("Backstage passes to a TAFKAL80ETC concert", 20, 30, "Backstage passes"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Tester si la qualité augmente par 3 quand il reste 5 jours ou moins (Aged Brie et Backstage passes)", function () {
    listItems.push(new Aged_Brie("Aged Brie", 2, 30, "Brie"));
    listItems.push(new Backstage_Passes ("Backstage passes to a TAFKAL80ETC concert", 2, 30, "Backstage passes"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 1, quality: 33 },
      { sellIn: 1, quality: 33 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Tester si la qualité de Sulfuras ne se modifie pas", function () {
    listItems.push(new Sulfuras("Sulfural", 10, 10, "Sulfu"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 10, quality: 10 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.", function () {
    listItems.push(new Dexterity_Vest("+5 Dexterity Vest", -1, 10, "+5"));
    listItems.push(new Mana_Cake("Mana Cake", -1, 10, "Mana"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 8 },
      { sellIn: -2, quality: 8 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité (quality) d'un produit ne peut jamais être négative.", function () {
    listItems.push(new Aged_Brie("Aged Brie", 20, -8, "Brie"));
    listItems.push(new Backstage_Passes ("Backstage passes to a TAFKAL80ETC concert", 5, -10, "Backstage passes"));
    listItems.push(new Dexterity_Vest("+5 Dexterity Vest", -1, -10, "+5"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 0 },
      { sellIn: 4, quality: 0 },
      { sellIn: -2, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("'Aged Brie' augmente sa qualité (quality) plus le temps passe.", function () {
    listItems.push(new Aged_Brie("Aged Brie", 3, 5, "Brie"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 2, quality: 8 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité d'un produit n'est jamais de plus de 50.", function () {
    listItems.push(new Aged_Brie("Aged Brie", 3, 55, "Brie"));
    listItems.push(new Backstage_Passes ("Backstage passes to a TAFKAL80ETC concert", 5, 60, "Backstage passes"));
    listItems.push(new Dexterity_Vest("+5 Dexterity Vest", -1, 67, "+5"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 2, quality: 50 },
      { sellIn: 4, quality: 50 },
      { sellIn: -2, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("'Sulfuras', étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité", function () {
    listItems.push(new Sulfuras("Sulfural", null, 10, "Sulfu"));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: null, quality: 10 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("'Backstage passes', comme le 'Aged Brie', augmente sa qualité (quality) plus le temps passe", function () {
    listItems.push(new Aged_Brie("Aged Brie", 8, 10, "Brie"));
    listItems.push(new Aged_Brie("Aged Brie", -2, 10, "Brie"));
    listItems.push(new Backstage_Passes ("Backstage passes to a TAFKAL80ETC concert", 3, 10, "Backstage passes"));
    
    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 7, quality: 12 },
      { sellIn: -3, quality: 0 },
      { sellIn: 2, quality: 13 },

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});