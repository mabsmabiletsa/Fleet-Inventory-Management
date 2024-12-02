const airtableBaseId = "Workspace"; // Replace with your Airtable Base ID
const airtableApiKey = "patqPB7AsnbwY7r7j.c1a2a63f8bc2d5488d9475b12b74cd5e8f5e690c493535c2cb5427bec6269cdf"; // Replace with your Airtable API Key
const airtableTableName = "Fleet Inventory Managemen"; // Replace with your Airtable Table name

// Function to fetch all inventory records from Airtable
async function fetchInventory() {
  const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    console.log(data.records); // Log all records from Airtable
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
}

// Function to add a new inventory record to Airtable
async function addInventoryRecord(itemName, quantity, receiver, action) {
  const url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
    "Content-Type": "application/json",
  };

  const record = {
    fields: {
      "Item Name": itemName,
      Quantity: quantity,
      "Receiver/Issuer Name": receiver,
      Action: action,
      "Date/Time": new Date().toISOString(), // Timestamp of action
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(record),
    });
    const data = await response.json();
    console.log("Record added:", data);
  } catch (error) {
    console.error("Error adding inventory record:", error);
  }
}
