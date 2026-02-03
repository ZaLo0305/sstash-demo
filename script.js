let order = [];
let subtotal = 0;
const TAX_RATE = 0.0825;


function addToOrder(item, price) {
  order.push({ item, price });
  total += price;
  updateOrderDisplay();
}

function removeFromOrder(index) {
  total -= order[index].price;
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

  document.getElementById("total").textContent = total.toFixed(2);
  document.getElementById("hidden-order").value =
    order.map(o => `${o.item} - $${o.price.toFixed(2)}`).join(", ");
}
