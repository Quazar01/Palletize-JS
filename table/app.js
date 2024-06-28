// Description: This file contains the main logic for the application. It processes the Excel file, extracts the data, and generates the output based on the requirements. The output is then displayed on the web page for the user to view. 

/* TODO: extract only the numbers from Artikelnummer   */
let comboPallsTable = "";
let fullPallsTable = "";

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
const EnPlats = MAX_HEIGHT * 2;

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

dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  const arrayBuffer = await file.arrayBuffer();
  try {
    await processExcel(arrayBuffer);

    // Basically, the main function!
    fixaPlockListan();

  } catch (error) {
    console.error('Error processing Excel file:', error);
    alert('There was an error processing the Excel file. Check the console for details.');
  }
});

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

    // if (headers.includes("levArtikel")) {
    //   artikelIndex = headers.indexOf("levArtikel");
    // }
    // if (headers.includes("Whatever")) {
    //   dfpIndex = headers.indexOf("Whatever");
    // }

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

  let radioButtons = document.getElementsByClassName('radioContainer');
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].style.display = 'none';
  }
  // Get the test.html document.

  // Get the body element.
  let body = document.getElementsByTagName('body')[0];
  // Create a style for the body.
  body.style = `
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f2f2f2;`;
  // Let the magic begins!
  orders.forEach((order) => {
    // Find the product by its id.
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
  console.log("Combo Palls: ", comboPalls);
  console.log("Skvett Mix Pall: ", skvettMixPall);
  // If there is a mix pallet, handle it.
  if (skvettMixPall != null) {
    handleMixPall(skvettMixPall, comboPalls);
  }


  const platser = calculatePlatser(skvettPalls, fullPalls);
  console.log("Platser: ", platser);

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

export { comboPallsTable, fullPallsTable };

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
function handleMixPall(mixPall, comboPalls) {
  let canCombine = false;
  let skvettPall = null;
  let comboPallToRemove = 0;

  // sortComboPalls(comboPalls);

  for (let i = 0; i < comboPalls.length; i++) {
    // If there is a combo pall that's low enough to add the mix pall to it, remove it from the comboPalls list and add the mix pall to it later.
    if (comboPalls[i].length < 2 && comboPalls[i][0].getStackHeight() < 4 && comboPalls[i][0].getHeight() + mixPall.getHeight() <= MAX_HEIGHT) {
      skvettPall = comboPalls[i];
      comboPallToRemove = i;
      canCombine = true;
    }

    // If there is a combo pall with more than 2 pallets, then remove a pallet from it and add the mix pallet to the removed pallet and put it in the comboPalls list.
    else if (comboPalls[i].length > 2) {
      // Sort the combo pallets in descending order by height.
      comboPalls[i].sort((a, b) => b.getHeight() - a.getHeight());
      skvettPall = comboPalls[i].pop();
      canCombine = true;
      continue;
    }
  }

  if (skvettPall != null) {
    // Check if the skvetPall is an array or a single pallet.
    if (Array.isArray(skvettPall)) {
      skvettPall = skvettPall[0];
    }
  }
  if (canCombine) {
    skvettPalls.push(mixPall);
    let comboPall = [mixPall, skvettPall];
    // Remove the combo pall that was low enough to add the mix pall to it.
    comboPalls.splice(comboPallToRemove, 1);
    // Add the new combo pall to the comboPalls list.
    comboPalls.push(comboPall);
  }
  else {
    skvettPalls.push(mixPall);
    comboPalls.push([mixPall]);

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
      const pallStackheight = pall.getQuantity() / pall.product.getBox().boxesInRow;
      const pallHeight = pall.product.getBox().fullHeight + (pall.product.getBox().stackedUponHeight * (pallStackheight - 1)) + SRSPallet.height;
      totalHeight += pallHeight;
    }
  }

  platser = totalHeight / EnPlats;
  return platser;
}
// Calculate platser using stack height.
// function platserUsingStackHeight(skvettPalls, fullPalls) {
//   let platser = 0;
//   let totalStackHeight = 0;
//   let SRSCount = skvettPalls.length;
//   // Each two full palls are 1 platser.
//   for (const fullPall of fullPalls) {
//     platser += fullPall.quantity / 2;
//   }
//   // Calculate each skvett pall stack height in respect to the red box, and add it to the total stack height.
//   // TODO: Consider the other boxes in the mix pallets. Fix a function to calculate the stack height of the mix pallets.
//   for (const skvettPall of skvettPalls) {
//     const box = skvettPall.getBox();
//     if (box == red) {
//       totalStackHeight += skvettPall.stackHeight;
//       // console.log("red stack height: ", skvettPall.stackHeight);
//     }
//     else if (box == green) {
//       totalStackHeight += Math.ceil(skvettPall.stackHeight * (8 / 7));
//       // console.log("green stack height: ", skvettPall.stackHeight * (8 / 7));
//     }
//     else if (box == black) {
//       totalStackHeight += Math.ceil(skvettPall.stackHeight * (8 / 6));
//       // console.log("black stack height: ", skvettPall.stackHeight * (8 / 6));
//     }
//     else if (box == blue) {
//       totalStackHeight += Math.ceil(skvettPall.stackHeight * (8 / 11));
//       // console.log("blue stack height: ", skvettPall.stackHeight * (8 / 11));
//     }
//     else if (box == renrum) {
//       totalStackHeight += skvettPall.stackHeight * (8 / 16);
//       // console.log("renrum stack height: ", skvettPall.stackHeight * (8 / 16));
//     }
//   }
//   totalStackHeight += SRSCount;
//   platser += totalStackHeight / 18;

//   return platser;
// }



function formatOutput() {
  let output = ``;

  const totalFullPalls = fullPallsQuantity(fullPalls);
  const SRS = skvettPalls.length + totalFullPalls;
  const Kolli = comboPalls.length + totalFullPalls;
  const platser = calculatePlatser(skvettPalls, fullPalls);

  if (!document.getElementById('comboRadio').checked) {
    output += `<br>Lådor: <i>${totalQuantityOfBoxes()}</i><br>`;
    output += `<br>Antal Platser: <i>${platser.toFixed(2)}</i><br><br>`;
    output += `Antal Kolli: <i>${SRS}</i><br><br>`;
    output += `SRS-Pall: <i>${SRS}</i>`;
  }
  else {
    output += `<br><br>Antal Kolli: <i>${Kolli}</i><br><br>\n\n`;
    output += (`SRS Pall: <i>${SRS}</i><br><br>\n\n`);
    output += (`Lådor: <i>${totalQuantityOfBoxes()}</i><br><br>\n\n`);
  }

  output += `<p class='headText'>Full Pall:</p>\n`;
  output += "<ul>"


  // Sort fullPalls by height in descending order.
  fullPalls.sort((a, b) => b.reduce((sum, p) => sum + p.getHeight(), 0) - a.reduce((sum, p) => sum + p.getHeight(), 0));

  // Sort fullPalls by the length of the pallets in descending order.
  // fullPalls.sort((a, b) => b.length - a.length);

  for (const fullPall of fullPalls) {
    let prodId = " ";
    for (const pall of fullPall) {
      prodId = pall.getProduct().getId();
    }
    output += `<li class="line-through">${prodId}: `;

    for (const pall of fullPall) {
      output += `(${pall.getQuantity()})` + " ";
    }

    output += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + `${fullPall.length}` + ").</li>\n";
    
  }
  output += "</ul>"

  if (document.getElementById('comboRadio').checked) {
    // Sort comboPalls by height in descending order.
    comboPalls.sort((a, b) => b.reduce((sum, p) => sum + p.getHeight(), 0) - a.reduce((sum, p) => sum + p.getHeight(), 0));

    output += "\n\n <p class='headText'>Combo Pall: </p>\n";
    output += "<ul>"

    for (const combo of comboPalls) {
      // If combo contains the mix pall then skip it.
      if (combo.some(pall => pall.getPallId() === "Mix Pall")) {
        continue;
      }
      output += `<li class="line-through">`;
      for (const skvettPall of combo) {
        output += `\n${skvettPall.product.getId()}: ${skvettPall.getQuantity()}<br>`;
      }
      output += "</li>";
    }

    // Find the combo pall that contains the mix pall.
    const mixCombo = comboPalls.find(combo => combo.some(pall => pall.getPallId() === "Mix Pall"));

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
  output += "<ul>";
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


function generateComboPallTable(comboPalls){
  // Find the combo pall that contains the mix pall, and remove it from the comboPalls list.

  let comboMixPall = comboPalls.find(combo => combo.some(pall => pall.getPallId() === "Mix Pall"));

  if (comboMixPall != null) {
    comboPalls = comboPalls.filter(combo => !combo.some(pall => pall.getPallId() === "Mix Pall"));
  }

  let comboMixPallSRS = comboMixPall.length;

  // Take out the mix pall from the comboMixPall.
  let mixPall = comboMixPall.find(pall => pall.getPallId() === "Mix Pall");
  
  // Remove the mix pall from the comboMixPall.
  comboMixPall = comboMixPall.filter(pall => pall.getPallId() !== "Mix Pall");

  let container = document.body;
  console.log("Container: ", container);
  container.innerHTML = "";

  let table = `  <div class="tables-container" id="output">
                  <table>
                    <tr>
                        <th>SRS</th>
                        <th>Art nr</th>
                        <th>DFP</th>
                        <th>Klar</th>
                        <th>Anmärkning</th>
                    </tr>
                    <div class="comboPall">
            `;

  comboPalls.forEach(combo => {

    let counter = combo.length;

    if (combo.length == 2) {
      table += `<tr>
      <td class="srs">${combo.length}</td>`;
      combo.forEach(skvettPall => {
        counter--;
        // Display the product id and quantity.
        table += `<td>${skvettPall.product.getId()}</td>`;
        table += `<td>${skvettPall.getQuantity()}</td>`;
        // Display the status of the pallet as an empty cell.
        table += `<td></td>`;
        // Display the remark of the pallet as an empty cell.
        table += `<td></td>`;
        table += `</tr>`;
        if (counter != combo.length) {
          // Add an empty SRS cell for the second pallet.
          table += `<tr><td class="srs"></td>`;
          counter = combo.length;
        }
        else {
          // Add an empty row.
          table += `<tr><td class="srs"></td><td></td><td></td><td></td></tr>`;
          table += `</div>`;
        }
      });
    }
    else if (combo.length == 3) {
      // First SRS is empty.
      table += `<tr><td class="srs"></td>`;
      combo.forEach(skvettPall => {
        counter--;
        // Display the product id and quantity.
        table += `<td>${skvettPall.product.getId()}</td>`;
        table += `<td>${skvettPall.getQuantity()}</td>`;
        // Display the status of the pallet as an empty cell.
        table += `<td></td>`;
        // Display the remark of the pallet as an empty cell.
        table += `<td></td>`;
        table += `</tr>`;

        // If the counter is combo.length - 1, then add an empty SRS cell.
        if (counter == combo.length - 1) {
          table += `<tr><td class="srs">${combo.length}</td>`;
        }
        else {
          // Add an empty SRS cell for the next pallet.
          table += `<tr><td class="srs"></td>`;
        }
        if (counter == 0) {
          // Add an empty row.
          table += `<td></td><td></td><td></td><td></td></tr>`;
        }
      });
    }
    else if (combo.length == 1) {
      table += `<tr><td class="srs">${combo.length}</td>`;
      combo.forEach(skvettPall => {
        // Display the product id and quantity.
        table += `<td>${skvettPall.product.getId()}</td>`;
        table += `<td>${skvettPall.getQuantity()}</td>`;
        // Display the status of the pallet as an empty cell.
        table += `<td></td>`;
        // Display the remark of the pallet as an empty cell.
        table += `<td></td>`;
        table += `</tr>`;
      });
      // Add an empty row.
      table += `<tr><td class="srs"></td><td></td><td></td><td></td></tr>`;
    }
    table += "</div>";
    
  });

  // Display the mix pall.
  // Add two empty rows.
  table += `<tr><td></td><td></td><td></td><td></td><td></td</tr>`;
  table += `<tr><td></td><td></td><td></td><td></td><td></td</tr>`;
  table += `<tr><td class="srs">${comboMixPallSRS}</td>`;
  table += `<td>${mixPall.getPallId()}</td><td></td><td></td><td></td></tr>`;
  if (mixProducts.length == 0) {
    table += `<tr><td></td><td></td><td></td><td></td><td></td></tr>`;
  } else {  
    for (const mixProduct of mixProducts) {
      table += `<tr><td class="srs"></td><td>${mixProduct.product.getId()}</td><td>${mixProduct.getQuantity()}</td><td></td><td></td></tr>`;
    }
  }

  if (comboMixPall.length != 0) {
    // Display the comboMixPall.
    // Add a thick row.
    table += `<tr><td class="thickLine"></td><td class="thickLine"></td><td class="thickLine"></td><td class="thickLine"></td><td class="thickLine"></td></tr>`;
    for (const skvettPall of comboMixPall) {
      table += `<tr><td></td>`;
      table += `<td>${skvettPall.product.getId()}</td><td>${skvettPall.getQuantity()}</td><td></td><td></td></tr>`;
    }
  }

  table += "</table>";
  container.innerHTML += table;
  return table;
}
function generateFullPallTable(fullPalls) {
  const container = document.getElementById('output');
  // Get the longest list inside the fullPalls list.
  fullPalls.sort((a, b) => b.length - a.length);
  
  let table = `
        <table>
            <tr>
                <th>Art nr</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            <tr>`;
  
  fullPalls.forEach(pall => {
    table += `<td>${pall[0].product.getId()}</td>`;
    // Counter is the number of full pallets of the product.
    let counter = 1;
    pall.forEach(full => {
      if (counter % 5 == 0){
        table += `</tr><tr>
                    <td></td>`;
        counter = 1;
      }
      table += `<td>${full.quantity}</td>`;
      counter++;
    });
    if (counter < 5) {
      for (let i = counter; i < 5; i++) {
        table += `<td></td>`;
      }
    }
    table += '</tr>';
    
  });
  
  table += '</table>';
  table += '</div>';
  table += `</body>`;
  container.innerHTML += table;
  return table;
}

function displayResults() {
  let outputArea = document.getElementById("output");
  // outputArea.innerHTML = formatOutput();
  console.log(comboPalls);
  comboPallsTable =  generateComboPallTable(comboPalls);

  fullPallsTable = generateFullPallTable(fullPalls);

  // Open the test.html taht's in the plocklista folder page in a new tab.
  // let newWindow = window.open("plocklista/test.html", "_blank");
    // Find the combo pall that contains the mix pall, and remove it from the comboPalls list.
    // let comboMixPall = comboPalls.find(combo => combo.some(pall => pall.getPallId() === "Mix Pall"));

    // if (comboMixPall != null) {
    //   comboPalls = comboPalls.filter(combo => !combo.some(pall => pall.getPallId() === "Mix Pall"));
    // }
  
    // let comboMixPallSRS = comboMixPall.length;
    // console.log("Combo Mix Pall SRS: ", comboMixPallSRS);
    // // Take out the mix pall from the comboMixPall.
    // let mixPall = comboMixPall.find(pall => pall.getPallId() === "Mix Pall");
    // // Remove the mix pall from the comboMixPall.
    // comboMixPall = comboMixPall.filter(pall => pall.getPallId() !== "Mix Pall");

    // console.log("Combo Mix Pall: ", comboMixPall);
    // console.log("Mix Pall: ", mixPall);
    // console.log("Mix products: ", mixProducts);

  // console.log("Full Palls: ", fullPalls);
  // console.log("Skvett Palls: ", skvettPalls);
  // console.log("Mix Products: ", mixProducts);
  // console.log("Combo Palls: , ", comboPalls);
  
}
