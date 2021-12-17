const {
  Shop, 
  Item, 
  SulfurasItem,
  BackstageItem,
  ElixirItem,
  AgedBrieItem,
  DexterityVestItem
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
describe("Gilded Rose Refactoring ###################################################", function() {
  it("We consider that the behavior of the initial code is the truth", function() {
    
    for (let day = 0; day < days; day++) {
      shopBehaviour.push(cloneBehavior);
      gildedRose.updateItem();
    }

    expect(shopBehaviour).toMatchSnapshot();
  });

  it("sellIn should be 999999", function() {
    // Given
    const gildedRose = new Shop([new SulfurasItem()]);

    // When
    const itemSulfura = gildedRose.updateItem();

    // Then
    expect(itemSulfura[0].sellIn).toBe(999999);
  });

});