console.log('INI DARI DETAIL');

window.onload = function () {
  consumeQueryParamsData();
};

function getAllProductDataFromQueryParams() {
  const searchUrl = window.location.search;
  const queryParams = new URLSearchParams(searchUrl);

  const productName = queryParams.get('name');
  const productPrice = queryParams.get('price');
  const productRating = queryParams.get('rating');
  const productImage = queryParams.get('img');

  return {
    name: productName,
    price: productPrice,
    rating: productRating,
    image: productImage,
  };
}
function consumeQueryParamsData() {
  const { name, price, rating, image } = getAllProductDataFromQueryParams();

  const productNameElement = document.getElementById('product-name');
  const productPriceElement = document.getElementById('product-price');
  const productRatingElement = document.getElementById('product-rating');
  const productImageElement = document.getElementById('product-image');
  productNameElement.innerText = name;
  productPriceElement.innerText = price;
  productImageElement.src = image;

  for (let i = 0; i < 5; i += 1) {
    const star = document.createElement('span');
    star.innerText = 'star';
    star.classList.add('material-icons-outlined');

    if (i < rating) {
      star.classList.add('red');
    }
    productRatingElement.appendChild(star);
  }
}

function incrementCounter() {
  const counterElement = document.getElementById('counter');
  counterElement.innerText = Number(counterElement.innerText) + 1;
}

function decrementCounter() {
  const counterElement = document.getElementById('counter');
  if (Number(counterElement.innerText) > 1) {
    counterElement.innerText = Number(counterElement.innerText) - 1;
  }
}

function addToCart() {
  const { name, price, rating, image } = getAllProductDataFromQueryParams();
  const quantity = Number(document.getElementById('counter').innerText);

  let store = {};
  if (window.localStorage.getItem('cart')) {
    store = JSON.parse(window.localStorage.getItem('cart'));
  }

  const nameKey = name.toLowerCase().split(' ').join('-');

  store[nameKey] = {
    name,
    price,
    rating,
    image,
    quantity,
  };
  window.localStorage.setItem('cart', JSON.stringify(store));
  alert('Product added to cart successfully!');
}
