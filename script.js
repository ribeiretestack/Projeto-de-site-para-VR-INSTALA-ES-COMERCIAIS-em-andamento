// BANCO DE DADOS DE PRODUTOS
const products = [
  { id: 1, name: "Fogão Inox Industrial", price: 1200, category: "cozinha" },
  {id: 2, name: "Cilindro Paulista Lieme",price: 3300, category: "padaria",featured: true},
  { id: 3, name: "Forno Turbo Venâncio 10E", price: 4600, category: "padaria" },
  {id: 4, name: "Ar Condicionado 60k BTUS",price: 9400,category: "refrigeração"},
  {id: 5, name: "Câmara Fria Modular",price: 10000,category: "refrigeração"},
  { id: 6, name: "Forno Prática E250", price: 22500, category: "cozinha" },
  { id: 7, name: "Cilindro de Massa", price: 1400, category: "padaria" },
  { id: 8, name: "Bancada Hortifruti", price: 1200, category: "mercado" },
  { id: 9, name: "Ponta de Gôndola", price: 1000, category: "mercado" },
  { id: 10, name: "Check-out", price: 1000, category: "mercado" },
  { id: 11, name: "Serra Fita", price: 10000, category: "açougue" },
  { id: 12, name: "Visa Cooler Brahma", price: 3500, category: "refrigeração" },
  { id: 13, name: "Balcão Expositor", price: 1200, category: "diversos" },
  { id: 14, name: "Escada para Depósitos 3M", price: 1900, category: "diversos"},
  {id: 15, name: "Compressor Semi Hermético Bitzer 20HP", price: 9250, category: "diversos"},
  { id: 16, name: "Fatiador de Pães", price: 2000, category: "padaria" },
  {id: 17, name: "Forno Industrial Prática C-MAX Gourmet", price: 12999, category: "padaria"},
  {id: 18, name: "Embaladora a Vácuo Inox", price: 6000, category: "diversos"},
  { id: 19, name: "Cooler Amstel", price: 2500, category: "refrigeração" },
  { id: 20, name: "Prateleiras em Inox", price: 2200, category: "diversos" },
  { id: 21, name: "Caixa Plástica", price: 15, category: "diversos" },
  { id: 22, name: "Carrinho de Supermercado", price: 700, category: "mercado" },
  {id: 23, name: "Buffet em Inox com 8 Cubas", price: 2500, category: "diversos"},
  {id: 24,name: "Frigobar Midea 124L",price: 1000, category: "refrigeração"},
  { id: 25, name: "Pia Industrial em Inox", price: 3000, category: "diversos" },
  { id: 26, name: "Pia em Inox", price: 1900, category: "diversos" },
  { id: 27, name: "Escada para Depósito", price: 2000, category: "diversos" }
];

let cart = JSON.parse(localStorage.getItem("vr_cart")) || [];

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  updateCartUI();

  const searchInput = document.getElementById("main-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(term)
      );
      renderProducts(filtered);
    });
  }
});

// FUNÇÕES GLOBAIS
window.renderProducts = function (items) {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (product) => `
    <article class="product-card bg-white rounded-xl p-5 flex flex-col justify-between shadow-sm border border-zinc-100">
        <div>
            <span class="text-[10px] font-bold text-red-600 uppercase tracking-widest">${
              product.category
            }</span>
            <h3 class="font-bold text-zinc-800 text-lg mt-1 leading-tight">${
              product.name
            }</h3>
        </div>
        <div class="mt-6">
            <p class="text-2xl font-black text-zinc-900 mb-4">R$ ${product.price.toLocaleString(
              "pt-br",
              { minimumFractionDigits: 2 }
            )}</p>
            <button onclick="addToCart(${
              product.id
            }, event)" class="w-full bg-zinc-900 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-all uppercase text-xs tracking-wider active:scale-95">
                Adicionar
            </button>
        </div>
    </article>
  `
    )
    .join("");
};

window.filterByCategory = function (categoria) {
  if (categoria.toLowerCase() === "todos") {
    renderProducts(products);
  } else {
    const filtrados = products.filter(
      (p) => p.category.toLowerCase() === categoria.toLowerCase()
    );
    renderProducts(filtrados);
  }
};

window.removeFromCart = function (index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
};

window.saveCart = function () {
  localStorage.setItem("vr_cart", JSON.stringify(cart));
};

window.updateCartUI = function () {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");

  if (!list) return;

  list.innerHTML =
    cart.length === 0
      ? '<div class="flex flex-col items-center justify-center h-full text-zinc-400 opacity-50"><i class="fa-solid fa-cart-shopping text-4xl mb-2"></i><p>Carrinho vazio</p></div>'
      : "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    list.innerHTML += `
        <div class="flex justify-between items-center bg-zinc-50 p-4 rounded-xl border border-zinc-100 group transition-all">
            <div>
                <p class="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Item</p>
                <p class="text-sm font-bold text-zinc-800 leading-tight uppercase">${
                  item.name
                }</p>
                <p class="text-sm font-black text-zinc-900 mt-1 uppercase">R$ ${item.price.toLocaleString(
                  "pt-br",
                  { minimumFractionDigits: 2 }
                )}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="text-zinc-300 hover:text-red-600 transition-colors p-2">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;
  });

  if (countEl) countEl.innerText = cart.length;
  if (totalEl) {
    totalEl.innerText = `R$ ${total.toLocaleString("pt-br", {
      minimumFractionDigits: 2
    })}`;
  }
};

window.toggleCart = function () {
  const panel = document.getElementById("cart-panel");
  const overlay = document.getElementById("overlay");

  if (panel) {
    // Usamos classList para alternar a classe do Tailwind que já configuramos no CSS
    panel.classList.toggle("translate-x-full");

    if (overlay) {
      if (!panel.classList.contains("translate-x-full")) {
        overlay.style.display = "block";
        setTimeout(() => (overlay.style.opacity = "1"), 10);
      } else {
        overlay.style.opacity = "0";
        setTimeout(() => (overlay.style.display = "none"), 300);
      }
    }
  }
};

window.addToCart = function (id, event) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  cart.push(product);
  saveCart();
  updateCartUI();

  // Feedback visual no botão que foi clicado
  const btn = event.currentTarget;
  const originalText = btn.innerText;
  btn.innerText = "ADICIONADO!";
  btn.classList.replace("bg-zinc-900", "bg-red-600");

  // ABRIR O CARRINHO AUTOMATICAMENTE
  const panel = document.getElementById("cart-panel");
  if (panel && panel.classList.contains("translate-x-full")) {
    toggleCart();
  }

  setTimeout(() => {
    btn.innerText = originalText;
    btn.classList.replace("bg-red-600", "bg-zinc-900");
  }, 1000);
};

window.finalizarCompra = function () {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Pedido processado com sucesso! Obrigado pela preferência.");
  // Aqui você pode adicionar lógica para limpar o carrinho ou enviar para um banco de dados
};