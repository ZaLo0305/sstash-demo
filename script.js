let order = [];
let subtotal = 0;
const TAX_RATE = 0.0825;

const HOURS = {
  0: { open: 12, close: 19 }, // Sunday 12–7 PM
  1: null,                   // Monday closed
  2: null,                   // Tuesday closed
  3: { open: 14, close: 21 }, // Wednesday 2–9 PM
  4: { open: 14, close: 21 }, // Thursday 2–9 PM
  5: { open: 14, close: 21 }, // Friday 2–9 PM
  6: { open: 14, close: 21 }  // Saturday 2–9 PM
};

const CLOSED_DAYS = [1]; // Monday (0 = Sunday)

const today = new Date().getDay();

if (CLOSED_DAYS.includes(today)) {
  orderButton.disabled = true;
  orderButton.textContent = "Closed Today";
}


function addToOrder(item, price) {
  order.push({ item, price });
  subtotal += price;
  updateOrderDisplay();
}

function removeFromOrder(index) {
  subtotal -= order[index].price;
  order.splice(index, 1);
  updateOrderDisplay();
}


function updateOrderDisplay() {
  const list = document.getElementById("order-list");
  list.innerHTML = "";

  order.forEach((o, i) => {
    const li = document.createElement("li");
    li.textContent = `${o.item} - $${o.price.toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromOrder(i);

    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);

  document.getElementById("hidden-order").value =
    order.map(o => `${o.item} - $${o.price.toFixed(2)}`).join(", ");
}

const statusText = document.getElementById("today-status");
if (statusText) {
  if (!HOURS[today]) {
    statusText.textContent = "Closed today";
  } else {
    const { open, close } = HOURS[today];
    statusText.textContent = `Open today: ${open}:00 – ${close}:00`;
  }
}





const pickupSelect = document.getElementById("pickup-time");
const orderButton = document.querySelector("button[type='submit']");

function generatePickupTimes() {
  const now = new Date();
  const day = now.getDay();
  const hoursToday = HOURS[day];

  pickupSelect.innerHTML = `<option value="">Select a pickup time</option>`;

  if (!hoursToday) {
    pickupSelect.innerHTML = `<option value="">Closed today</option>`;
    pickupSelect.disabled = true;
    orderButton.disabled = true;
    orderButton.textContent = "Closed Today";
    return;
  }

  const { open, close } = hoursToday;

  for (let hour = open; hour < close; hour++) {
    for (let min = 0; min < 60; min += 15) {
      const time = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;

      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      pickupSelect.appendChild(option);
    }
  }
}

generatePickupTimes();



