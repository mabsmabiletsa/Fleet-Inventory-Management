const addItemForm = document.getElementById('add-item-form');
const issueItemForm = document.getElementById('issue-item-form');
const inventoryTableBody = document.getElementById('inventory-table').querySelector('tbody');

// Add Item
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const quantity = document.getElementById('item-quantity').value;
    const receiverName = document.getElementById('receiver-name').value;
    const timestamp = new Date().toISOString(); // Current date and time
  
    // Send to Google Sheets
    await updateGoogleSheet({ 
      action: 'add', 
      itemName, 
      quantity, 
      receiverName, 
      timestamp 
    });
    addItemForm.reset();
    loadInventory();
  });
  

// Issue Item
issueItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemName = document.getElementById('issue-item-name').value;
    const quantity = document.getElementById('issue-quantity').value;
    const issueTo = document.getElementById('issue-to').value;
    const timestamp = new Date().toISOString(); // Current date and time
  
    // Send to Google Sheets
    await updateGoogleSheet({ 
      action: 'issue', 
      itemName, 
      quantity, 
      issueTo, 
      timestamp 
    });
    issueItemForm.reset();
    loadInventory();
  });
  

// Load Inventory from Google Sheets
async function loadInventory() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwfDK-WLqyE5QH675-2hNkoSYaQDfOWvH_ODCOpNeeUcD_-q_sPsRT9UJvAGlo2TYUfZQ/exec');
    const data = await response.json();
  
    inventoryTableBody.innerHTML = data.map(row => `
      <tr>
        <td>${row.itemName}</td>
        <td>${row.quantity}</td>
        <td>${row.receiverName || ''}</td>
        <td>${row.issueTo || ''}</td>
        <td>${row.receivedAt || ''}</td>
        <td>${row.issuedAt || ''}</td>
      </tr>
    `).join('');
  }
  

// Update Google Sheets
async function updateGoogleSheet(payload) {
  await fetch('https://script.google.com/macros/s/AKfycbwfDK-WLqyE5QH675-2hNkoSYaQDfOWvH_ODCOpNeeUcD_-q_sPsRT9UJvAGlo2TYUfZQ/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

loadInventory();
