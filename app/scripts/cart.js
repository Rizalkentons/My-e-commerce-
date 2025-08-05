console.log('Cart page loaded');

window.onload = function () {
  populateCartData();
};

function populateCartData() {
  const container = document.getElementById('cart-container');
  let store = {};
  if (window.localStorage.getItem('cart')) {
    store = JSON.parse(window.localStorage.getItem('cart'));
  }

  const keys = Object.keys(store);

  if (keys.length === 0) {
    // implement empty state
    container.classList.add('justify-center');
    container.classList.add('align-center');
    container.classList.add('flex-row');
    const text = document.createElement('h1');
    text.innerText = 'Your cart is empty';
    container.appendChild(text);
  } else {
    // create elements for all product item
    container.classList.add('flex-column');
    container.classList.add('gap-1');
    for (let i = 0; i < keys.length; i += 1) {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'w-full flex-row gap-1 align-center';
      itemContainer.style.padding = '1rem';
      itemContainer.style.backgroundColor = '#e0e0e0';
      itemContainer.style.borderRadius = '8px';
      itemContainer.style.transition = 'all 0.3s ease';
      itemContainer.style.boxShadow = '0 0 5px rgba(0,0,0,0.1)';

      itemContainer.addEventListener('mouseenter', () => {
        itemContainer.style.backgroundColor = '#d5d5d5';
        itemContainer.style.transform = 'scale(1.01)';
        itemContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      });

      itemContainer.addEventListener('mouseleave', () => {
        itemContainer.style.backgroundColor = '#e0e0e0';
        itemContainer.style.transform = 'scale(1)';
        itemContainer.style.boxShadow = '0 0 5px rgba(0,0,0,0.1)';
      });

      const productImage = document.createElement('img');
      productImage.src = store[keys[i]].image;
      productImage.style.width = '100px';
      productImage.style.height = '100px';
      productImage.style.borderRadius = '8px';
      productImage.style.objectFit = 'cover';

      productImage.className = 'product-image-cart';

      itemContainer.appendChild(productImage);

      const productInfoContainer = document.createElement('div');
      productInfoContainer.className = 'flex-column gap-1 w-full';

      const productName = document.createElement('h3');
      productName.innerText = `Name Product : ${store[keys[i]].name}`;

      const productPrice = document.createElement('h4');
      productPrice.innerText = `Product Price : ${store[keys[i]].price}`;

      productInfoContainer.appendChild(productName);
      productInfoContainer.appendChild(productPrice);

      const productSummary = document.createElement('div');
      productSummary.className = 'flex-row gap-1';

      const productPriceSummary = document.createElement('div');
      productPriceSummary.style.display = 'flex';
      productPriceSummary.style.flexDirection = 'column';
      productPriceSummary.style.alignItems = 'flex-end'; // <-- untuk meratakan ke kanan
      productPriceSummary.style.justifyContent = 'space-between';
      productPriceSummary.style.minWidth = '500px';
      productPriceSummary.style.gap = '1rem';

      // <span class="material-icons-outlined">delete</span>;

      const trashButton = document.createElement('span');
      trashButton.innerText = 'delete';
      trashButton.className = 'material-icons-outlined';
      trashButton.style.cursor = 'pointer';
      trashButton.onclick = () => deleteCartItem(keys[i]);
      trashButton.style.fontSize = '24px';
      trashButton.style.color = '#cc0000';
      trashButton.style.transition = 'transform 0.2s';
      trashButton.addEventListener('mouseenter', () => {
        trashButton.style.transform = 'scale(1.2)';
      });
      trashButton.addEventListener('mouseleave', () => {
        trashButton.style.transform = 'scale(1)';
      });

      const quantityProduct = document.createElement('h4');
      quantityProduct.innerText = `${store[keys[i]].quantity} x ${
        store[keys[i]].price
      }`;

      const subtotal = document.createElement('h4');
      subtotal.innerText = `Subtotal: ${Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(
        Number(store[keys[i]].quantity) * getPriceAsNumber(store[keys[i]].price)
      )}`;

      productPriceSummary.appendChild(quantityProduct);
      productPriceSummary.appendChild(subtotal);

      productSummary.appendChild(productPriceSummary);
      productSummary.appendChild(trashButton);

      itemContainer.appendChild(productInfoContainer);
      itemContainer.appendChild(productSummary);

      container.appendChild(itemContainer);
    }

    const checkoutToWa = document.createElement('a');
    checkoutToWa.className = 'contain-btn';
    checkoutToWa.href = `https://wa.me/+6287771634747?text=${processProductSummary()}`;
    checkoutToWa.innerText = 'Checkout via WhatsApp';

    container.appendChild(checkoutToWa);
  }
}

function deleteCartItem(key) {
  if (confirm('Are you sure you want to delete this item?')) {
    let store = {};

    if (window.localStorage.getItem('cart')) {
      store = JSON.parse(window.localStorage.getItem('cart'));
    }

    delete store[key];
    window.localStorage.setItem('cart', JSON.stringify(store));
    window.location.reload();
  }
}

function processProductSummary() {
  let store = {};

  if (window.localStorage.getItem('cart')) {
    store = JSON.parse(window.localStorage.getItem('cart'));
  }
  const keys = Object.keys(store);

  let summaryText = 'Halo,saya mau pesan ini ya\n';

  for (let i = 0; i < keys.length; i += 1) {
    summaryText += `${i + 1}. ${store[keys[i]].name} | Jumlah: ${
      store[keys[i]].quantity
    }\n`;
  }

  summaryText += 'Tolong di proses ya, terima kasih';
  return encodeURIComponent(summaryText);
}

function getPriceAsNumber(priceAsString) {
  const priceWithoutRp = priceAsString.split('Rp');

  return Number(priceWithoutRp[1].split('.').join(''));
}
