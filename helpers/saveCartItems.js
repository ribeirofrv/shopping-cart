const saveCartItems = (list) => {
  const data = list.innerHTML;
  localStorage.setItem('cartItems', data);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
