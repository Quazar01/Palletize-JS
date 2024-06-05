
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
    // Constructor method to initialize an object
    constructor(prodId, quantity, boxesInFullPall) {
        this.prodId = prodId;
        this.quantity = quantity;
        this.boxesInFullPall = boxesInFullPall;
    }

    // Method to get the product ID
    getProdId() {
        return this.prodId;
    }

    // Method to get the quantity
    getQuantity() {
        return this.quantity;
    }

    // Method to set the quantity
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

// Create an empty EU Pallet.
// Dimensions in mm.
const emptyPallet = new EmptyPallet(1200, 800, 144);

const MAX_HEIGHT = 1400; 

// Define the boxes.
// length, width, height, maxStackHeight, fullPall(how many boxes fit in a full pall), boxesInRow(how many boxes fit in one row).

const red = new Box(400, 300, 157, 8, 64, 8);
const green = new Box(600, 400, 180, 7, 28, 4);
const blue = new Box(400, 300, 114, 11, 88, 8);
const renrum = new Box(400, 300, 78, 16, 128, 8);
const black = new Box(400, 300, 209, 6, 48, 8);

// Create a list of products.
let products = [];

products.push(new Product("thai", 1266, red));
products.push(new Product("wings", 1286, red));
products.push(new Product("fars", 1311, red));
products.push(new Product("sweetChilli", 1261, red));
products.push(new Product("paneng", 1264, red));
products.push(new Product("klubbor", 10422, green));
products.push(new Product("helfagelLidl", 3947, green));
products.push(new Product("helfagelMajs", 3948, green));
products.push(new Product("helfagelNatural", 3941, green));
products.push(new Product("tolvelva", 1211, black));
products.push(new Product("elva76", 1176, black));
products.push(new Product("benLidl", 4751, black));
products.push(new Product("elva67", 1167, blue));
products.push(new Product("farsLiten", 1310, blue));
products.push(new Product("sallad", 2703, renrum));
products.push(new Product("sallad", 2700, renrum));
products.push(new Product("nuggets", 2701, renrum));
products.push(new Product("1251", 1251, red));
products.push(new Product("1185", 1185, red));
products.push(new Product("brostfile", 10722, green));
products.push(new Product("brostfile", 1057, green));
products.push(new Product("brostfile", 3467, green));
products.push(new Product("brostfile", 1047, green));
products.push(new Product("brostfile", 1361, red));
products.push(new Product("brostfile", 5209, blue));
products.push(new Product("brostfile", 5585, blue));
products.push(new Product("brostfile", 1289, blue));
products.push(new Product("brostfile", 1111, red));
products.push(new Product("brostfile", 1112, red));
products.push(new Product("brostfile", 2706, renrum));
products.push(new Product("brostfile", 2704, renrum));
products.push(new Product("brostfile", 327994, red));
products.push(new Product("brostfile", 1292, red));
products.push(new Product("brostfile", 1043, red));
products.push(new Product("brostfile", 407788, red));
products.push(new Product("brostfile", 327986, red));
products.push(new Product("brostfile", 327960, red));
products.push(new Product("brostfile", 9835, red));
products.push(new Product("brostfile", 43527, red));
products.push(new Product("brostfile", 9839, red));
products.push(new Product("brostfile", 9840, green));
products.push(new Product("brostfile", 63326, green));
products.push(new Product("brostfile", 1293, red));
products.push(new Product("brostfile", 1016, red));
products.push(new Product("brostfile", 1161, red));
products.push(new Product("brostfile", 1260, red));
products.push(new Product("brostfile", 1273, red));
products.push(new Product("brostfile", 1391, red));
products.push(new Product("brostfile", 7734, red));
products.push(new Product("brostfile", 7123, red));


// Create a list of orders.
let orders = [];

// Get the data from the uploaded excel file.
let jsonDataGlobal;

const input = document.getElementById('file-input');
input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);

    };



    
    reader.readAsArrayBuffer(file);
});

let d = document.getElementById("jsonOutput").textContent;

console.log(d);

orders.push(new Order(1311, 2));
orders.push(new Order(10422, 89));
orders.push(new Order(3948, 8));
orders.push(new Order(63326, 18));
orders.push(new Order(3947, 12));
orders.push(new Order(1261, 32));
orders.push(new Order(1264, 15));
orders.push(new Order(1167, 1));
orders.push(new Order(1176, 6));
orders.push(new Order(1251, 28));
orders.push(new Order(1286, 14));
orders.push(new Order(1047, 16));
orders.push(new Order(1057, 8));
orders.push(new Order(5209, 234));
orders.push(new Order(10722, 2));
orders.push(new Order(1361, 3));
orders.push(new Order(1185, 15));
orders.push(new Order(1111, 38));
orders.push(new Order(1112, 32));
orders.push(new Order(2703, 31));
orders.push(new Order(2704, 47));
orders.push(new Order(2706, 31));
orders.push(new Order(1292, 5));
orders.push(new Order(327994, 33));
orders.push(new Order(9839, 61));
orders.push(new Order(9840, 16));
orders.push(new Order(7734, 16));
orders.push(new Order(2701, 2));
orders.push(new Order(1016, 2));
orders.push(new Order(1161, 24));
orders.push(new Order(1260, 7));
orders.push(new Order(1273, 3));
orders.push(new Order(1391, 6));
orders.push(new Order(327986, 8));
orders.push(new Order(407788, 28));
orders.push(new Order(3467, 7));
orders.push(new Order(43527, 34));
orders.push(new Order(7123, 22));
orders.push(new Order(5585, 35));
orders.push(new Order(1289, 20));
orders.push(new Order(9835, 14));
orders.push(new Order(1043, 2));
orders.push(new Order(2700, 2));
orders.push(new Order(1293, 13));

// Create a list of full pllets.
let fullPalls = [];
// Create a list of skvett pallets.
let skvettPalls = [];
// Create a list of mix products.
let mixProducts = [];


orders.forEach((order) => {

    // Define the product of the order.
    let product = getProduct(order.getProdId(), products);

    // Define the stack height of the order.
    let stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);

    // Check if it can be divided into full pallets
    if (parseInt((order.quantity / product.getBox().fullPall)) != 0) {
        fullPalls.push(
            new FullPall(
                order.prodId,
                Math.floor(order.quantity / product.box.fullPall),
                product.box.fullPall
            )
        );
        // console.log(fullPalls);
        // Update the remainder quantity after subtracting full palls
        order.quantity = order.quantity % product.box.fullPall;

        // Update the height of the remainder pall
        stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);

        // If the stack's height doesn't allow stacking another over it,
        // move the remainder quantity as a full pall
        if (product.box.boxesInRow === 8 && stackHeight > 6) {
            // Fetch the fullPall object of this product to edit its quantity
            const fullPall = getFullPall(order.prodId, fullPalls);
            if (fullPall !== null) {
                fullPall.quantity += 1;
                order.quantity = 0;
            }
        } else if (product.box.boxesInRow === 4 && stackHeight > 5) {
            // Fetch the products full pall and add it to it
            const fullPall = getFullPall(order.prodId, fullPalls);
            if (fullPall !== null) {
                fullPall.setQuantity(fullPall.getQuantity() + 1);
                order.quantity = 0;
            }
        }
        // otherwise, put the remainder of the product in a SkvettPall
        else {
            stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);
            const skvettHeight =
                product.box.height * stackHeight + emptyPallet.height;

            skvettPalls.push(
                new SkvettPall(order.prodId, order.quantity, skvettHeight)
            );
        }
    }

   // If the order quantity is less than a full pall, put the order as a skvett in a SkvettPall
    else {
        // If the stack's height doesn't allow stacking another over it,
        // put it in a full pall

        // For red boxes
        if (product.box.maxStackHeight === 8 && stackHeight > 6) {
            fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
            order.quantity = 0;
        }
        // For green boxes
        else if (product.box.maxStackHeight === 7 && stackHeight > 5) {
            // If the product has green box and its stack height is more than 5
            // Put it in a full pall
            // If the boxes are less than a full pall
            fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
            order.quantity = 0;
        }
        // For blue boxes
        else if (product.box.maxStackHeight === 11 && stackHeight > 8) {
            fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
            order.quantity = 0;
        }
        // For renrum boxes
        else if (product.box.maxStackHeight == 16 && stackHeight > 12) {
            fullPalls.push(new FullPall(order.prodId, 1, order.quantity));
            order.quantity = 0;
        }
        // If the quantity does not form a skvett pall, put it in a mix pall
        else if (order.quantity < product.box.boxesInRow) {
            mixProducts.push(new MixProduct(order.prodId, order.quantity));
            order.quantity = 0;
        }
        // if the pall's height allow stacking another pall on it,
        // then put the remainder of the product in a SkvettPall
        else {
            stackHeight = Math.ceil(order.quantity / product.box.boxesInRow);
            const skvettHeight = (product.box.height * stackHeight) + emptyPallet.height;

            skvettPalls.push(new SkvettPall(order.prodId, order.quantity, skvettHeight));
        }
    }

    skvettPalls.sort((a, b) => b.getHeight() - a.getHeight());
});

// skvettPalls.forEach(skvettPall => {
//     console.log(skvettPall)
// });

const comboPalls = [];

for (let i = 0; i < skvettPalls.length - 1; i++) {
    // First pall is the highest pall, fetch it and stack it over the next pall,
    // If they do not exceed the max height, put them in a combo pall,
    // Check if the combo pall can be stacked over a third pall,
    // If so add third pall to the combo pall, so combo pall becomes three palls.

    const skvettPall = skvettPalls[i];

    if (skvettPall.plock) continue;
    let currentHeight = skvettPall.height;

    // Check if the first pall can be stacked over any of the un plocked palls.
    for (let j = i + 1; j < skvettPalls.length; j++) {
        if (skvettPall.plock) break;

        const otherSkvetPall = skvettPalls[j];

        const comboPall = [];

        const otherHeight = otherSkvetPall.getHeight();

        // Check if the two palls stacked over each other does not exceed the max height
        if (currentHeight + otherHeight < MAX_HEIGHT) {

            skvettPall.plock = true;
            otherSkvetPall.plock = true;

            // Add the two palls to the combo pall.
            comboPall.push(new SkvettPall(skvettPall.prodId, skvettPall.quantity, skvettPall.height));
            comboPall.push(new SkvettPall(otherSkvetPall.prodId, otherSkvetPall.quantity, otherSkvetPall.height));

            // Apply a tribbel pall
            for (let k = j + 1; k < skvettPalls.length; k++) {
                const nextSkvettPall = skvettPalls[k];
                if (nextSkvettPall.plock) continue;

                const nextHeight = nextSkvettPall.getHeight();

                if (currentHeight + otherHeight + nextHeight < MAX_HEIGHT) {
                    // Add a third pall on the combo pall.
                    comboPall.push(new SkvettPall(nextSkvettPall.prodId, nextSkvettPall.quantity, nextSkvettPall.height));

                    // Tag the third pall as plocked.
                    nextSkvettPall.plock = true;
                    break;
                }
            }

            comboPalls.push([...comboPall]);
        }
    }
}

const notMatched = [];
// Check if there are any palls that doesn't have a match pair.
for (const skvettPall of skvettPalls) {
    if (!skvettPall.plock) {
        notMatched.push(new SkvettPall(skvettPall.prodId, skvettPall.quantity, skvettPall.height));
    }
}

// Print the results into the text area.
let outputArea = document.getElementById("output");


outputArea.value = "Full Palls: \n";
for (const fullPall of fullPalls) {
    let output = `${fullPall.prodId}: `;
    for (let i = 0; i < fullPall.quantity; i++) {
        output += `${fullPall.boxesInFullPall} `;
    }
    outputArea.value += output + "\n";
}

outputArea.value += "\n\nSelf Contained Palls: \n";
for (const enskildPall of notMatched) {
    outputArea.value += (`${enskildPall.prodId}: ${enskildPall.quantity}`);
    outputArea.value += ("\n___________________");
}

outputArea.value += "\n\nCombo Palls: \n\n";
for (const combo of comboPalls) {
    for (const skvettPall of combo) {
        outputArea.value += (`\n${skvettPall.prodId}:${skvettPall.quantity}\n`);
    }
    outputArea.value += ("__________________\n");
}

outputArea.value += "\n\nMix Pall: \n\n";
for (const mixProduct of mixProducts) {
    outputArea.value += (`${mixProduct.prodId}: ${mixProduct.quantity}\n`);
}

function getProduct(productId, products) {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const currentId = product.getId();

        if (currentId === productId) {
            return product;
        }
    }
    return null;
}

function getFullPall(prodId, fullPalls) {
    for (let i = 0; i < fullPalls.length; i++) {
        const pall = fullPalls[i];
        if (pall.getProdId() === prodId) {
            return pall;
        }
    }
    return null;
}
