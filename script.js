const ol = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/** Ref.: https://regexr.com/ */
const getTotalPrice = () => {
  const totalPrice = document.querySelector('.total-price');
  let total = 0;
  
  ol.childNodes.forEach(async (li) => {
    const sku = li.textContent.match(/([MLB])\w+/);
    const { price } = await fetchItem(sku[0]);
    total += price;
    
    totalPrice.innerText = total;
  });
};

const cartItemClickListener = (event) => {
  const theTarget = event.target;
  theTarget.remove();
  getTotalPrice();
  saveCartItems(ol);
};

/** CRIA ELEMENTO DO CARRINHO DE COMPRAS */
const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

/** ADICIONA LISTA DE PRODUTOS AO CARRINHO DE COMPRAS */
const addToCart = (values) => {
  ol.appendChild(createCartItemElement(values));
  saveCartItems(ol);
};

const getDataFromProduct = async (sku) => {
  const { id, title, price } = await fetchItem(sku);
  return { sku: id, name: title, salePrice: price };
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const buttonAddEvent = async (event) => {
  const theTarget = event.target;
  const node = theTarget.parentNode; // Retorna o elemento pai
  const sku = getSkuFromProductItem(node);
  const values = await getDataFromProduct(sku);
  addToCart(values);
  getTotalPrice();
};

/** CRIA ELEMENTOS DA LISTA DE PRODUTOS À VENDA */
const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', buttonAddEvent);

  return section;
};

/** CRIA LISTA DE PRODUTOS À VENDA */
const createSectionProducts = async () => {
  const sectionItems = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  
  results.forEach(({ id, title, thumbnail }) => {
    const values = { sku: id, name: title, image: thumbnail };
    sectionItems.appendChild(createProductItemElement(values));
  });
};

const clearCart = () => {
  const buttonClear = document.querySelector('.empty-cart');
  buttonClear.addEventListener('click', () => {
    ol.innerHTML = '';
    saveCartItems(ol);
  });
};

const getCart = () => {
  ol.innerHTML = getSavedCartItems();
  ol.childNodes.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

window.onload = () => {
  createSectionProducts();
  getCart();
  clearCart();
  getTotalPrice();
 };
