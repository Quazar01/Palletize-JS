// Description: This file contains the main logic for the application. It processes the Excel file, extracts the data, and generates the output based on the requirements. The output is then displayed on the web page for the user to view. 

class EmptyPallet {
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }
}

class Box {
  constructor(length, width, fullHeight, stackedUponHeight, maxStackHeight, fullPall, boxesInRow) {
    this.length = length;
    this.width = width;
    this.fullHeight = fullHeight;
    this.stackedUponHeight = stackedUponHeight;
    this.maxStackHeight = maxStackHeight;
    this.fullPall = fullPall;
    this.boxesInRow = boxesInRow;
  }
  getLength() {
    return this.length;
  }
  getWidth() {
    return this.width;
  }
  getFullHeight() {
    return this.fullHeight;
  }
  getStackingHeight() {
    return this.stackedUponHeight;
  }
  getMaxStackHeight() {
    return this.maxStackHeight;
  }
  getQuantityInFullPall() {
    return this.fullPall;
  }
  getBoxesInRow() {
    return this.boxesInRow;
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
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getProduct() {
    return this.product;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getBox() {
    return this.product.getBox();
  }

  getStackHeight() {
    let box = this.getBox();
    let stackHeight = Math.ceil ((this.quantity / box.getBoxesInRow()));
    return stackHeight;
  }

  getHeight() {
    let box = this.getBox();
    let stackHeight = this.getStackHeight();
    const heightOfBoxes = box.getFullHeight() + (box.getStackingHeight() * (stackHeight - 1));
    return heightOfBoxes + SRSPallet.height;
  }

  getPallId() {
    return "Skvett Pall";
  }
}

class FullPall {

  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getProduct() {
    return this.product;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getStackHeight() {
    let box = this.product.getBox();
    let stackHeight = Math.ceil(this.quantity / box.getBoxesInRow());
    return stackHeight;
  }

  getHeight() {
    let box = this.product.getBox();
    let stackHeight = Math.ceil(this.quantity / box.getBoxesInRow());
    let heightOfBoxes = box.getFullHeight() + (box.getStackingHeight() * (stackHeight - 1));
    return heightOfBoxes + SRSPallet.height;
  }

  getPallId() {
    return "Full Pall";
  }

}

class MixProduct {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getProduct() {
    return this.product;
  }

  getQuantity() {
    return this.quantity;
  }
  setQuantity(quantity) {
    this.quantity = quantity;
  }

  getBox() {
    return this.product.getBox();
  }
}

class MixPall {
  constructor(pallId,quantity, quantityAsRedBoxes, stackHeight, totalHeight) {  
    this.pallId = pallId;
    this.quantity = quantity;
    this.quantityAsRedBoxes = quantityAsRedBoxes;
    this.stackHeight = stackHeight;
    this.totalHeight = totalHeight;
  }
  getPallId() {
    return "Mix Pall";
  }
  getQuantity() {
    return this.quantity;
  }
  getQuantityAsRedBoxes() {
    return this.quantityAsRedBoxes;
  }
  getStackHeight() {
    return this.stackHeight;
  }
  getHeight() {
    return this.totalHeight;
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

const SRSPallet = new EmptyPallet(1200, 800, 150);
const MAX_HEIGHT = 1305;
const EnPlats = 1250 * 2;

const red = new Box(400, 300, 148, 136, 8, 64, 8);
const green = new Box(600, 400, 167, 154, 7, 28, 4);
const blue = new Box(400, 300, 108, 96, 11, 88, 8);
const renrum = new Box(400, 300, 108, 66, 16, 128, 8);
const black = new Box(400, 300, 193, 181, 6, 48, 8);

let orders = [];

let fullPalls = [];
let skvettPalls = [];
let mixProducts = [];
let comboPalls = [];

let products = [
  new Product("Not Set", 1011, red),
  new Product("Not Set", 1016, red),
  new Product("Not Set", 1111, red),
  new Product("Not Set", 1112, red),
  new Product("Not Set", 1151, red),
  new Product("Not Set", 1161, red),
  new Product("Not Set", 1167, blue),
  new Product("Not Set", 1168, red),
  new Product("Not Set", 1185, red),
  new Product("Not Set", 1211, red),
  new Product("Not Set", 1241, red),
  new Product("Not Set", 1251, red),
  new Product("Not Set", 1260, red),
  new Product("Not Set", 1261, red),
  new Product("Not Set", 1264, red),
  new Product("Not Set", 1266, red),
  new Product("Not Set", 1267, red),
  new Product("Not Set", 1273, red),
  new Product("Not Set", 1286, red),
  new Product("Not Set", 1289, blue),
  new Product("Not Set", 1292, red),
  new Product("Not Set", 1293, red),
  new Product("Not Set", 1361, red),
  new Product("Not Set", 1391, red),
  new Product("Not Set", 1411, red),
  new Product("Not Set", 3941, green),
  new Product("Not Set", 3948, green),
  new Product("Not Set", 9852, red),
  new Product("Not Set", 1043, red),
  new Product("Not Set", 1047, green),
  new Product("Not Set", 1052, green),
  new Product("Not Set", 1057, green),
  new Product("Not Set", 10422, green),
  new Product("Not Set", 10622, green),
  new Product("Not Set", 10722, green),
  new Product("Not Set", 1176, black),
  new Product("Not Set", 1222, black),
  new Product("Not Set", 3362, green),
  new Product("Not Set", 3467, green),
  new Product("Not Set", 3562, green),
  new Product("Not Set", 3763, green),
  new Product("Not Set", 36622, green),
  new Product("Not Set", 37622, green),
  new Product("Not Set", 63326, green),
  new Product("Not Set", 327960, red),
  new Product("Not Set", 327986, red),
  new Product("Not Set", 327994, red),
  new Product("Not Set", 407788, red),
  new Product("Not Set", 43527, red),
  new Product("Not Set", 5209, blue),
  new Product("Not Set", 7123, red),
  new Product("Not Set", 7734, red),
  new Product("Not Set", 9835, red),
  new Product("Not Set", 9839, red),
  new Product("Not Set", 9840, green),
  new Product("Not Set", 1310, blue),
  new Product("Not Set", 1311, red),
  new Product("Not Set", 5585, blue),
  new Product("Not Set", 2700, renrum),
  new Product("Not Set", 2701, renrum),
  new Product("Not Set", 2703, renrum),
  new Product("Not Set", 2704, renrum),
  new Product("Not Set", 2706, renrum),

  // Lidl products
  new Product("Not Set", 3459, red),
  new Product("Not Set", 3947, green),
  new Product("Not Set", 4721, red),
  new Product("Not Set", 4722, red),
  new Product("Not Set", 4723, red),
  new Product("Not Set", 4724, red),
  new Product("Not Set", 4725, red),
  new Product("Not Set", 4726, red),
  new Product("Not Set", 4727, red),
  new Product("Not Set", 4730, red),
  new Product("Not Set", 4734, red),
  new Product("Not Set", 4735, red),
  new Product("Not Set", 4746, red),
  new Product("Not Set", 4747, red),
  new Product("Not Set", 4748, red),
  new Product("Not Set", 4749, red),
  new Product("Not Set", 4751, black),
  new Product("Not Set", 4753, red),
  new Product("Not Set", 4755, black),
  new Product("Not Set", 4760, blue),
  new Product("Not Set", 4762, blue),
  new Product("Not Set", 4764, red),
  new Product("Not Set", 4766, red),
  new Product("Not Set", 4767, red),
  new Product("Not Set", 4771, black),
  new Product("Not Set", 4788, red),
  new Product("Not Set", 4798, red),
  new Product("Not Set", 4792, red),

];

let kund = "Ingen kund specificerad";
let orderDate = getFormattedDate();

// Drag and Drop Logic
const dropZone = document.getElementById('dropZone');

// Prevent default behavior for drag events
dropZone.addEventListener('dragenter', (event) => {
  event.preventDefault();
});

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
});

dropZone.addEventListener('dragleave', (event) => {
  event.preventDefault();
});


function updateDropZoneWithFileName() {
  let fileInput = document.getElementById('excelFile');
  let dropZone = document.getElementById('dropZone');
  if (fileInput.files.length > 0) {
    let fileName = fileInput.files[0].name;
    dropZone.innerHTML = fileName;
  }
}
// On drop.
dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const arrayBuffer = await file.arrayBuffer();
  try {
    await processExcel(arrayBuffer);
    
    if (kund.trim().length != 0 && kund != "") { 
      kund = document.getElementById('kund').value;
    }
    else {
      kund = "Ingen kund specificerad";
    }
    if (orderDate.trim().length != 0 && orderDate != "") {
      orderDate = document.getElementById('date').value;
    }
    else {
      orderDate = getFormattedDate();
    }
    
    // Basically, the main function!
    fixaPlockListan();

  } catch (error) {
    console.error('Error processing Excel file:', error);
    alert('There was an error processing the Excel file. Check the console for details.');
  }
});

// On submit.
document.getElementById('excelForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const fileInput = document.getElementById('excelFile');
  // if (fileInput.files.length === 0) {
  //     alert('Please select a file!');
  //     return;
  // }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();

  try {
    const result = await processExcel(arrayBuffer);

    if (kund.trim().length != 0 && kund != "") { 
      kund = document.getElementById('kund').value;
    }
    else {
      kund = "Ingen kund specificerad";
    }
    if (orderDate.trim().length != 0 && orderDate != "") {
      orderDate = document.getElementById('date').value;
    }
    else {
      orderDate = getFormattedDate();
    }

    // Basically, the main function!
    fixaPlockListan();

  } catch (error) {
    console.error('Error processing Excel file:', error);
    alert('There was an error processing the Excel file. Check the console for details.');
  }
});

async function processExcel(arrayBuffer) {
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const result = extractArtikelAndDFP(jsonData);
  // Store the result in the orders array
  orders = []; // Clear the existing array
  result.forEach(order => orders.push(new Order(order.prodId, order.quantity)));
  return result;
}

function extractArtikelAndDFP(data) {
  const result = [];

// Check for headers in the first 10 rows.
// TODO: Modify this to fit the list from DAGAB as well.
  let artikelIndex = -1;
  let dfpIndex = -1;
  for (let i = 0; i <= 10; i++) {
    const headers = data[i];
    if (headers.includes("Artikelnummer")) {
      artikelIndex = headers.indexOf("Artikelnummer");
    }

    if (headers.includes("Lev artikel")) {
      artikelIndex = headers.indexOf("Lev artikel");
    }
    if (headers.includes("Kollin")) {
      dfpIndex = headers.indexOf("Kollin");
    }
    if (headers.includes("Prognos DFP")) {
      dfpIndex = headers.indexOf("Prognos DFP") + 1;
    }
    if (headers.includes("Beställda DFP")) {
      dfpIndex = headers.indexOf("Beställda DFP");
    }
    if (artikelIndex !== -1 && dfpIndex !== -1) break; // Found both headers, no need to continue
  }

  if (artikelIndex === -1 || dfpIndex === -1) {
    throw new Error("Required columns not found in the Excel sheet.");
  }

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    // Take only the numbers from the artikel and dfp columns.
    const prodId = parseInt(row[artikelIndex]);
    const quantity = parseInt(row[dfpIndex]);

    if (!isNaN(prodId) && !isNaN(quantity)) {
      result.push({ prodId, quantity });
    }
  }

  return result;
}

function fixaPlockListan() {

  // Let the magic begins!
  orders.forEach((order) => {
    let product = getProduct(order.getProdId(), products);


    if (!product) {
      // console.error(`Product with id ${order.getProdId()} not found.`);
      // append error message in a p tag to the error field.
      var pElement = document.createElement('p');
      // Set its text content
      pElement.textContent = `Produkt med artikelnummer ${order.getProdId()} är inte träffad!`;
      // Append the <p> element to the parent
      document.getElementById('errorField').appendChild(pElement);
      return;
    }

    // If the quantity can be one or more full pallets.
    if (parseInt((order.quantity / product.getBox().getQuantityInFullPall())) != 0) {
      // Put them in the fullPalls list.
      let boxesInFullPall = product.getBox().getQuantityInFullPall();
      // List of the full pallets for the current product.
      let productFullPalls = [];

      let howManyFullPalls = parseInt(order.quantity / boxesInFullPall);
      
      for (let i = 0; i < howManyFullPalls; i++) {
        productFullPalls.push(new FullPall(product, boxesInFullPall));
      }
      // Update the quantity after subtracting the full pallets.
      // e.g ordered 1168 : 93, then full palls is 1, new quantity is (93 - 64 = 29)
      order.quantity = parseInt(order.quantity % boxesInFullPall);

      // Update the stack height of the remainder.
      let stackHeight = Math.ceil(order.quantity / product.getBox().boxesInRow);
      // If the remainder can't be stacked with another pallet. e.g 1311 : 49
      // Put the remainder pall in the productFullPalls list.
      if (product.getBox() === red && stackHeight > 6 || // for red.
        product.getBox() === green && stackHeight > 5 ||     // for green.
        product.getBox() === renrum && stackHeight > 12 || // for renrum.
        product.getBox() === black && stackHeight > 4)     // for black.

      {
        productFullPalls.push(new FullPall(product, order.quantity));
        
      } else {
        // If the remainder can be stacked, 
        // handle it using handleSkvettOrMixPall method.

        handleSkvettOrMixPall(product, order.quantity);
      }
      // Add the productFullPalls to the fullPalls list.
      fullPalls.push(productFullPalls);
      // Done checking the full pallets.

    } else {  // If the order's quantity is less than a full pallet, but can't be stacked with another pallet.
      let stackHeight = Math.ceil(order.quantity / product.getBox().boxesInRow);
      if (product.getBox() === red && stackHeight > 6 || // for red.
        product.getBox() === green && stackHeight > 5 ||     // for green.
        product.getBox() === renrum && stackHeight > 12 || // for renrum.
        product.getBox() === black && stackHeight > 4)     // for black.
      {
        const skvettFullPall = [];
        skvettFullPall.push(new FullPall(product, order.quantity));
        fullPalls.push(skvettFullPall);
      } else {
        // If the order's quantity is less than a full pallet, and can be stacked with another pallet.
        handleSkvettOrMixPall(product, order.quantity);
      }
    }
  });

  // Check if the quantity could be a skvett pall or a mix product.
function handleSkvettOrMixPall(product, quantity) {
  // If it's on a blandpall. 
  if (quantity < product.getBox().boxesInRow) {
    mixProducts.push(new MixProduct(product, quantity));
    quantity = 0;
  } else {
    // If it's a skvett pall.
    const skvettPall = new SkvettPall(product, quantity);
    skvettPalls.push(skvettPall);
    // console.log("skvett pall height: ", skvettPall.getHeight() + " mm");
  }
}

  // combinePallets stack the skvett pallets over each other as long as they don't exceed height of 1400 mm in the most efficient way so the result is as least parcels (kolli) as possible.
  let skvettMixPall = formSkvettPall(mixProducts);
  // Combine the skvett pallets in the Best Fit Descending (BFD) approach, and put them in the comboPalls list.
  comboPalls = combinePallets(skvettPalls, MAX_HEIGHT);
  // If there is a mix pallet, handle it.
  if (skvettMixPall != null) {
    insertMixPall(skvettMixPall, comboPalls);
  }

  // combineComboPalls();
  const platser = calculatePlatser(skvettPalls, fullPalls);
  console.log("Platser: ", platser);

  const platserStackHeight = platserUsingStackHeight();
  console.log("Platser using stack height: ", platserStackHeight);
  displayResults();

  async function crossSelectedPall(event) {
    try {
      const element = event.target;
      const text = element.textContent;

      // Check if the text is already underlined
      const isUnderlined = element.style.textDecoration === 'line-through';
      
      // Toggle the underline style
      element.style.textDecoration = isUnderlined ? 'none' : 'line-through';

      // Optionally, you can perform additional async operations here
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  const elements = document.querySelectorAll('.line-through');
  elements.forEach(element => {
    element.addEventListener('click', crossSelectedPall);
  });

}

// Fetch the wanted product by its id.
function getProduct(productId, products) {
  return products.find(product => product.getId() === productId) || null;
}

// Form a skvett pallet from the mix products.
function formSkvettPall(mixProducts) {
  if (mixProducts.length == 0) {
    return null;
  }
  let totalHeight = 0;
  // totalQuantity is the total number of boxes as red boxes in the mix pallet.
  let quantityAsRedBoxes = 0;
  let stackHeight = 0;
  // Total number of boxes in the mix pallet.
  let boxesInMixPall = 0;

  for (const mixProduct of mixProducts) {
    // if the product's box is red
    if(mixProduct.getBox() === red) {
      quantityAsRedBoxes += mixProduct.getQuantity();
      boxesInMixPall += mixProduct.getQuantity();
    }
    // if the product's box is green
    else if(mixProduct.getBox() === green) {
      quantityAsRedBoxes += mixProduct.getQuantity() * 2;
      boxesInMixPall += mixProduct.getQuantity();
    }
    // if the product's box is black
    else if(mixProduct.getBox() === black) {
      quantityAsRedBoxes += mixProduct.getQuantity() * (red.maxStackHeight / black.maxStackHeight);
      boxesInMixPall += mixProduct.getQuantity();
    }
    // if the product's box is blue
    else if(mixProduct.getBox() === blue) {
      quantityAsRedBoxes += mixProduct.getQuantity() * (red.maxStackHeight / blue.maxStackHeight);
      boxesInMixPall += mixProduct.getQuantity();
    }
    // If the product's box is renrum
    else if(mixProduct.getBox() === renrum) {
      quantityAsRedBoxes += mixProduct.getQuantity() * (red.maxStackHeight / renrum.maxStackHeight);
      boxesInMixPall += mixProduct.getQuantity();
    }
  }
  // Calculate the stack height of the mix pallet.
  quantityAsRedBoxes = Math.ceil(quantityAsRedBoxes);
  stackHeight = Math.ceil(quantityAsRedBoxes / red.boxesInRow);

  // Calculate the total height of the mix pallet.
  totalHeight = red.fullHeight + (red.stackedUponHeight * (stackHeight - 1)) + SRSPallet.height;
  // skvettPalls.push(new SkvettPall(prodId, boxesInMixPall, totalHeight, stackHeight));
  return new MixPall("Mix Pall", boxesInMixPall, quantityAsRedBoxes, stackHeight, totalHeight);
}

// Combining the skvett pallets in the Best Fit Descending (BFD) approach,
// to get the least possible number of parcels to be shipped.
function combinePallets(pallets, maxSum) {
  // Modify the function so it combines pallets according to
  // their stack height instead of height in cm. 
  // Max height is the red max tack-height. 
  // Sort the pallets array in descending order by height
  pallets.sort((a, b) => b.getHeight() - a.getHeight());

  const parcelPallets = [];

  // For each pallet, find the best fit bin (pallet stack)
  for (let pallet of pallets) {

    let bestFitIndex = -1;
    let minRemainingHeight = maxSum;

    for (let i = 0; i < parcelPallets.length; i++) {
      const currentHeight = parcelPallets[i].reduce((sum, p) => sum + p.getHeight(), 0);
      const remainingHeight = maxSum - (currentHeight + pallet.getHeight());

      if (remainingHeight >= 0 && remainingHeight < minRemainingHeight) {
        bestFitIndex = i;
        minRemainingHeight = remainingHeight;
      }
    }

    // Place the pallet in the best fit bin or create a new bin
    if (bestFitIndex !== -1) {
      parcelPallets[bestFitIndex].push(pallet);
    } else {
      parcelPallets.push([pallet]);
    }
  }

  return parcelPallets;
}

// Combine Mix Pall with the lowest combo pall if possible.
function insertMixPall(mixPall, comboPalls) {

  let canCombine = false;
  let skvettPall = null;
  let comboPallToRemove = 0;

  // sortComboPalls(comboPalls);

  for (let i = 0; i < comboPalls.length; i++) {
    // If there is a combo pall that's low enough to add the mix pall to it, remove it from the comboPalls list and add the mix pall to it later.
    if (comboPalls[i].length < 2 && comboPalls[i][0].getStackHeight() < 4 && comboPalls[i][0].getHeight() + mixPall.getHeight() <= MAX_HEIGHT) {
      skvettPall = comboPalls[i];
      // console.log("inside handleMixPall: ", skvettPall);
      comboPallToRemove = i;
      canCombine = true;
      break;
    }

    // If there is a combo pall with more than 2 pallets, then remove a pallet from it and add the mix pallet to the removed pallet and put it in the comboPalls list.
    // There is no need to take out a skvett pall from a combo pall that's already well done, so skip it.
    // else if (comboPalls[i].length > 2 && comboPalls[i][0].getStackHeight() < 4 && comboPalls[i][0].getHeight() + mixPall.getHeight() <= MAX_HEIGHT) {
    //   // Sort the combo pallets in descending order by height.
    //   comboPalls[i].sort((a, b) => b.getHeight() - a.getHeight());
    //   // Remove the lowest pallet in the combo pall, and assign it to the local variable skvettPall.
    //   skvettPall = comboPalls[i].pop();
    //   canCombine = true;
    //   break;
    // }
  }

  if (skvettPall != null) {
    // Check if the skvetPall is an array or a single pallet.
    if (Array.isArray(skvettPall)) {
      // If it's an array, get the first element.
      skvettPall = skvettPall[0];
    }

  }

  if (canCombine) {
    skvettPalls.push(mixPall);
    let comboPall = [mixPall, skvettPall];

    // Add the new combo pall to the comboPalls list.
    comboPalls.push(comboPall);
  }
  else {
    skvettPalls.push(mixPall);
    comboPalls.push([mixPall]);
  }
}

function combineComboPalls() {
    // Get the comboPall that contains the mix pall.
    const mixCombo = comboPalls.find(combo => combo.some(pall => pall.getPallId() === "Mix Pall"));
    // Get the hieght of the mixCombo.
    const mixComboHeight = mixCombo.reduce((sum, pall) => sum + pall.getHeight(), 0);

    for (let combo of comboPalls) {
      // If combo contains the mix pall then skip it.
      if (combo.some(pall => pall.getPallId() === "Mix Pall")) {
        continue;
      }
      // If the combo contains more than one pallet then skip it.
      if (combo.length > 1) {
        continue;
      }
      // If the combo contains only one pallet, then try to combine it with the mixCombo.
      if (mixCombo != null) {
        // If the height of the combo pall is less than the max height, then combine it with the mixCombo.
        if (combo[0].getHeight() + mixComboHeight <= MAX_HEIGHT) {
          mixCombo.push(combo[0]);
          comboPalls.splice(comboPalls.indexOf(combo), 1);
          comboPalls.splice(comboPalls.indexOf(mixCombo), 1);
          comboPalls.push(mixCombo);
        }
      }
    }
}

function calculatePlatser(skvettPalls, fullPalls) {
  let totalHeight = 0;
  let platser = 0;

  // Calculate the total height of the skvett pallets.
  for (const skvettPall of skvettPalls) {

    totalHeight += skvettPall.getHeight();
  }
  // Calculate the total height of the full pallets.
  for (const fullPall of fullPalls) {    
    for (const pall of fullPall) {
      totalHeight += pall.getHeight();
    }
  }

  platser = totalHeight / EnPlats;
  return platser;
}
// Calculate platser using stack height.
function platserUsingStackHeight() {
  let platser = 0;
  let totalStackHeight = 0;
  let SRSCount = skvettPalls.length;
  // Each two full palls are 1 platser.

  // for (const fullPall of fullPalls) {
  //   platser += fullPall.length / 2;
  // }
  // Or Add each full pall's stack height to the total stack height,
  // and divide it by 18 to get the number of platser, don't forget the srs count.
  for (const fullPall of fullPalls) {
    for (const pall of fullPall) {
      totalStackHeight += pall.getStackHeight();
      SRSCount += 1;
    }
  }
  // Sum the stack height of the skvett palls.
  for (const skvetPall of skvettPalls) {
    totalStackHeight += skvetPall.getStackHeight();
  }

  platser = (totalStackHeight + SRSCount) / 18;
  return platser;
}

function displayResults() {
  // Hide title, radio buttons and the user inputs.
  const pageTitle = document.getElementById('pageTitle');
  pageTitle.style.display = 'none';
  const radioButtons = document.getElementById('radioButtons');
  radioButtons.style.display = 'none';
  const userInputs = document.getElementById('userInputs');
  userInputs.style.display = 'none';

  let outputArea = document.getElementById("output");
  outputArea.innerHTML = formatOutput();
}

function formatOutput() {
  let output = ``;
  if (kund.trim().length != 0 && kund != "") {
    output += `<h2><i>${kund}:&nbsp;&nbsp;&nbsp; </i><`;
  }
  else {
    output += `<h2><i>Kund &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>`;
  }
  if (orderDate.trim().length != 0 && orderDate != "") {
    output += `Datum: <i>${orderDate}</i></h2><br>`;
  }
  else {
    output += `Datum: <i>${getFormattedDate()}</i></h2><br>`;
  }

  const totalFullPalls = fullPallsQuantity(fullPalls);
  const SRS = skvettPalls.length + totalFullPalls;
  const Kolli = comboPalls.length + totalFullPalls;
  const platser = calculatePlatser(skvettPalls, fullPalls);

  if (!document.getElementById('comboRadio').checked) {
    output += `<p>Antal Platser: <i>${platser.toFixed(2)}</i><br><br></p>`;
    output += `<p>Antal Kolli: <i>${SRS}</i><br><br></p>`;
    output += (`<p>SRS-Pall: <i>${SRS}</i><br><br></p>`)
    output += (`<p>Lådor: <i>${totalQuantityOfBoxes()}</i><br><br></p>`);

  }
  else {
    output += `<div class="kolli-container">`;

    output += `<p>Antal Kolli: <i>${Kolli}</i><br><br></p>`;
    output += (`<p>SRS Pall: <i>${SRS}</i><br><br></p>`);
    output += (`<p>Lådor: <i>${totalQuantityOfBoxes()}</i><br><br></p>`);
    output += "</div>";
  }

  output += `<p class='headText'>Full Pall:</p>\n`;
  output += `<ul>`;


  // Sort fullPalls by height in descending order.
  fullPalls.sort((a, b) => b.reduce((sum, p) => sum + p.getHeight(), 0) - a.reduce((sum, p) => sum + p.getHeight(), 0));

  for (const fullPall of fullPalls) {
    let prodId = " ";
    for (const pall of fullPall) {
      prodId = pall.getProduct().getId();
    }
    output += `<p class="full-pall">`
    output += `<li class="line-through">${prodId}: `;

    for (const pall of fullPall) {
      output += `(${pall.getQuantity()})` + " ";
    }

    output += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + `${fullPall.length}` + "].</li></p>\n";

    
  }
  output += "</ul>"

  if (document.getElementById('comboRadio').checked) {
    // Sort comboPalls by height in descending order.
    comboPalls.sort((a, b) => b.reduce((sum, p) => sum + p.getHeight(), 0) - a.reduce((sum, p) => sum + p.getHeight(), 0));

    output += "\n\n <p class='headText'>Combo Pall: </p>\n";
    output += `<ul>`;

    for (const combo of comboPalls) {
      // If combo contains the mix pall then skip it.
      if (combo.some(pall => pall.getPallId() === "Mix Pall")) {
        continue;
      }
      output += `<p class="combo-pall">`
      output += `<li class="line-through">`;
      for (const skvettPall of combo) {
        output += `\n${skvettPall.product.getId()}: ${skvettPall.getQuantity()}<br>`;
      }
      output += "</li></p>";
    }

    // Find the combo pall that contains the mix pall.
    const mixCombo = comboPalls.find(combo => combo.some(pall => pall.getPallId() === "Mix Pall"));
    // output += `<p class="mix-pall">`;
    if (mixCombo != null) {
      output += `<li class="line-through">`;
      for (const skvettPall of mixCombo) {
        if (skvettPall.getPallId() == "Mix Pall") {
          output += `\n${skvettPall.getPallId()}: ${skvettPall.getQuantity()}<br>`
          continue;
        } else {
          output += `\n${skvettPall.product.getId()}: ${skvettPall.getQuantity()}<br>`;
        }
      }
      output += "</li>";
    }
    output += "</ul>"

  } else {

    output += `\n\n<p class='headText'> Enkel Pall: </p>\n`;
    // Sort the pallets by height in descending order.
    skvettPalls.sort((a, b) => b.getHeight() - a.getHeight());

    output += "<ul>";
    for (const skvettPall of skvettPalls) {
      if (skvettPall.getPallId() === "Mix Pall") {
        continue;
      }
      output += `<li class="line-through">${skvettPall.product.getId()}: ${skvettPall.getQuantity()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(${skvettPall.getStackHeight()})</li>\n`;
    }
    // Find the mix pallet in the skvett pallets list.
    const mixPall = skvettPalls.find(pall => pall.getPallId() === "Mix Pall");

    if (mixPall != null) {
      output += `<li class="line-through">${mixPall.getPallId()}: ${mixPall.getQuantity()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(${mixPall.getStackHeight()})</li>\n`;
    }
    
    output += "</ul>";
  }

  output += "\n\n Mix Pall: \n\n";
  output += `<ul>`;
  // Sort the mix products by Id in ascending order.
  if (mixProducts.length > 0) {
    mixProducts.sort((a, b) => a.product.getId() - b.product.getId());
    for (const mixProduct of mixProducts) {
      output += `<li class='line-through'>${mixProduct.product.getId()}: ${mixProduct.getQuantity()}</li>\n`;
    }
  }

  output += "</ul>";

  return output;
}

function fullPallsQuantity(fullPalls) {
  let counter = 0;
  for (const fullPall of fullPalls) {
    counter += fullPall.length;
  }
  return counter;
}

function totalQuantityOfBoxes(){
  let totalQuantity = 0;
  for (const fullPall of fullPalls) {
    for (const pall of fullPall) {
      totalQuantity += pall.getQuantity();
    }
  }
  for (const skvettPall of skvettPalls) {
    totalQuantity += skvettPall.getQuantity();
  }
  return totalQuantity;
}

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}