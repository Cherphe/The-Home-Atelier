const productsBox = document.getElementById("products");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const phone = "2348121325419";

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  productsBox.innerHTML = "";
  
  products.forEach(p => {
    const msg = encodeURIComponent(
      `Hello The Home Atelier, I am interested in "${p.name}" priced at ₦${Number(p.price).toLocaleString("en-NG")}.`
    );
    
    productsBox.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <div class="content">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <strong>₦${Number(p.price).toLocaleString("en-NG")}</strong>
          <a class="cta" href="https://wa.me/${phone}?text=${msg}" target="_blank">
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    `;
  });
}

loadProducts();
