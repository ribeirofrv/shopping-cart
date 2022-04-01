const getSavedCartItems = (list) => {
  const savedList = localStorage.getItem('cartItems');
  const listToSave = list;
  listToSave.innerHTML = savedList;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
