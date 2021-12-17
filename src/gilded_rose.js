const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const LEGEND_QUALITY = 80;
const NO_SELL_IN = 999999; // on estimera que si la valeur de sellIn est 999999, l'item n'a pas de date de péremption

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateItem(){
    communUpdate(this);
  }
  
}

class SulfurasItem extends Item{
  constructor(){
    super("Sulfuras, Hand of Ragnaros", NO_SELL_IN, LEGEND_QUALITY);
  }
  updateItem(){
    return this.sellIn;
  }
}
class BackstageItem extends Item{
  constructor(sellIn, quality){
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }
  updateItem(){
    this.sellIn -= 1;
    if (this.sellIn <= 0) this.quality = 0;
      else if (this.sellIn <= 5) this.quality = Math.min(this.quality + 3, MAX_QUALITY);
      else if (this.sellIn <= 10) this.quality = Math.min(this.quality + 2, MAX_QUALITY);
    else this.quality = Math.min(this.quality + 1, MAX_QUALITY);
  }
}

class ElixirItem extends Item{
  constructor(sellIn, quality){
    super("Elixir of the Mongoose", sellIn, quality);
  }
  updateItem(){
    communUpdate(this);
  }
}

class AgedBrieItem extends Item{
  constructor(sellIn, quality){
    super("Aged Brie", sellIn, quality);
  }
  updateItem(){
    this.sellIn -= 1;
    if (this.sellIn <= 0) this.quality = Math.min(this.quality + 2, this.MAX_QUALITY);
    else this.quality = Math.min(this.quality + 1, this.MAX_QUALITY);
  }
}

class DexterityVestItem extends Item{
  constructor(sellIn, quality){
    super("+5 Dexterity Vest", sellIn, quality);
  }
  updateItem(){
    communUpdate(this);
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateItem() {
    for (let i = 0; i < this.items.length; i++){this.items[i].updateItem();}
    return this.items;
  }
}

function communUpdate(item){
  item.sellIn -= 1;
  if (item.sellIn <= 0) item.quality = Math.max(item.quality - 2, MIN_QUALITY);
    else item.quality = Math.max(item.quality - 1, MIN_QUALITY);
}

module.exports = {
  Item,
  Shop,
  SulfurasItem,
  BackstageItem,
  ElixirItem,
  AgedBrieItem,
  DexterityVestItem
}