// Todo: 
// Add all the products in the products array.

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

const EUPallet = new EmptyPallet(1200, 800, 144);
const MAX_HEIGHT = 1400;
const EnPlats = MAX_HEIGHT * 2;

const red = new Box(400, 300, 156, 8, 64, 8);
const green = new Box(600, 400, 180, 7, 28, 4);
const blue = new Box(400, 300, 114, 11, 88, 8);
const renrum = new Box(400, 300, 78, 16, 128, 8);
const black = new Box(400, 300, 209, 6, 48, 8);

const orders = [];

let fullPalls = [];
let skvettPalls = [];
let mixProducts = [];
let comboPalls = [];

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
  var fileInput = document.getElementById('excelFile');
  var dropZone = document.getElementById('dropZone');
  if (fileInput.files.length > 0) {
      var fileName = fileInput.files[0].name;
      dropZone.innerHTML = fileName;
  }
}
dropZone.addEventListener('drop', async (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
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
  orders.length = 0;  // Clear the existing array
  result.forEach(order => orders.push(new Order(order.prodId, order.quantity)));
  return result;
}

function extractArtikelAndDFP(data) {
  const result = [];

  // Assuming the first row contains headers
  const headers = data[0];
  const artikelIndex = headers.indexOf("Artikelnummer");
  const dfpIndex = headers.indexOf("Beställda DFP");

  if (artikelIndex === -1 || dfpIndex === -1) {
    throw new Error("Required columns not found in the Excel sheet.");
  }

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const prodId = parseInt(row[artikelIndex]);
    const quantity = parseInt(row[dfpIndex]);

    if (!isNaN(prodId) && !isNaN(quantity)) {
      // e.g ordered 1168 : 93, then full palls is 1, new quantity is (93 - 64 = 29)
      result.push({ prodId, quantity });
    }
    // Update the stack height of the new quantity,e.g 29 boxes of 1168 is 3 boxes heigh.
  }

  return result;
}

function fixaPlockListan() {

  // Let the magic begins!
  orders.forEach((order) => {
    let product = getProduct(order.getProdId(), products);


    if (!product) {
      console.error(`Product with id ${order.getProdId()} not found.`);
      return;
    }

    // Get how many boxes high is the ordered product.
    let stackHeight = Math.ceil(order.quantity / product.getBox().boxesInRow);

    // If the quantity can be one or more full pallets.
    if (parseInt((order.quantity / product.getBox().fullPall)) != 0) {
      // Put them in the fullPalls list.
      const fullPallHeight = (product.getBox().height * product.getBox().fullPall) + EUPallet.height;
      fullPalls.push(new FullPall(order.getProdId(), Math.floor(order.quantity / product.getBox().fullPall), product.getBox().fullPall, fullPallHeight));
      // Update the quantity after subtracting the full pallets.
      order.quantity = order.quantity % product.getBox().fullPall;

      stackHeight = Math.ceil(order.quantity / product.getBox().boxesInRow);

      // If the remainder can't be stacked on it. e.g 1311 : 49
      // Put the remainder pall in the full pallets list.
      if (product.getBox() === red && stackHeight > 6 || // for red.
        product.getBox() === green && stackHeight > 5 ||     // for green.
        product.getBox() === renrum && stackHeight > 12 || // for renrum.
        product.getBox() === black && stackHeight > 4)     // for black.

      {
        const fullPall = getFullPall(order.getProdId(), fullPalls);
        if (fullPall !== null) {
          fullPall.setNotFull(order.quantity);
          order.quantity = 0;
        }
      } else {
        // If the remainder can be stacked, 
        // handle it using handleSkvettOrMixPall method.
        stackHeight = Math.ceil(order.quantity / product.getBox().boxesInRow);
        handleSkvettOrMixPall(order, product, stackHeight);
      }
    } else {
      // If it can't form a full pallet, then check if it can be a mix product,
      // or a skvett pallet.
      handleSkvettOrMixPall(order, product, stackHeight);
    }
  });

  // combinePallets stack the skvett pallets over each other as long as they don't exceed height of 1400 mm in the most efficient way so the result is as least parcels (kolli) as possible.
  comboPalls = combinePallets(skvettPalls, MAX_HEIGHT);

  const antalFullPall = fullPallsQuantity(fullPalls);
  console.log("SRS Pall: ", skvettPalls.length + antalFullPall + 1);

  console.log("Platser: ", calculatePlatser(skvettPalls, fullPalls, mixProducts));

  const platser = calculatePlatser(skvettPalls, fullPalls, mixProducts);
  // Self-explained.
  displayResults(platser);
}

// Fetch the wanted product by its id.
function getProduct(productId, products) {
  return products.find(product => product.getId() === productId) || null;
}

// Fetch the wanted full pall to edit its quantity.
function getFullPall(prodId, fullPalls) {
  return fullPalls.find(pall => pall.getProdId() === prodId) || null;
}

// Check if the quantity could be a skvett pall or a mix product.
function handleSkvettOrMixPall(order, product, stackHeight) {
  // If it's on a blandpall. 
  if (order.quantity < product.getBox().boxesInRow) {
    mixProducts.push(new MixProduct(order.getProdId(), order.quantity));
    order.quantity = 0;

  } else {
    const skvettHeight = (product.getBox().height * stackHeight) + EUPallet.height;
    skvettPalls.push(new SkvettPall(order.getProdId(), order.quantity, skvettHeight, stackHeight));
  }
}

// Combining the skvett pallets in the Best Fit Descending (BFD) approach,
// to get the least possible number of parcels to be shipped.
function combinePallets(pallets, maxSum) {
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
function fullPallsQuantity(fullPalls) {
  let counter = 0;
  for (pall of fullPalls) {
    counter += pall.quantity;
  }
  return counter;
}

function calculatePlatser(skvettPalls, fullPalls, mixProducts) {
  let totalHeight = 0;
  let platser = 0;
  let boxesInMixPall = 0;
  for (const skvettPall of skvettPalls) {
    totalHeight += skvettPall.getHeight();
  }

  for (const fullPall of fullPalls) {

    totalHeight += fullPall.height * fullPall.getQuantity();
  }

  for (const mixProduct of mixProducts) {
    boxesInMixPall += mixProduct.getQuantity();
  }
  // Calculate the height of the mix pallet.
  MixPallHeight = (((boxesInMixPall / 8) + 1) * red.height) + EUPallet.height;

  // Add the height of the mix pallet to the total height.
  totalHeight += MixPallHeight;
  // Calculate the number of platser.
  platser = totalHeight / EnPlats;
  return platser;
}

function displayResults(platser) {
  let outputArea = document.getElementById("output");
  outputArea.innerHTML = formatOutput(fullPalls, comboPalls, mixProducts, platser);

  // outputArea.value = formatOutput(fullPalls, comboPalls, mixProducts, platser);
}

function formatOutput(fullPalls, comboPalls, mixProducts, platser) {
  let output = ``;
  const totalFullPalls = fullPalls.reduce((sum, pall) => sum + pall.getQuantity(), 0);

  if (!document.getElementById('comboRadio').checked) {
    output += `<br><br>Antal Platser: <i>${platser.toFixed(2)}</i><br><br>\n\n`;
    output += `Antal Kolli: <i>${totalFullPalls + skvettPalls.length + 1}</i><br><br>\n\n`;
  }
  else {
    output += `<br><br>Antal Kolli: <i>${totalFullPalls + comboPalls.length + 1}</i><br><br>\n\n`;
  }

  output += `Full Pall: \n`;
  output += "<ul>"
  for (const fullPall of fullPalls) {
    output += `<li class="fullPalls">${fullPall.getProdId()}: ${Array(fullPall.getQuantity()).fill(fullPall.boxesInFullPall).join(' ')}`;

    if (fullPall.notFull != null) {
      output += ` ${fullPall.getNotFull()}`;
      output += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + `${fullPall.quantity + 1}` + ").</li>\n";
    }
    else {
      output += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + `${fullPall.quantity}` + ").</li>\n";
    }
  }
  output += "</ul>"

  if (document.getElementById('comboRadio').checked) {
    output += "\n\n Combo Pall: \n";
    output += "<ul>"
    for (const combo of comboPalls) {
      output += `<li class="comboPalls">`;
      for (const skvettPall of combo) {
        output += `\n${skvettPall.getProdId()}: ${skvettPall.getQuantity()}<br>`;
      }
      output += "</li>";

    }
    output += "</ul>"
  } else {

    output += `\n\n Enkel Pall: \n`;
    skvettPalls.sort((a, b) => b.getHeight() - a.getHeight());
    output += "<ul>";
    for (const skvettPall of skvettPalls) {
      output += `<li class="comboPalls">${skvettPall.getProdId()}: ${skvettPall.getQuantity()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(${skvettPall.stackHeight})</li>\n`;

    }
    output += "</ul>";
    console.log()
  }

  output += "\n\n Mix Pall: \n\n";
  output += "<ul>";
  for (const mixProduct of mixProducts) {
    output += `<li>${mixProduct.getProdId()}: ${mixProduct.getQuantity()}</li>\n`;
  }
  output += "</ul>";

  return output;
}

// Display as a table


// function formatOutput(fullPalls, comboPalls, mixProducts, platser) {
//   let output = ``;
//   const totalFullPalls = fullPalls.reduce((sum, pall) => sum + pall.getQuantity(), 0);

//   output += `<div class="output-section">`;
//   if (!document.getElementById('comboRadio').checked) {
//     output += `<p>Antal Platser: ${platser.toFixed(2)}</p>`;
//     output += `<p>Antal Kolli: ${totalFullPalls + skvettPalls.length + 1}</p>`;
//   } else {
//     output += `<p>Antal Kolli: ${totalFullPalls + comboPalls.length + 1}</p>`;
//   }

//   output += `<h3>Full Palls:</h3>`;
//   output += `<table class="table-full-palls"><tr><th>ProdID</th><th>Quantity</th></tr>`;
//   for (const fullPall of fullPalls) {
//     let details = fullPall.notFull != null ? `${fullPall.getNotFull()} (${fullPall.quantity + 1})` : `(${fullPall.quantity})`;
//     output += `<tr><td>${fullPall.getProdId()}</td><td>${fullPall.getQuantity()}</td></tr>`;
//   }
//   output += `</table>`;

//   if (document.getElementById('comboRadio').checked) {
//     output += `<h3>Combo Palls:</h3><table class="table-combo-palls"><tr><th>Combo Details</th></tr>`;
//     for (const combo of comboPalls) {
//       output += `<tr><td>`;
//       for (const skvettPall of combo) {
//         output += `${skvettPall.getProdId()}: ${skvettPall.getQuantity()}<br>`;
//       }
//       output += `</td></tr>`;
//       output += `<tr><td colspan="3"><hr></td></tr>`; // Inserted line

//     }
//     output += `</table>`;
//   } else {
//     output += `<h3>Enkel Palls:</h3><table class="table-enkel-palls"><tr><th>Product ID</th><th>Quantity</th><th>Stack Height</th></tr>`;
//     skvettPalls.sort((a, b) => b.getHeight() - a.getHeight());
//     for (const skvettPall of skvettPalls) {
//       output += `<tr class="table-row-spacing"><td>${skvettPall.getProdId()}</td><td>${skvettPall.getQuantity()}</td><td>${skvettPall.stackHeight}</td></tr>`;
//     }
//     output += `</table>`;
//   }

//   output += `<h3>Mix Pall:</h3><table class="table-mix-pall"><tr><th>Product ID</th><th>Quantity</th></tr>`;
//   for (const mixProduct of mixProducts) {
//     output += `<tr><td>${mixProduct.getProdId()}</td><td>${mixProduct.getQuantity()}</td></tr>`;
//   }
//   output += `</table>`;
//   output += `</div>`;

//   return output;
// }
