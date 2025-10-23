const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categorySelect = document.getElementById('category-select');
const ratingSelect = document.getElementById('rating-select');
const gifContainer = document.getElementById('gif-container');
const loadMoreButton = document.getElementById('load-more-button');

// Substitua pela sua chave da API do Giphy
const apiKey = 'NbpqQhVrxgi4sCm6Zc8Y0NzlO64CBQmM'; 

const limit = 10; // Número de GIFs por página
let offset = 0; // Offset para paginação

searchButton.addEventListener('click', () => {
  offset = 0; // Reinicia o offset ao fazer nova busca
  gifContainer.innerHTML = ''; // Limpa GIFs anteriores
  loadGifs();
});

loadMoreButton.addEventListener('click', () => {
  offset += limit; // Carrega mais
  loadGifs();
});

function loadGifs() {
  const searchTerm = searchInput.value.trim();
  const category = categorySelect.value;
  const rating = ratingSelect.value;

  if (searchTerm === '') {
    alert('Por favor, insira um termo de busca.');
    return;
  }

  let apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}`;

  if (category !== '') {
    apiUrl += `&tag=${category}`;
  }

  if (rating !== '') {
    apiUrl += `&rating=${rating}`;
  }

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.data.length === 0 && offset === 0) {
        gifContainer.textContent = 'Nenhum GIF encontrado.';
        return;
      } else if (data.data.length === 0) {
        gifContainer.textContent = 'Nenhum GIF adicional encontrado.';
        return;
      }

      data.data.forEach(gif => {
        const gifItem = document.createElement('div');
        gifItem.classList.add('gif-item');

        const img = document.createElement('img');
        img.src = gif.images.fixed_width.url;
        img.alt = gif.title;

        gifItem.appendChild(img);
        gifContainer.appendChild(gifItem);
      });
    })
    .catch(error => {
      console.error('Erro ao obter os GIFs:', error);
      gifContainer.textContent = 'Erro ao obter os GIFs. Tente novamente.';
    });

}

