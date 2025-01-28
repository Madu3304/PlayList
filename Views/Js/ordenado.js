
const form = document.querySelector('#form');
const songsContainer = document.querySelector('#songsContainer');
const submitVerAr = document.querySelector('#submitVerAr');
const submitVerGene = document.querySelector('#submitVerGene'); 

const apiURL = 'https://guilhermeonrails.github.io/api-csharp-songs/songs.json';

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) { throw new Error('Erro ao buscar.'); }
        return await response.json();
    } catch (error) { console.error(error);
        return null; }
};

//colocar genero e artista
const insertSongsPage = (filtros) => {
    songsContainer.innerHTML = filtros.map((filtro) => `
        <li class="song"><span class="song-artist"><strong>${filtro.artist}</strong></span></li>
    `).join('');
};

const insertSongs = (filtros) => {
    songsContainer.innerHTML = filtros.map((filtro) => `
        <li class="song"><span class="song-genre"><strong>${filtro.genre}</strong></span></li>
    `).join('');
};

//artistas ## 'sort' para ordenar 
const sortArtists = (data) => { const sortedData = data.sort((a, b) => { return a, b}); return removerArtist(sortedData); };

//gêneros ## 'toLowerCase' é para tornar minúsculas
const sortGenres = (data) => { const sortedData = data.sort((a, b) => { return a, b }); return removerGenere(sortedData); };

submitVerAr.addEventListener('click', async (event) => {
    event.preventDefault(); 
    const data = await fetchData(apiURL);
    if (!data) return;
    const sortedArtists = sortArtists(data);
    insertSongsPage(sortedArtists);
});

submitVerGene.addEventListener('click', async (event) => {
    event.preventDefault(); 
    const data = await fetchData(apiURL);
    if (!data) return;
    const sortedGenres = sortGenres(data);
    insertSongs(sortedGenres);
});

const fetchFiltro = async (artist, song) => {
    const data = await fetchData(`${apiURL}/v1/${artist}/${song}`);

    // Ajustar as características do texto.
    const Cantor = data.Cantor.replace(/(\r\n|\r|\n)/g, '<br>'); 
    //replace aqui vai substituir um caracter por outro
     
    songsContainer.innerHTML = `
      <li class="Cantor-container"><h2><strong>${song}</strong> - ${artist}</h2>  
        <p class="Cantor">${Cantor}</p> 
      </li>
    `;
  };

//#########################################################################################################
//Config do texto em tela 
  const fetchFiltros = async (genre, song) => {
    const data = await fetchData(`${apiURL}/v1/${genre}/${song}`);

    // Ajustar as características do texto.
    const Cantor = data.Cantor.replace(/(\r\n|\r|\n)/g, '<br>'); 
    //replace aqui vai substituir um caracter por outro
     
    songsContainer.innerHTML = `
      <li class="Cantor-container"><h2><strong>${song}</strong> - ${genre}</h2>  
        <p class="Cantor">${Cantor}</p> 
      </li>
    `;
  };

  //click
  songsContainer.addEventListener('click', event=> { 
    const clickedElement = event.target
  
    if(clickedElement.tagName === 'BUTTON'){
      const artist = clickedElement.getAttribute('data-artist')
      const songTitle = clickedElement.getAttribute('data-song-title')
  
      prevAndNextContainer.innerHTML = ''
      fetchLyrics(artist, songTitle)
    }
  })
  
  //click
  songsContainer.addEventListener('click', event=> { 
    const clickedElement = event.target
  
    if(clickedElement.tagName === 'BUTTON'){
      const genre = clickedElement.getAttribute('data-genre')
      const songTitle = clickedElement.getAttribute('data-song-title')
  
      prevAndNextContainer.innerHTML = ''
      fetchLyrics(genre, songTitle)
    }
  })
  
  // //#########################################################################################################
  // func para remover repetidos com 'SET'
  const removerArtist = (data) => { const removendo = new Set(); 
    return data.filter(coisa => { const removido = removendo.has(coisa.artist);  
     removendo.add(coisa.artist); 
      return !removido;   
    });
  };

  const removerGenere = (data) => { const removendo = new Set(); 
    return data.filter(coisa => { const removido = removendo.has(coisa.genre);  
     removendo.add(coisa.genre); 
      return !removido;   
    });
  };