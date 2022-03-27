require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se `fetchProducts` é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se quando chamada a função `fetchProducts` com o parâmetro \'computador\', `fecth` é chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se quando chamada a função `fetchProducts` com o parâmetro \'computador\', a função `fetch` utiliza o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  
  it('Verifica se quando chamada a função `fetchProducts` com o parâmetro \'computador\', retorna uma estrutura de dados do tipo objeto', async () => {
    const expected = await fetchProducts('computador');
    expect(expected).toEqual(computadorSearch);
  });
  
  it('Verifica se quando chamada a função `fetchProducts` sem parâmetro, retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
  
});
