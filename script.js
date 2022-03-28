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

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const createSectionProducts = async () => {
  const sectionItems = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  const items = Object.values(results);
  
  items.forEach(({ id, title, thumbnail }) => {
    const values = {
      sku: id,
      name: title,
      image: thumbnail,
    };

    sectionItems.appendChild(createProductItemElement(values));
  });
};

// const getSkuFromProductItem = (item) => {
//   return item.querySelector('span.item__sku').innerText;
// };

// const cartItemClickListener = (event) => {
//   // coloque seu código aqui
// };

// const createCartItemElement = ({ sku, name, salePrice }) => {
//   const li = document.createElement('li');
//   li.className = 'cart__item';
//   li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//   li.addEventListener('click', cartItemClickListener);
//   return li;
// };

window.onload = () => {
  fetchProducts('computador');
  createSectionProducts();
 };
