const {Shop, Item} = require("../src/gilded_rose");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Aged Brie", 2, 49),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

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
      gildedRose.updateQuality();
    }

    expect(shopBehaviour).toMatchSnapshot();
  });
});
