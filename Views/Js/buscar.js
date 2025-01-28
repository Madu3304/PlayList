
// displayData aqui é para mostrar na tela.
function displayData(data) {
    const songsContainer = document.getElementById('songsContainer');
    songsContainer.innerHTML = ''; 
    data.forEach(song => {
      const songElement = document.createElement('li');
      songElement.textContent = song.name;
      songsContainer.appendChild(songElement);
    });
  }
  
  function fetchDataByArtist(artist) {
    try {
      const response =  fetch(`http://localhost:5083/api/Cantor/GetArtista`);
      // if (!response.ok) {
      //   throw new Error(`Erro: ${response.status}`);
      // }
      // const data =  response.json();
      // console.log("Dados retornados pela API (fetchDataByArtist):", data);
      // displayData(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  
  async function fetchDataByGenre(genre) {
    try {
      const response = await fetch(`http://localhost:5083/api/Cantor/GetGenero`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error(error); }
  }
  
  async function fetchDataBySong(song) {
    try {
      const response = await fetch(`http://localhost:5083/api/Cantor/GetMusicas`);
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error(error); }
  }
  
  formgroup.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const artist = searchInputArtista.value.trim();
    const song = searchInputMusica.value.trim();
    const genre = searchInputGenero.value.trim();
  
    if (artist) {
      await fetchDataByArtist(artist);
    } else if (song) {
      await fetchDataBySong(song);
    } else if (genre) {
      await fetchDataByGenre(genre)}
  });
  
  function showError(errorMessage) {
  
    const errorElement = document.createElement('p');
    errorElement.classList.add('error-message');
    errorElement.textContent = errorMessage;
    songsContainer.innerHTML = ''; 
    songsContainer.appendChild(errorElement); 
  }