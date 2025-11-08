const PASSWORD = 'GuldKyckling!'; // Change this or move to environment variable

// DOM Elements
const passwordSection = document.getElementById('passwordSection');
const productForm = document.getElementById('productForm');
const messageDiv = document.getElementById('message');

// Form Elements
const passwordInput = document.getElementById('passwordInput');
const productNameInput = document.getElementById('productName');
const productIdInput = document.getElementById('productId');
const boxTypeSelect = document.getElementById('boxType');

function checkPassword() {
    const password = passwordInput.value;
    if (password === PASSWORD) {
        passwordSection.style.display = 'none';
        productForm.style.display = 'block';
    } else {
        showMessage('Invalid password', 'error');
    }
}

async function addProduct() {
    // Validate form
    if (!validateForm()) {
        return;
    }

    const productData = {
        password: passwordInput.value,
        name: productNameInput.value,
        id: parseInt(productIdInput.value),
        type: boxTypeSelect.value
    };

    try {
        const response = await fetch('/.netlify/functions/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        
        if (response.ok) {
            showMessage('Product added successfully!', 'success');
            clearForm();
        } else {
            throw new Error(data.error || 'Failed to add product');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage(error.message, 'error');
    }
}

function validateForm() {
    if (!productNameInput.value.trim()) {
        showMessage('Please enter a product name', 'error');
        return false;
    }
    
    if (!productIdInput.value) {
        showMessage('Please enter a product ID', 'error');
        return false;
    }
    
    if (!boxTypeSelect.value) {
        showMessage('Please select a box type', 'error');
        return false;
    }
    
    return true;
}

function clearForm() {
    productNameInput.value = '';
    productIdInput.value = '';
    boxTypeSelect.selectedIndex = 0;
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = type;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = '';
        }, 3000);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addProduct();
    });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        clearForm,
        showMessage
    };
}