class EmptyPallet {
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }
}

class Box {
  constructor(length, width, height, maxStackHeight, fullPall, boxesInRow) {
    this.length = length;
    this.width = width;
    this.height = height;
    this.maxStackHeight = maxStackHeight;
    this.fullPall = fullPall;
    this.boxesInRow = boxesInRow;
  }
}

class Product {
  constructor(name, id, box) {
    this.name = name;
    this.id = id;
    this.box = box;
  }

  getName() {
    return this.name;
  }

  getBox() {
    return this.box;
  }

  getId() {
    return this.id;
  }
}

class SkvettPall {
  constructor(prodId, quantity, height, stackHeight) {
    this.prodId = prodId;
    this.quantity = quantity;
    this.height = height;
    this.stackHeight = stackHeight;
  }

  getProdId() {
    return this.prodId;
  }

  getQuantity() {
    return this.quantity;
  }

  getHeight() {
    return this.height;
  }
}

class FullPall {

  constructor(prodId, quantity, numOfBoxes, height) {
    this.prodId = prodId;
    this.quantity = quantity;
    this.boxesInFullPall = numOfBoxes;
    this.height = height;
  }

  getProdId() {
    return this.prodId;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getNotFull() {
    return this.notFull;
  }

  setNotFull(notFull) {
    this.notFull = notFull;
  }
}

class MixProduct {
  constructor(prodId, quantity) {
    this.prodId = prodId;
    this.quantity = quantity;
  }

  getProdId() {
    return this.prodId;
  }

  getQuantity() {
    return this.quantity;
  }
}

class Order {
  constructor(prodId, quantity) {
    this.prodId = prodId;
    this.quantity = quantity;
  }

  getProdId() {
    return this.prodId;
  }

  getQuantity() {
    return this.quantity;
  }
}

const red = new Box(400, 300, 156, 8, 64, 8);
const green = new Box(600, 400, 180, 7, 28, 4);
const blue = new Box(400, 300, 114, 11, 88, 8);
const renrum = new Box(400, 300, 78, 16, 128, 8);
const black = new Box(400, 300, 209, 6, 48, 8);

let products = [
  new Product("thai", 1011, red),
  new Product("brostfile", 1016, red),
  new Product("brostfile", 1111, red),
  new Product("brostfile", 1112, red),
  new Product("thai", 1151, red),
  new Product("brostfile", 1161, red),
  new Product("elva67", 1167, blue),
  new Product("brostfile", 1168, red),
  new Product("1185", 1185, red),
  new Product("tolvelva", 1211, red),
  new Product("brostfile", 1241, red),
  new Product("1251", 1251, red),
  new Product("brostfile", 1260, red),
  new Product("sweetChilli", 1261, red),
  new Product("paneng", 1264, red),
  new Product("thai", 1266, red),
  new Product("brostfile", 1267, red),
  new Product("brostfile", 1273, red),
  new Product("wings", 1286, red),
  new Product("brostfile", 1289, blue),
  new Product("brostfile", 1292, red),
  new Product("brostfile", 1293, red),
  new Product("brostfile", 1361, red),
  new Product("brostfile", 1391, red),
  new Product("thai", 1411, red),
  new Product("helfagelNatural", 3941, green),
  new Product("helfagelMajs", 3948, green),
  new Product("thai", 9852, red),
  new Product("brostfile", 1043, red),
  new Product("brostfile", 1047, green),
  new Product("brostfile", 1052, green),
  new Product("brostfile", 1057, green),
  new Product("klubbor", 10422, green),
  new Product("thai", 10622, green),
  new Product("brostfile", 10722, green),
  new Product("elva76", 1176, black),
  new Product("brostfile", 3362, green),
  new Product("brostfile", 3467, green),
  new Product("brostfile", 3562, green),
  new Product("brostfile", 36622, green),
  new Product("brostfile", 37622, green),
  new Product("brostfile", 63326, green),
  new Product("brostfile", 327960, red),
  new Product("brostfile", 327986, red),
  new Product("brostfile", 327994, red),
  new Product("brostfile", 407788, red),
  new Product("brostfile", 43527, red),
  new Product("brostfile", 5209, blue),
  new Product("brostfile", 7123, red),
  new Product("brostfile", 7734, red),
  new Product("brostfile", 9835, red),
  new Product("brostfile", 9839, red),
  new Product("brostfile", 9840, green),
  new Product("farsLiten", 1310, blue),
  new Product("fars", 1311, red),
  new Product("brostfile", 5585, blue),
  new Product("sallad", 2700, renrum),
  new Product("nuggets", 2701, renrum),
  new Product("sallad", 2703, renrum),
  new Product("brostfile", 2704, renrum),
  new Product("brostfile", 2706, renrum),

  // Lidl products
  new Product("brostfile", 3459, red),
  new Product("helfagelLidl", 3947, green),
  new Product("brostfile", 4721, red),
  new Product("brostfile", 4722, red),
  new Product("brostfile", 4723, red),
  new Product("brostfile", 4724, red),
  new Product("brostfile", 4725, red),
  new Product("brostfile", 4726, red),
  new Product("brostfile", 4727, red),
  new Product("brostfile", 4730, red),
  new Product("brostfile", 4734, red),
  new Product("brostfile", 4735, red),
  new Product("brostfile", 4746, red),
  new Product("brostfile", 4747, red),
  new Product("brostfile", 4748, red),
  new Product("brostfile", 4749, red),
  new Product("benLidl", 4751, black),
  new Product("brostfile", 4753, red),
  new Product("brostfile", 4755, black),
  new Product("brostfile", 4760, blue),
  new Product("brostfile", 4762, blue),
  new Product("brostfile", 4764, red),
  new Product("brostfile", 4766, red),
  new Product("brostfile", 4767, red),
  new Product("brostfile", 4771, black),
  new Product("brostfile", 4788, red),
  new Product("brostfile", 4798, red),
  new Product("brostfile", 4792, red),
  
];

export {EmptyPallet, Box, Product, SkvettPall, FullPall, MixProduct, Order, products, red, green, blue, renrum, black}