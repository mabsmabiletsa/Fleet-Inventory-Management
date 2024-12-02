const airtableBaseId = "Workspace"; // Replace with your Airtable Base ID
const airtableApiKey = "patqPB7AsnbwY7r7j.c1a2a63f8bc2d5488d9475b12b74cd5e8f5e690c493535c2cb5427bec6269cdf"; // Replace with your Airtable API Key
const airtableTableName = "Fleet Inventory Managemen"; // Replace with your Airtable Table name

const airtableURL = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
const headers = {
  Authorization: `Bearer ${airtableApiKey}`,
  "Content-Type": "application/json",
};

// Add Inventory Record
async function addInventoryRecord(itemName, quantity, receiver, action) {
  const record = {
    fields: {
      "Item Name": itemName,
      Quantity: parseInt(quantity),
      "Receiver/Issuer Name": receiver,
      Action: action,
      "Date/Time": new Date().toISOString(),
    },
  };

  try {
    const response = await fetch(airtableURL, {
      method: "POST",
      headers,
      body: JSON.stringify(record),
    });
    const data = await response.json();
    console.log("Record added:", data);
    fetchInventoryRecords(); // Refresh records
  } catch (error) {
    console.error("Error adding record:", error);
  }
}

// Fetch All Inventory Records
async function fetchInventoryRecords() {
  try {
    const response = await fetch(airtableURL, { headers });
    const data = await response.json();

    const recordList = document.getElementById("recordList");
    recordList.innerHTML = ""; // Clear previous records

    data.records.forEach(record => {
      const listItem = document.createElement("li");
      listItem.textContent = `${record.fields["Item Name"]} (${record.fields.Quantity}) - ${record.fields.Action} by ${record.fields["Receiver/Issuer Name"]} on ${new Date(record.fields["Date/Time"]).toLocaleString()}`;
      recordList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching records:", error);
  }
}

// Handle Form Submission
document.getElementById("inventoryForm").addEventListener("submit", event => {
  event.preventDefault();

  // Get form data
  const itemName = document.getElementById("itemName").value;
  const quantity = document.getElementById("quantity").value;
  const receiver = document.getElementById("receiver").value;
  const action = document.getElementById("action").value;

  // Add record to Airtable
  addInventoryRecord(itemName, quantity, receiver, action);

  // Reset the form
  document.getElementById("inventoryForm").reset();
});

// Fetch inventory records on page load
fetchInventoryRecords();
