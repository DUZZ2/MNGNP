// Плавне з’явлення елементів при скролі
const animatedElements = document.querySelectorAll('.animate-fade, .animate-slide, .animate-zoom');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });
animatedElements.forEach(el => observer.observe(el));

// Робота кнопки "Замовити"
document.getElementById('orderBtn').addEventListener('click', () => {
  alert("✅ Дякуємо за замовлення! Наш менеджер скоро з вами зв’яжеться.");
});

// Кнопки "в кошик"
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("🛒 Товар додано у кошик!");
  });
});

// Плавний скрол + активне меню
const navLinks = document.querySelectorAll('.nav-item');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });

      // прибираємо активний клас у всіх
      navLinks.forEach(l => l.classList.remove('active'));
      // додаємо активний клас для натиснутого
      link.classList.add('active');
    }
  });
});

let cart = [];
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartText = document.getElementById('emptyCart');

// Додаємо товар у кошик
document.querySelectorAll('.product').forEach(product => {
  const btn = product.querySelector('.buy-btn');
  const name = product.querySelector('.product-h').innerText;
  const price = product.querySelector('.price-text').innerText;

  btn.addEventListener('click', () => {
    cart.push({ name, price });
    updateCartUI();
  });
});

// Оновлення UI кошика
function updateCartUI() {
  cartCount.textContent = cart.length;

  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    emptyCartText.style.display = "block";
    return;
  }

  emptyCartText.style.display = "none";
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} — ${item.price}₴</span>
      <button class="remove-btn" data-index="${index}">Видалити</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  // кнопки видалення
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.getAttribute('data-index');
      cart.splice(i, 1);
      updateCartUI();
    });
  });
}

// Відкрити кошик
document.getElementById('orderBtn').addEventListener('click', () => {
  cartModal.style.display = "flex";
});

// Закрити кошик
document.querySelector('.close').addEventListener('click', () => {
  cartModal.style.display = "none";
});
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

