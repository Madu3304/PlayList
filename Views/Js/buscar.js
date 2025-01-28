

// displayData aqui é para mostrar na tela.
function displayData(data) {
  const songsContainer = document.getElementById('songsContainer');
  songsContainer.innerHTML = '';

  data.forEach(item => {
    const songElement = document.createElement('li');

    if (typeof item === "string") { songElement.textContent = item; 
    } else { songElement.textContent = "Ocorreu um erro, sorry"; }   
    songsContainer.appendChild(songElement);
  });
}


async function fetchDataByArtist(artist) {
  try {
      const response = await fetch(`http://localhost:5083/api/Cantor/GetArtista?artist=${encodeURIComponent(artist)}`);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);

    const data = await response.json();
    displayData(data);
    // displayData aqui é para mostrar na tela.
  } catch (error) {
    console.log(error);
  }
}

  
  
  async function fetchDataByGenre(genre) {
    try {
      const response = await fetch(`http://localhost:5083/api/Cantor/GetGenero?genero=${encodeURIComponent(genre)}`);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);

      const data = await response.json();
      displayData(data);
      // displayData aqui é para mostrar na tela.
    } catch (error) {
      console.error(error); }
  }

  async function fetchDataBySong(song) {
    try {
      const response = await fetch(`http://localhost:5083/api/Cantor/GetMusicas?musica=${encodeURIComponent(song)}`);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      
      const data = await response.json();
      displayData(data);
      // displayData aqui é para mostrar na tela.
    } catch (error) {
      console.error(error); }
  }
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const artist = searchInputArtista.value.trim();
    const song = searchInputMusica.value.trim();
    const genre = searchInputGenero.value.trim();
  
    if (artist) {
      await fetchDataByArtist(artist);
    } else if (song) { await fetchDataBySong(song);
    } else if (genre) { await fetchDataByGenre(genre)}
  });
  //finalmente