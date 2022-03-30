// Sessão -> Lista de Produtos
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
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

// Sessão -> Carrinho de compras
// const cartItemClickListener = (event) => {
//   
// };

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

/** ADICIONA LISTA DE PRODUTOS AO CARRINHO DE COMPRAS */
// const getSkuFromProductItem = (item) => item

const getDataFromProduct = async (sku) => {
  const { id, title, price } = await fetchItem(sku);
  console.log(`${id} | ${title} | R$${price}`); // por aqui tudo OK
  return {
    sku: id,
    name: title,
    salePrice: price,
  };
};
/* TRYINNNGGG  */
const buttonAddEvent = async () => {
  const sku = document.querySelector('span.item__sku');
  const ol = document.querySelector('cart__items');
  const values = await getDataFromProduct(sku.innerText); // depois arrumo

  ol.appendChild(createCartItemElement(values));
};

/** CRIA LISTA DE PRODUTOS  & ~TENTA ADICIONAR UM EVENTO AO BOTÃO ADICIONAR AO CARRINHO */
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
  
  const buttonAdd = document.querySelectorAll('.item__add');
  console.log(buttonAdd);
  buttonAdd.addEventListener('click', await buttonAddEvent());
};

window.onload = () => {
  createSectionProducts();
 };
