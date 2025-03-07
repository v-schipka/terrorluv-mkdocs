// Google Sheets API connection
const API_KEY = "AIzaSyD8rfdaN1J-Kt3xx9t5DPz_CNEzVOlY1j0"; // Replace with your API Key
const SPREADSHEET_ID = "1un5DNaQi0TkKvEWdzyIGXXKq1IOnLCAp4e_iC6RlsAk"; // Extract the ID from your Google Sheets URL

let truppenData = []; // Store only "truppen" data

// Fetch and store Google Sheets data
async function loadSheetData(range, tableContainerId) {
  const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Parse headers and rows
    const [headers, ...rows] = data.values;

    // Store only "truppen" data for filtering
    if (range === "truppen") {
      truppenData = rows; // Save only this dataset for filtering
    }

    // Render the table in its respective container
    renderTable(headers, rows, tableContainerId);
  } catch (error) {
    console.error(`Error loading sheet data:`, error);
    document.getElementById(tableContainerId).innerHTML = `<p>Error loading data. Please try again later.</p>`;
  }
}

// Function to render a table, removing columns 1 and 3 only for "truppen"
function renderTable(headers, rows, tableContainerId) {
  let tableHTML = `<table class='data-table' id='${tableContainerId}-table'><thead><tr>`;

  // Determine whether to exclude columns based on the table ID
  const isTruppenTable = (tableContainerId === "filtered-table-container");

  /// Add column headers with sorting
  headers.forEach((header, index) => {
    if (!isTruppenTable || (index !== 1 && index !== 3)) {
      tableHTML += `<th onclick="sortTable('${tableContainerId}-table', ${index})">${header} <span class="arrow"></span></th>`;
    }
  });
  tableHTML += "</tr></thead><tbody>";

  // Add rows while excluding columns for "truppen"
  rows.forEach(row => {
    tableHTML += "<tr>";
    row.forEach((cell, index) => {
      if (!isTruppenTable || (index !== 1 && index !== 3)) {
        tableHTML += `<td>${cell}</td>`;
      }
    });
    tableHTML += "</tr>";
  });

  tableHTML += "</tbody></table>";

  // Insert table into the correct container
  document.getElementById(tableContainerId).innerHTML = tableHTML;
}

// Function to filter only the "truppen" table
function filterTruppenTable(result) {
  if (!truppenData.length) return;

  const headers = ["Name", "Gesamtstärke [Mio]", "Stärkster Trupp [Mio]", "2. stärkster Trupp [Mio]", "Feuer", "Pflanze", "Wasser"];

  const filteredRows = truppenData.filter(row => {
    const staerksterTrupp = parseFloat(row[2].replace(",", ".")) || 0; // Convert German numbers

    return staerksterTrupp > result;
  });

  // Render only the filtered "truppen" table
  renderTable(headers, filteredRows, "filtered-table-container");
}

// Function to sort the table by a column
let sortOrder = {}; // Keeps track of sort order per column

function sortTable(tableId, columnIndex) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const rows = Array.from(table.rows).slice(1); // Exclude header row
  const isNumericColumn = rows.every(row => !isNaN(row.cells[columnIndex].innerText.replace(/\./g, "").replace(",", ".")));

  const key = `${tableId}-${columnIndex}`;
  const newOrder = sortOrder[key] === 'asc' ? 'desc' : 'asc';
  sortOrder[key] = newOrder;

  rows.sort((a, b) => {
    let cellA = a.cells[columnIndex].innerText.trim();
    let cellB = b.cells[columnIndex].innerText.trim();

    if (isNumericColumn) {
      cellA = parseFloat(cellA.replace(/\./g, "").replace(",", "."));
      cellB = parseFloat(cellB.replace(/\./g, "").replace(",", "."));
      return newOrder === 'asc' ? cellA - cellB : cellB - cellA;
    } else {
      return newOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  rows.forEach(row => table.appendChild(row));

  updateHeaderArrow(table, columnIndex, newOrder);
}

// Update sorting arrow indicators
function updateHeaderArrow(table, columnIndex, order) {
  const headers = table.querySelectorAll("th .arrow");
  headers.forEach(arrow => arrow.classList.remove("asc", "desc"));

  const arrow = table.rows[0].cells[columnIndex].querySelector(".arrow");
  if (arrow) arrow.classList.add(order);
}

// Load all sheets but filter only "truppen"
loadSheetData("dias", "table-container");
loadSheetData("apples", "table-container-apples");
loadSheetData("juwelen", "table-container-juwelen");

