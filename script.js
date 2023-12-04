// Ticket information
const ticketInfo = {
  TK001: {
    name: "Gajayana",
    destination: "Cirebon",
    fare: 50000,
    stock: 20,
  },
  TK002: {
    name: "Bima",
    destination: "Yogyakarta",
    fare: 100000,
    stock: 25,
  },
  TK003: {
    name: "Argo Bromo",
    destination: "Surabaya",
    fare: 200000,
    stock: 30,
  },
};

function calculateTotal() {
  const trainCode = document.getElementById("trainSelect").value;
  const numTickets = parseInt(document.getElementById("numTickets").value, 10);

  // Check if there is enough stock
  if (numTickets > ticketInfo[trainCode].stock) {
    // If out of stock, display an error message
    displayErrorMessage(
      `Booking failed! Tickets for ${ticketInfo[trainCode].name} - ${ticketInfo[trainCode].destination} is out of stock.`
    );
    return; // Add this line to exit the function early
  }

  // Calculate total cost
  const totalCost = ticketInfo[trainCode].fare * numTickets;

  // Create a new result element with the appropriate alert structure
  const resultElement = document.createElement("div");
  resultElement.setAttribute("role", "alert");

  if (ticketInfo[trainCode].stock === 0 && numTickets > 0) {
    // If no remaining stock and user tried to book, display an error message with alert-danger class
    resultElement.classList.add("alert", "alert-danger");
    resultElement.innerHTML = `Booking failed! Tickets for ${ticketInfo[trainCode].name} - ${ticketInfo[trainCode].destination} is out of stock.`;
  } else {
    // If there is remaining stock or user books 0 tickets, display success message with alert-info class
    // Update stock
    ticketInfo[trainCode].stock -= numTickets;
    // Update stock display
    document.getElementById(`stock${trainCode}`).innerText =
      ticketInfo[trainCode].stock;
    resultElement.classList.add("alert", "alert-info");
    resultElement.innerHTML = `Booking successful! Total Cost: ${totalCost} IDR. Remaining stock: ${ticketInfo[trainCode].stock}`;
  }

  // Append the new result on top of the existing results
  document.getElementById("resultsContainer").prepend(resultElement);
}

function displayErrorMessage(message) {
  // Create a new result element with error message and alert-danger class
  const errorElement = document.createElement("div");
  errorElement.classList.add("alert", "alert-danger");
  errorElement.setAttribute("role", "alert");
  errorElement.textContent = message;

  // Append the error message on top of the existing results
  document.getElementById("resultsContainer").prepend(errorElement);
}
