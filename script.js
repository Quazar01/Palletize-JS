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
    constructor(prodId, quantity, height) {
        this.prodId = prodId;
        this.quantity = quantity;
        this.height = height;
        this.plock = false;
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
    constructor(prodId, quantity, numOfBoxes) {
        this.prodId = prodId;
        this.quantity = quantity;
        this.boxesInFullPall = numOfBoxes;
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

const emptyPallet = new EmptyPallet(1200, 800, 144);
const MAX_HEIGHT = 1400;

const red = new Box(400, 300, 156, 8, 64, 8);
const green = new Box(600, 400, 180, 7, 28, 4);
const blue = new Box(400, 300, 114, 11, 88, 8);
const renrum = new Box(400, 300, 78, 16, 128, 8);
const black = new Box(400, 300, 209, 6, 48, 8);

let products = [
    new Product("thai", 1266, red),
    new Product("wings", 1286, red),
    new Product("fars", 1311, red),
    new Product("sweetChilli", 1261, red),
    new Product("paneng", 1264, red),
    new Product("klubbor", 10422, green),
    new Product("helfagelLidl", 3947, green),
    new Product("helfagelMajs", 3948, green),
    new Product("helfagelNatural", 3941, green),
    new Product("tolvelva", 1211, black),
    new Product("elva76", 1176, black),
    new Product("benLidl", 4751, black),
    new Product("elva67", 1167, blue),
    new Product("farsLiten", 1310, blue),
    new Product("sallad", 2703, renrum),
    new Product("sallad", 2700, renrum),
    new Product("nuggets", 2701, renrum),
    new Product("1251", 1251, red),
    new Product("1185", 1185, red),
    new Product("brostfile", 10722, green),
    new Product("brostfile", 1057, green),
    new Product("brostfile", 3467, green),
    new Product("brostfile", 1047, green),
    new Product("brostfile", 1361, red),
    new Product("brostfile", 5209, blue),
    new Product("brostfile", 5585, blue),
    new Product("brostfile", 1289, blue),
    new Product("brostfile", 1111, red),
    new Product("brostfile", 1112, red),
    new Product("brostfile", 2706, renrum),
    new Product("brostfile", 2704, renrum),
    new Product("brostfile", 327994, red),
    new Product("brostfile", 1292, red),
    new Product("brostfile", 1043, red),
    new Product("brostfile", 407788, red),
    new Product("brostfile", 327986, red),
    new Product("brostfile", 327960, red),
    new Product("brostfile", 9835, red),
    new Product("brostfile", 43527, red),
    new Product("brostfile", 9839, red),
    new Product("brostfile", 9840, green),
    new Product("brostfile", 63326, green),
    new Product("brostfile", 1293, red),
    new Product("brostfile", 1016, red),
    new Product("brostfile", 1161, red),
    new Product("brostfile", 1260, red),
    new Product("brostfile", 1273, red),
    new Product("brostfile", 1391, red),
    new Product("brostfile", 7734, red),
    new Product("brostfile", 7123, red),

];

products.forEach(product => {
    console.log(product);
});


let orders = [
    new Order(1311, 19),
    new Order(10422, 89),
    new Order(3941, 16),
    new Order(63326, 18),
    new Order(3947, 125),
    new Order(1261, 16),
    new Order(1264, 8),
    new Order(1167, 1),
    new Order(1176, 6),
    new Order(1251, 7),
    new Order(1286, 5),
    new Order(1047, 4),
    new Order(1057, 8),
    new Order(5209, 20),
    new Order(10722, 2),
    new Order(1361, 38),
    new Order(1185, 12),
    new Order(1111, 4),
    new Order(1112, 13),
    new Order(2703, 10),
    new Order(2704, 32),
    new Order(2706, 5),
    new Order(1292, 14),
    new Order(327994, 33),
    new Order(9839, 18),
    new Order(9840, 1),
    new Order(7734, 11),
    new Order(2701, 19),
    new Order(1016, 1),
    new Order(1161, 10),
    new Order(1260, 16), 
    new Order(1273, 9),
    new Order(1391, 23),
    new Order(327986, 7),
    //new Order(407788, 28),
    new Order(3467, 4), // instaed of 3362.
    new Order(43527, 29),
    // new Order(7123, 22),
    // new Order(5585, 35),
    new Order(1289, 10),
    // new Order(9835, 14),
    // new Order(1043, 2),
    new Order(2700, 66),
    new Order(1293, 3),
];

let fullPalls = [];
let skvettPalls = [];
let mixProducts = [];

orders.forEach((order) => {

    let product = getProduct(order.getProdId(), products);

    let stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);
    if (parseInt((order.quantity / product.getBox().fullPall)) != 0) {
        fullPalls.push(new FullPall(order.prodId, Math.floor(order.quantity / product.box.fullPall), product.box.fullPall));
        order.quantity = order.quantity % product.box.fullPall;
        stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);

        if (product.box.boxesInRow === 8 && stackHeight > 6) {
            const fullPall = getFullPall(order.prodId, fullPalls);
            if (fullPall !== null) {
                fullPall.quantity += 1;
                order.quantity = 0;
            }
        } else if (product.box.boxesInRow === 4 && stackHeight > 5) {
            const fullPall = getFullPall(order.prodId, fullPalls);
            if (fullPall !== null) {
                fullPall.setQuantity(fullPall.getQuantity() + 1);
                order.quantity = 0;
            }
        } else {
            stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);
            const skvettHeight = product.box.height * stackHeight + emptyPallet.height;
            skvettPalls.push(new SkvettPall(order.prodId, order.quantity, skvettHeight));
        }
    } else {
        handleSkvettOrMixPall(order, product, stackHeight);
    }
});

function handleSkvettOrMixPall(order, product, stackHeight) {
    if (product.box.maxStackHeight === 8 && stackHeight > 6) {
        fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
        order.quantity = 0;
    } else if (product.box.maxStackHeight === 7 && stackHeight > 5) {
        fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
        order.quantity = 0;
    } else if (product.box.maxStackHeight === 11 && stackHeight > 8) {
        fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
        order.quantity = 0;
    } else if (product.box.maxStackHeight == 16 && stackHeight > 12) {
        fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
        order.quantity = 0;
    } else if (order.quantity < product.box.boxesInRow) {
        mixProducts.push(new MixProduct(order.prodId, order.quantity));
        order.quantity = 0;
    } else {
        stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);
        const skvettHeight = product.box.height * stackHeight + emptyPallet.height;
        skvettPalls.push(new SkvettPall(order.prodId, order.quantity, skvettHeight));
    }
}

let comboPalls = combinePallets(skvettPalls, 1400);
console.log(comboPalls);

function combinePallets(pallets, maxSum) {
    pallets.sort((a, b) => b.height - a.height);
    const parcelPallets = [];

    for (let pallet of pallets) {
        let bestFitIndex = -1;
        let minRemainingHeight = maxSum;

        for (let i = 0; i < parcelPallets.length; i++) {
            const currentHeight = parcelPallets[i].reduce((sum, p) => sum + p.height, 0);
            const remainingHeight = maxSum - (currentHeight + pallet.height);

            if (remainingHeight >= 0 && remainingHeight < minRemainingHeight) {
                bestFitIndex = i;
                minRemainingHeight = remainingHeight;
            }
        }

        if (bestFitIndex !== -1) {
            parcelPallets[bestFitIndex].push(pallet);
        } else {
            parcelPallets.push([pallet]);
        }
    }

    return parcelPallets;
}

let outputArea = document.getElementById("output");
outputArea.value = formatOutput(fullPalls, comboPalls, mixProducts);

function formatOutput(fullPalls, comboPalls, mixProducts) {
    let output = "Full Palls: \n";
    for (const fullPall of fullPalls) {
        output += `${fullPall.prodId}: ${Array(fullPall.quantity).fill(fullPall.boxesInFullPall).join(' ')}\n`;
    }

    output += "\n\nCombo Palls: \n";
    for (const combo of comboPalls) {
        for (const skvettPall of combo) {
            output += `\n${skvettPall.prodId}: ${skvettPall.quantity}\n`;
        }
        output += "__________________\n";
    }

    output += "\n\nMix Pall: \n\n";
    for (const mixProduct of mixProducts) {
        output += `${mixProduct.prodId}: ${mixProduct.quantity}\n`;
    }
    return output;
}

function getProduct(productId, products) {
    for (const product of products) {
        if (product.getId() === productId) {
            return product;
        }
    }
    return null;
}

function getFullPall(prodId, fullPalls) {
    for (const pall of fullPalls) {
        if (pall.getProdId() === prodId) {
            return pall;
        }
    }
    return null;
}
