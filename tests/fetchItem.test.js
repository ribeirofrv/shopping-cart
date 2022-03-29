require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Verifica se `fetchItem` é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Verifica se quando chamada a função `fetchItem` com o parâmetro \'MLB1615760527\', `fecth` é chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se quando chamada a função `fetchItem` com o parâmetro \'MLB1615760527\', a função `fetch` utiliza o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Verifica se quando chamada a função `fetchItem` com o parâmetro \'MLB1615760527\', retorna uma estrutura de dados do tipo objeto', async () => {
    const expected = await fetchItem('MLB1615760527');
    expect(expected).toEqual(item);
  });

  it('Verifica se quando chamada a função `fetchItem` sem parâmetro, retorna um erro com a mensagem: \'You must provide an url\'', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });  
});
