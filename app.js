// Description: This file contains the main logic for the application. It processes the Excel file, extracts the data, and generates the output based on the requirements. The output is then displayed on the web page for the user to view. 

// TODO: Before editing the list, check if the user is in edit mode for any of the lists. If so, do not allow editing. Done!
// TODO: Text goes out of place when editing Kolli, SRS, and Platser. Fix it. DONE!


/* When combining pallets, we need to consider the following:
  1. The height of the pallets.
      * Should not exceed 1340 mm.
      * With two exceptions pallets that could be 1360 mm.
  2. Mix Pallet could only be combined with a Skvett Pallet if it's stack height is less than 4.
  3. If the products has less than 7 boxes put in the mix pall, if the box is green then less than 3.
*/
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
    let stackHeight = Math.ceil((this.quantity / box.getBoxesInRow()));
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
  constructor(pallId, quantity, quantityAsRedBoxes, stackHeight, totalHeight) {
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
const MAX_HEIGHT = 1290;
const EnPlats = 1270 * 2;

const red = new Box(400, 300, 148, 136, 8, 64, 8); // Box(length, width, fullHeight,           stackedUponHeight, maxStackHeight, fullPall, boxesInRow)
const green = new Box(600, 400, 167, 154, 7, 28, 4);
const blue = new Box(400, 300, 108, 96, 11, 88, 8);
const renrum = new Box(400, 300, 108, 66, 16, 128, 8);
const black = new Box(400, 300, 193, 181, 6, 48, 8);

let orders = [];

let fullPalls = [];
let skvettPalls = [];
let mixProducts = [];
let comboPalls = [];
const products = [
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
  new Product("Not Set", 1294, red),
  new Product("Not Set", 1361, red),
  new Product("Not Set", 1391, red),
  new Product("Not Set", 1411, red),
  new Product("Not Set", 3941, green),
  new Product("Not Set", 3948, green),
  new Product("Not Set", 9852, red),
  new Product("Not Set", 1043, red),
  new Product("Not Set", 1037, red),
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
  new Product("Not Set", 3762, green),
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
let ordersNummer = "Ingen Order Nummer!";

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
    if (ordersNummer.trim().length != 0 && ordersNummer != "") {
      ordersNummer = document.getElementById('orderNr').value;
    }
    else {
      ordersNummer = "";
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

  // Check for headers in the first 10 rows. DONE!
  // TODO: Modify this to fit the list from DAGAB as well. DONE!
  let artikelIndex = -1;
  let dfpIndex = -1;
  for (let i = 0; i <= 20; i++) {
    const headers = data[i];
    if (headers.includes("Artikelnummer")) {
      artikelIndex = headers.indexOf("Artikelnummer");
    }

    // For the list from DAGAB
    if (headers.includes("Lev artikel")) {
      artikelIndex = headers.indexOf("Lev artikel");
    }
    // For the list from DAGAB
    if (headers.includes("Kollin")) {
      dfpIndex = headers.indexOf("Kollin");
    }
    if (headers.includes("Prognos DFP")) {
      // The values of this header are in two columns. For example if Prognos DFP is in column M then the values are in column M and N.
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
        product.getBox() === blue && stackHeight > 9 || // for blue.
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


  let skvettMixPall = formSkvettPall(mixProducts);
  // If there is a mix pallet, put it in the skvettPalls list.
  if (skvettMixPall != null) {
    skvettPalls.push(skvettMixPall);
  }

  // Combine the skvett pallets in the Branch-and-Bound approach, and put them in the comboPalls list.
  comboPalls = combinePallets(skvettPalls, MAX_HEIGHT);
  if(comboPalls == null) {
    comboPalls = [];
  }
  // If there is a mix pallet, handle it.
  // if (skvettMixPall != null) {
  //   insertMixPall(skvettMixPall, comboPalls);
  // }

  // combineComboPalls();
  const platser = calculatePlatser(skvettPalls, fullPalls);
  console.log("Platser: ", platser);

  const platserStackHeight = platserUsingStackHeight();
  console.log("Platser using stack height: ", platserStackHeight);
  // console.log("3467 Full Pall height: ", fullPalls[0][0].getHeight() + " mm");
  // console.log("43527 Full Pall height: ", fullPalls[2][0].getHeight()+ " mm");
  // console.log("5585 Full Pall height: ", fullPalls[3][0].getHeight()+ " mm");
  displayResults();

  

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('editToggle')) {
      editList(event.target);
    } else if (event.target.classList.contains('editable')) {
      EditOutput(event);
    }
  });

}

// Check if the quantity could be a skvett pall or a mix product.
function handleSkvettOrMixPall(product, quantity) {

  // If it's on a blandpall. 
  // If the product's quantity is zero, then return.
  if (quantity == 0) {
    return;
  }
  else if (product.getBox().boxesInRow == 4 && quantity < 4) {
    mixProducts.push(new MixProduct(product, quantity));
    quantity = 0;
  }
  else if (product.getBox().boxesInRow == 8 && quantity < 8 ) {
    mixProducts.push(new MixProduct(product, quantity));
    quantity = 0;
  }
  else {
    // If it's a skvett pall.
    const skvettPall = new SkvettPall(product, quantity);
    skvettPalls.push(skvettPall);
    // console.log("skvett pall height: ", skvettPall.getHeight() + " mm");
  }
}

function EditOutput(e) {
  try {
    if (e.target.tagName === 'LI') {
      let isEditMode = false;
      let removeIcon;
      if (e.target.tagName === 'LI' && e.target.querySelector('.remove-icon')) {
        isEditMode = true;
        removeIcon = e.target.querySelector('.remove-icon');
        removeIcon.remove();
      }
      
      const originalContent = e.target.innerText;
      const originalStyles = window.getComputedStyle(e.target);

      const textarea = document.createElement('textarea');
      textarea.className = "editable-textarea";
      textarea.id = "editable-textarea";
      textarea.value = originalContent;

      // Set textarea dimensions to match the original element
      textarea.style.width = originalStyles.width;
      textarea.style.height = originalStyles.height;
      textarea.style.minHeight = originalStyles.height; // Ensure minimum height

      e.target.innerHTML = '';
      e.target.appendChild(textarea);
      textarea.focus();

      // Adjust height to fit content
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';

      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });

      textarea.addEventListener('blur', function () {
        let newContent = this.value.trim();

        newContent = newContent.replace(/^\n|\n$/g, '').replace(/\n/g, '<br>');

        e.target.innerHTML = newContent;
        if (isEditMode) {
          e.target.appendChild(removeIcon);
        }
      });

      textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.blur();
        }
      });
    }
    else  if (e.target.tagName === 'SPAN' && e.target.classList.contains('editable')) {
      const originalContent = e.target.innerText;
      const parentP = e.target.closest('p');
      const originalStyles = window.getComputedStyle(e.target);

      const textarea = document.createElement('textarea');
      textarea.className = "editable-textarea";
      textarea.value = originalContent;

      // Set textarea dimensions and styles to match the original span
      textarea.style.width = originalStyles.width;
      textarea.style.height = originalStyles.height;
      textarea.style.minHeight = originalStyles.height;
      textarea.style.fontSize = originalStyles.fontSize;
      textarea.style.lineHeight = originalStyles.lineHeight;
      textarea.style.padding = originalStyles.padding;
      textarea.style.margin = originalStyles.margin;
      textarea.style.border = 'none';
      textarea.style.background = 'transparent';
      textarea.style.resize = 'none';
      textarea.style.overflow = 'hidden';

      // Replace the span with the textarea
      e.target.replaceWith(textarea);
      textarea.focus();

      // Adjust height to fit content
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };
      
      adjustHeight();
      textarea.addEventListener('input', adjustHeight);

      textarea.addEventListener('blur', function () {
        let newContent = this.value.trim();
        const newSpan = document.createElement('span');
        newSpan.className = 'editable';
        newSpan.textContent = newContent;
        this.replaceWith(newSpan);
      });

      textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.blur();
        }
      });
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

const editStates = {};

function editList(button) {
  try {
    let errorMessages = document.querySelectorAll('.editing-error-message');
    if (errorMessages.length > 0) {
      errorMessages.forEach(message => message.remove());
    }

    if (!button || !button.id) {
      console.error('Invalid button:', button);
      return;
    }

    let editToggle = button;
    let listId = editToggle.id.replace('edit-toggle-', '') + '-list';
    let list = document.getElementById(listId);

    if (!list) {
      console.error('List not found:', listId);
      return;
    }

    // Initialize state for this toggle if it doesn't exist
    if (!editStates[editToggle.id]) {
      editStates[editToggle.id] = { isEditMode: false };
    }

    let state = editStates[editToggle.id];

    function toggleEditMode(list, editToggle, state) {
      state.isEditMode = !state.isEditMode;
      editToggle.textContent = state.isEditMode ? "Klar" : "Redigera";

      if (state.isEditMode) {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'editButtonContainer-' + editToggle.id;
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexDirection = 'column';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.gap = '5px';

        if (editToggle.parentNode) {
          editToggle.parentNode.insertBefore(buttonContainer, editToggle.nextSibling);
          buttonContainer.appendChild(editToggle);
        } else {
          console.error('Edit toggle not in DOM');
          return;
        }

        const addButton = document.createElement('button');
        addButton.textContent = "Lägg till ny artikel";
        addButton.id = "addItem-" + editToggle.id;
        addButton.className = "add-new-item-button";
        buttonContainer.appendChild(addButton);

        addButton.addEventListener('click', () => addNewItem(list, state));

        list.querySelectorAll('li').forEach(li => addRemoveIcon(li, state));
      } else {
        const buttonContainer = document.getElementById('editButtonContainer-' + editToggle.id);
        if (buttonContainer && buttonContainer.parentNode) {
          buttonContainer.parentNode.insertBefore(editToggle, buttonContainer);
          buttonContainer.remove();
        }

        list.querySelectorAll('.remove-icon').forEach(icon => icon.remove());
      }
    }

    function addRemoveIcon(li) {
      if (!li.querySelector('.remove-icon')) {
        const removeIcon = document.createElement('span');
        removeIcon.innerHTML = "&#x2715;";
        removeIcon.className = "remove-icon";
        removeIcon.addEventListener('click', () => li.remove());
        li.appendChild(removeIcon);
      }
    }

    function addNewItem(list, state) {
      const newItem = document.createElement('li');
      newItem.textContent = 'Artikelnummer: Antal';
      newItem.className = 'editable';
      list.appendChild(newItem);
      addRemoveIcon(newItem, state);
      makeEditable(newItem, state);
    }

    function makeEditable(li, state) {
      const textarea = document.createElement('textarea');
      textarea.className = "editable-textarea";

      li.innerHTML = '';
      li.appendChild(textarea);
      textarea.focus();

      textarea.addEventListener('blur', function () {
        li.textContent = this.value.trim();
        if (state.isEditMode) addRemoveIcon(li);
      });

      textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.blur();
        }
      });
    }

    toggleEditMode(list, editToggle, state);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}
// Fetch the wanted product by its id.
function getProduct(productId, products) {
  return products.find(product => product.getId() === productId) || null;
}

// Form a skvett pallet from the mix products.
function formSkvettPall(mixProducts) {
  if (mixProducts.length == 0) {
    return;
  }
  let totalHeight = 0;
  // totalQuantity is the total number of boxes as red boxes in the mix pallet.
  let quantityAsRedBoxes = 0;
  let stackHeight = 0;
  // Total number of boxes in the mix pallet.
  let boxesInMixPall = 0;

  for (const mixProduct of mixProducts) {
    // if the product's box is red
    if (mixProduct.getBox() === red) {
      quantityAsRedBoxes += mixProduct.getQuantity();
      boxesInMixPall += mixProduct.getQuantity();
    }
    // if the product's box is green
    else if (mixProduct.getBox() === green) {
      quantityAsRedBoxes += mixProduct.getQuantity() * 2;
      boxesInMixPall += mixProduct.getQuantity();
    }
    // if the product's box is black
    else if (mixProduct.getBox() === black) {
      quantityAsRedBoxes += mixProduct.getQuantity() * (red.maxStackHeight / black.maxStackHeight);
      boxesInMixPall += mixProduct.getQuantity();
    }
    // if the product's box is blue
    else if (mixProduct.getBox() === blue) {
      quantityAsRedBoxes += mixProduct.getQuantity() * (red.maxStackHeight / blue.maxStackHeight);
      boxesInMixPall += mixProduct.getQuantity();
    }
    // If the product's box is renrum
    else if (mixProduct.getBox() === renrum) {
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
// function combinePallets(pallets, maxSum) {
//   // Modify the function so it combines pallets according to
//   // their stack height instead of height in cm. 
//   // Max height is the red max stack-height. 
//   // Sort the pallets array in descending order by height
//   pallets.sort((a, b) => b.getHeight() - a.getHeight());

//   const parcelPallets = [];

//   // For each pallet, find the best fit bin (pallet stack)
//   for (let pallet of pallets) {

//     let bestFitIndex = -1;
//     let minRemainingHeight = maxSum;

//     for (let i = 0; i < parcelPallets.length; i++) {
//       const currentHeight = parcelPallets[i].reduce((sum, p) => sum + p.getHeight(), 0);
//       const remainingHeight = maxSum - (currentHeight + pallet.getHeight());

//       if (remainingHeight >= 0 && remainingHeight < minRemainingHeight) {
//         bestFitIndex = i;
//         minRemainingHeight = remainingHeight;
//       }
//     }

//     // Place the pallet in the best fit bin or create a new bin
//     if (bestFitIndex !== -1) {
//       parcelPallets[bestFitIndex].push(pallet);
//     } else {
//       parcelPallets.push([pallet]);
//     }
//   }

//   return parcelPallets;
// }




// Combine the skvett pallets in the Branch-and-Bound approach, and put them in the comboPalls list.

function combinePallets(pallets, maxSum) {
  pallets.sort((a, b) => b.getHeight() - a.getHeight());

  // const lowerBound = Math.ceil(pallets.reduce((sum, p) => sum + p.getHeight(), 0) / maxSum);
  let bestSolution = null;
  let bestSolutionSize = pallets.length; // Worst case: one pallet per bin

  function isValidBin(bin) {
    const totalHeight = bin.reduce((sum, p) => sum + p.getHeight(), 0);
    
    // Check for "Mix Pall" exception
    const mixPallIndex = bin.findIndex(p => p.getPallId() === "Mix Pall");
    if (mixPallIndex !== -1) {
      return bin.length === 2 && 
            bin[1 - mixPallIndex].getStackHeight() < 4 && 
            totalHeight <= maxSum;
    }
    
    // Original conditions
    return totalHeight <= maxSum || (bin.length === 2 && totalHeight <= maxSum + 40);
  }

  function branch(index, currentSolution) {
    // Base case: all pallets placed
    if (index === pallets.length) {
      if (currentSolution.length < bestSolutionSize) {
        bestSolution = currentSolution.map(bin => [...bin]);
        bestSolutionSize = currentSolution.length;
      }
      return;
    }

    // Pruning: if current solution size plus lower bound for remaining pallets
    // is worse than the best solution, stop exploring this branch
    if (currentSolution.length + Math.ceil(pallets.slice(index).reduce((sum, p) => sum + p.getHeight(), 0) / maxSum) >= bestSolutionSize) {
      return;
    }

    const currentPallet = pallets[index];

    // Try adding to existing bins
    for (let i = 0; i < currentSolution.length; i++) {
      const newBin = [...currentSolution[i], currentPallet];
      if (isValidBin(newBin)) {
        currentSolution[i] = newBin;
        branch(index + 1, currentSolution);
        currentSolution[i].pop();
      }
    }

    // Try creating a new bin
    currentSolution.push([currentPallet]);
    branch(index + 1, currentSolution);
    currentSolution.pop();
  }

  branch(0, []);

  return bestSolution;
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
      skvettPall = comboPalls[i].pop();
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
    // Remove the skvett pall from the comboPalls list.
    comboPalls.splice(comboPallToRemove, 1);
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
    output += `<div class="kund-and-date-container">`;
    output += `<h1 class="kundAndDate"><i>${kund}</i>`;
  }
  else {
    output += `<div class="kund-and-date-container">`;
    output += `<h1 class="kundAndDate">`;
  }
  if (orderDate.trim().length != 0 && orderDate != "") {
    output += `<i>Datum: ${orderDate}</i><`;
  }
  else {
    output += `<i>Datum: ${getFormattedDate()}</i>`;
  }
  if (ordersNummer.trim().length != 0 && ordersNummer != "") {
    output += `<i> ${ordersNummer}</i></h1></div><br>`
  }
  else {
    output += `</h1></div><br>`
  }

  const totalFullPalls = fullPallsQuantity(fullPalls);
  let SRS = 0;
  let Kolli = 0;
  if(skvettPalls != null && skvettPalls.length > 0) {
    SRS = skvettPalls.length + totalFullPalls;
  }
  if(comboPalls != null && comboPalls.length > 0) {
    Kolli = comboPalls.length + totalFullPalls;
  }
  const platser = calculatePlatser(skvettPalls, fullPalls);


  if (!document.getElementById('comboRadio').checked) {
    output += `<div class="kolli-container">`;
    output += `<p>Antal Platser: <span class="editable">${platser.toFixed(2)}</span></p>`;
    output += `<p>Antal Kolli: <span class="editable">${SRS}</span></p>`;
    output += (`<p>SRS-Pall: <span class="editable">${SRS}</span></p>`)
    output += (`<p>Lådor: <span class="editable">${totalQuantityOfBoxes()}</span></p>`);
    output += "</div>";
  }
  else {
    output += `<div class="kolli-container">`;

    output += `<p>Antal Kolli: <span class="editable">${Kolli}</span></p>`;
    output += (`<p>SRS Pall: <span class="editable">${SRS}</span></p>`);
    output += (`<p>Lådor: <span class="editable">${totalQuantityOfBoxes()}</span></p>`);
    output += "</div>";
  }

  // FULL PALL
  output += `<div class="fullPallContainer">`
  output += `<div class="PallHeader">`;
  output += `<br> <span class="headText">Full Pall: </span><br>
                    <button id="edit-toggle-full-pall" class="editToggle">Redigera</button>`;
  output += `</div>`;
  output += `<ul id="full-pall-list">`;

  // Sort fullPalls by height in descending order.
  fullPalls.sort((a, b) => b.reduce((sum, p) => sum + p.getHeight(), 0) - a.reduce((sum, p) => sum + p.getHeight(), 0));

  for (const fullPall of fullPalls) {
    let prodId = " ";
    for (const pall of fullPall) {
      prodId = pall.getProduct().getId();
    }


    output += `<li class="editable">${prodId}: <br>`;

    for (const pall of fullPall) {
      if (pall.getQuantity() < pall.getProduct().getBox().fullPall) {
        output += `<b class="bold-not-full">${pall.getQuantity()}</b>` + " ";
      }
      else { output += `${pall.getQuantity()}` + " "; }
    }
    output += `&ensp;{${fullPall.length}}</li>`;
    // output += "{" + `${fullPall.length}` + "}</li>";
  }
  output += "</ul>"

  if (document.getElementById('comboRadio').checked) {
    // Sort comboPalls by height in descending order.
    comboPalls.sort((a, b) => b.reduce((sum, p) => sum + p.getHeight(), 0) - a.reduce((sum, p) => sum + p.getHeight(), 0));

    // COMBO PALL
    output += `<div class="comboPallContainer">`
    output += `<div class="PallHeader">`;
    output += `<br> <span class="headText">Combo Pall: </span><br>
                      <button id="edit-toggle-combo-pall" class="editToggle">Redigera</button>`;
    output += `</div>`;
    output += `<ul id="combo-pall-list">`;

    for (const combo of comboPalls) {
      // If combo contains the mix pall then skip it.
      if (combo.some(pall => pall.getPallId() === "Mix Pall")) {
        continue;
      }
      // output += `<p class="combo-pall">`
      output += `<li class="editable">`;

      for (let i = 0; i < combo.length; i++) {
        output += `${combo[i].product.getId()}: ${combo[i].getQuantity()}`;
        if (i < combo.length - 1) {
          output += "<br>";
        }
      }
      output += `</li>`;
    }

    // Find the combo pall that contains the mix pall.
    const mixCombo = comboPalls.find(combo => combo.some(pall => pall.getPallId() === "Mix Pall"));
    // output += `<p class="mix-pall">`;
    if (mixCombo != null) {
      output += `<li class="editable">`;
      for (const skvettPall of mixCombo) {
        if (skvettPall.getPallId() == "Mix Pall") {
          output += `${skvettPall.getPallId()}: ${skvettPall.getQuantity()}<br>`
          continue;
        } else {
          output += `${skvettPall.product.getId()}: ${skvettPall.getQuantity()}<br>`;
        }
      }
      output += "</li>";
    }
    output += "</ul>"

  } else {

    // ENKEL PALL
    output += `<div id="enkel-pall-container">`;
    output += `<div class="PallHeader">`;
    output += `<br> <span class="headText">Enkel Pall: </span><br>
                      <button id="edit-toggle-enkel-pall" class="editToggle">Redigera</button>`;
    output += `</div>`;
    output += `<ul id="enkel-pall-list">`;

    // Sort the pallets by height in descending order.
    skvettPalls.sort((a, b) => b.getHeight() - a.getHeight());

    output += "<ul>";
    for (const skvettPall of skvettPalls) {
      if (skvettPall.getPallId() === "Mix Pall") {
        continue;
      }


      output += `<li class="editable">`;

      output += `${skvettPall.product.getId()}: ${skvettPall.getQuantity()}</li>`;
    }
    // Find the mix pallet in the skvett pallets list.
    const mixPall = skvettPalls.find(pall => pall.getPallId() === "Mix Pall");

    if (mixPall != null) {
      output += `<li class="editable">`

      output += `${mixPall.getPallId()}: ${mixPall.getQuantity()}
      </li>`;
    }

    output += "</ul>";
  }

  // Mix Products.
  output += `<div id="mixPallContainer">`;
  output += `<div class="PallHeader">`;
  output += `<br> <span>Mix Pall: </span><br>
                    <button id="edit-toggle-mix-pall" class="editToggle">Redigera</button>`;
  output += `</div>`;
  output += `<ul id="mix-pall-list">`;

  // Sort the mix products by Id in ascending order.
  if (mixProducts.length > 0) {
    mixProducts.sort((a, b) => a.product.getId() - b.product.getId());
    for (const mixProduct of mixProducts) {
      output += `<li class='editable'>`

      output += `${mixProduct.product.getId()}: ${mixProduct.getQuantity()}</li>`;
    }
  }

  output += "</ul>";
  output += "</div>";

  return output;
}

function fullPallsQuantity(fullPalls) {
  let counter = 0;
  for (const fullPall of fullPalls) {
    counter += fullPall.length;
  }
  return counter;
}

function totalQuantityOfBoxes() {
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
