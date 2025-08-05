console.log('Hello, World!');

const onClickBestSellingProduct = (e) => {
  const productPrice = e.getElementsByTagName('span')[0].innerText;
  const productName = e.getElementsByTagName('h4')[0].innerText;
  const productImg = e.getElementsByTagName('img')[0].src;
  const productRating = e.getElementsByClassName(
    'material-icons-outlined'
  ).length;

  const rootDir = window.location.pathname.split('/pages/')[0];

  window.location.href = `${rootDir}/pages/detail.html?price=${productPrice}&name=${productName}&img=${productImg}&rating=${productRating}`;
};

function onClickProduct(element) {
  console.log('Product clicked!', element);
  const productItemElement = element.parentElement.parentElement;
  const productName =
    productItemElement.getElementsByTagName('h3')[0].innerText;
  const productImg =
    element.parentElement.parentElement.getElementsByTagName('img')[0].src;
  const productPrice =
    productItemElement.getElementsByClassName('price')[0].innerText;
  const productRating = productItemElement.getElementsByClassName('red').length;
  const parentDirSplitBySlash = window.location.pathname.split('/');

  console.log(productImg.src);
  const splitDir = parentDirSplitBySlash.slice(
    0,
    parentDirSplitBySlash.length - 1
  );

  splitDir.push('detail.html');

  const finalDir = splitDir.join('/');
  console.log(finalDir);

  window.location.href = `${finalDir}?name=${productName}&price=${productPrice}&rating=${productRating}&img=${productImg}`;
}

const addToCart = (element) => {
  const productPrice =
    element.parentElement.parentElement.getElementsByTagName('span')[0]
      .innerText;
  const productName =
    element.parentElement.parentElement.getElementsByTagName('h3')[0].innerText;
  const productImg = element.parentElement.parentElement
    .getElementsByTagName('img')[0]
    .src.split('/assets/')[1];

  const stringCartStore = window.localStorage.getItem('cart');

  let cartStore;

  if (stringCartStore !== null) {
    cartStore = JSON.parse(stringCartStore);
  } else {
    cartStore = {};
  }

  cartStore[productName.split(' ').join('-').toLowerCase()] = {
    name: productName,
    price: productPrice,
    img: productImg,
    quantity: 1,
  };

  window.localStorage.setItem('cart', JSON.stringify(cartStore));

  alert(`Berhasil memasukan ${productName} ke keranjang`);
};
