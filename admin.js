const PIN = "OLAMONEY";

const loginBox = document.getElementById("loginBox");
const adminBox = document.getElementById("adminBox");

const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const descInput = document.getElementById("descInput");
const imageInput = document.getElementById("imageInput");
const adminProducts = document.getElementById("adminProducts");

document.getElementById("year").textContent = new Date().getFullYear();

function login() {
  if (document.getElementById("pinInput").value === PIN) {
    loginBox.classList.add("hidden");
    adminBox.classList.remove("hidden");
    renderAdmin();
  }
}

function logout() {
  adminBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

function addProduct() {
  if (!nameInput.value || !priceInput.value || !imageInput.files[0]) return;
  
  const reader = new FileReader();
  reader.onload = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({
      id: Date.now(),
      name: nameInput.value,
      price: priceInput.value,
      desc: descInput.value,
      image: reader.result
    });
    localStorage.setItem("products", JSON.stringify(products));
    clearForm();
    renderAdmin();
  };
  reader.readAsDataURL(imageInput.files[0]);
}

function deleteProduct(id) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderAdmin();
}

function renderAdmin() {
  adminProducts.innerHTML = "";
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.forEach(p => {
    adminProducts.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <div class="content">
          <h3>${p.name}</h3>
          <strong>₦${Number(p.price).toLocaleString("en-NG")}</strong>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

function clearForm() {
  nameInput.value = "";
  priceInput.value = "";
  descInput.value = "";
  imageInput.value = "";
}