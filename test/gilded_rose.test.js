const {
  Shop,
  Item,
  SulfurasItem,
  BackstageItem,
  ElixirItem,
  AgedBrieItem,
  DexterityVestItem,
} = require("../src/gilded_rose");

const items = [
  new DexterityVestItem(10, 20),
  new AgedBrieItem(2, 0),
  new AgedBrieItem(2, 49),
  new ElixirItem(5, 7),
  new SulfurasItem(),
  new SulfurasItem(),
  new BackstageItem(15, 20),
  new BackstageItem(10, 49),
  new BackstageItem(5, 49),

  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

const days = Number(process.argv[7]) || 7;
const gildedRose = new Shop(items);
const shopBehaviour = [];

const cloneBehavior = JSON.parse(JSON.stringify(gildedRose.items));
describe("Gilded Rose tests unitaires ###################################################", function () {
  it("Sulfuras", function () {
    // Arrange
    const gildedRose = new Shop([new SulfurasItem()]);

    // Act
    const itemSulfura = gildedRose.updateItem();

    // Assert
    expect(itemSulfura[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(itemSulfura[0].sellIn).toBe(999999);
    expect(itemSulfura[0].quality).toBe(80);
  });
});
describe("Gilded Rose tests unitaires ###################################################", function () {
  it("Sulfuras", function () {
    // Arrange
    const gildedRose = new Shop([new Item("Toto", 10, 5)]);

    // Act
    const itemSulfura = gildedRose.updateItem();

    // Assert
    expect(itemSulfura[0].name).toBe("Toto");
    expect(itemSulfura[0].sellIn).toBe(9);
  });

  describe("Backstageitem", function () {
    it("should decrease the sellIn of BackstageItem", function () {
      // Arrange
      const gildedRose = new Shop([new BackstageItem(0, 2)]);

      // Act
      const itemBackstage = gildedRose.updateItem();

      // Assert
      expect(itemBackstage[0].sellIn).toBe(-1);
    });
  });

  describe("Backstageitem", function () {
    it("should increase the quality by 2 if it remains 10 days or lower", function () {
      // Arrange
      const gildedRose = new Shop([new BackstageItem(10, 5)]);

      // Act
      const itemBackstage = gildedRose.updateItem();

      // Assert
      expect(itemBackstage[0].quality).toBe(7);
    });
    it("should never increase the quality over 50 if it remains 10 days or lower", function () {
      // Arrange
      const gildedRose = new Shop([new BackstageItem(10, 50)]);

      // Act
      const itemBackstage = gildedRose.updateItem();

      // Assert
      expect(itemBackstage[0].quality).toBe(50);
    });
    it("should increase the quality by 3 if it remains 5 days or lower", function () {
      // Arrange
      const gildedRose = new Shop([new BackstageItem(5, 5)]);

      // Act
      const itemBackstage = gildedRose.updateItem();

      // Assert
      expect(itemBackstage[0].quality).toBe(8);
    });

    it("should never increase the quality over 50 if it remains 5 days or lower", function () {
      // Arrange
      const gildedRose = new Shop([new BackstageItem(5, 50)]);

      // Act
      const itemBackstage = gildedRose.updateItem();

      // Assert
      expect(itemBackstage[0].quality).toBe(50);
    });
    it("should set the quality to 0 after the date of the concert", function () {
      // Arrange
      const gildedRose = new Shop([new BackstageItem(0, 5)]);

      // Act
      const itemBackstage = gildedRose.updateItem();

      // Assert
      expect(itemBackstage[0].quality).toBe(0);
    });
  });
  describe("AgedBrieItem", function () {
    it("should decrease the sellIn of the object", function () {
      // Arrange
      const gildedRose = new Shop([new AgedBrieItem(0, 2)]);

      // Act
      const itemAgedBrie = gildedRose.updateItem();

      // Assert
      expect(itemAgedBrie[0].sellIn).toBe(-1);
    });
    it("should increase the quality two times faster if the sell by date has passed", function () {
      // Arrange
      const gildedRose = new Shop([new AgedBrieItem(0, 2)]);

      // Act
      const itemAgedBrie = gildedRose.updateItem();

      // Assert
      expect(itemAgedBrie[0].quality).toBe(4);
    });
    it("increase the quality after update", function () {
      // Arrange
      const gildedRose = new Shop([new AgedBrieItem(20, 2)]);

      // Act
      const itemAgedBrie = gildedRose.updateItem();

      // Assert
      expect(itemAgedBrie[0].quality).toBe(3);
    });
    it("never increase the quality over", function () {
      // Arrange
      const gildedRose = new Shop([new AgedBrieItem(20, 50)]);

      // Act
      const itemAgedBrie = gildedRose.updateItem();

      // Assert
      expect(itemAgedBrie[0].quality).toBe(50);
    });
  });
  describe("ElixirItem", function () {
    it("should decrease the sellIn of the object", function () {
      // Arrange
      const gildedRose = new Shop([new ElixirItem("Elixir of the Mongoose",9, 4)]);

      // Act
      const itemElixir = gildedRose.updateItem();

      // Assert
      expect(itemElixir[0].sellIn).toBe(8);
    });
    it("should set a negative sell by date when it has passede has passed", function () {
      // Arrange
      const gildedRose = new Shop([new ElixirItem("Elixir of the Mongoose",0, 5)]);

      // Act
      const itemElixir = gildedRose.updateItem();

      // Assert
      expect(itemElixir[0].sellIn).toBe(-1);
    });
    it("decrease the quality after update", function () {
      // Arrange
      const gildedRose = new Shop([new ElixirItem("Elixir of the Mongoose",10, 5)]);

      // Act
      const itemElixir = gildedRose.updateItem();

      // Assert
      expect(itemElixir[0].quality).toBe(4);
    });
    it("should decrease the quality by 2 if the sell by date has passed", function () {
      // Arrange
      const gildedRose = new Shop([new ElixirItem("Elixir of the Mongoose",0, 5)]);

      // Act
      const itemElixir = gildedRose.updateItem();

      // Assert
      expect(itemElixir[0].quality).toBe(3);
    });
    it("should always have a positive quality", function () {
      // Arrange
      const gildedRose = new Shop([new ElixirItem("Elixir of the Mongoose",0, 0)]);

      // Act
      const itemElixir = gildedRose.updateItem();

      // Assert
      expect(itemElixir[0].quality).toBe(0);
    });
    
  });
});
