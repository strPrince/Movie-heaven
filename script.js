const apiKey = 'ebbfdc7b';
const genres = ['comedy', 'drama', 'action','science','romance','thriller','horror','documentry','crime','musical','fantasy']; // we put generas as wenned then bitch

document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.querySelector('.main-container');

  genres.forEach(genre => {
    const url = `https://www.omdbapi.com/?s=${genre}&apikey=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const movies = data.Search || []; 
       

        const genreContainer = document.createElement('div');
        genreContainer.classList.add('genre-list');
        genreContainer.dataset.genre = genre;

       
        const genreTitle = document.createElement('h3');
        genreTitle.classList.add('test')
        genreTitle.textContent = genre.toUpperCase();
        genreContainer.appendChild(genreTitle);


       
        const moviesContainer = document.createElement('div');
        moviesContainer.classList.add('movies-container');

        const filteredMovies = movies.length > 0 && movies[0].Title === 'Template' ? movies.slice(1) : movies;
        filteredMovies.forEach((movie) => {
          const title = movie.Title;
          const poster = movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150';
          const movieID = movie.imdbID; 

          const movieItem = document.createElement('div');
          movieItem.classList.add('movie-item');
          movieItem.innerHTML = `
            <div class="cover"> 
              <img src="${poster}" alt="${title}">
            </div>
            <div class="movie-name">${title}</div>
          `;

          
          movieItem.addEventListener('click', () => {
            window.location.href = `detail.html?id=${movieID}`;
          });

          moviesContainer.appendChild(movieItem);
        });

        genreContainer.appendChild(moviesContainer);
        mainContainer.appendChild(genreContainer);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        
      });
  });
});

gsap.from(".nav",{y:-100})
gsap.from(".test", {
  x: 100,
  delay:10  ,
  opacity: 2,
  duration: 2, 
  ease: "power3.out" 
});