async function fetchAndDisplayPopularMovies() {
    const apiKey = '9455ea8347cb46b03f90c88f132db4a2'; // Replace with your actual API key
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const data = await response.json();

    const popularMoviesContainer = document.getElementById('popular-movies');

    data.results.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.className = 'card';

      const movieLink = document.createElement('a');
      movieLink.href = `movie-details.html?id=${movie.id}`;

      const movieImage = document.createElement('img');
      movieImage.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
      movieImage.className = 'card-img-top';
      movieImage.alt = movie.title;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const movieTitle = document.createElement('h5');
      movieTitle.className = 'card-title';
      movieTitle.textContent = movie.title;

      const releaseDate = document.createElement('p');
      releaseDate.className = 'card-text';
      const releaseDateText = document.createElement('small');
      releaseDateText.className = 'text-muted';
      releaseDateText.textContent = `Release: ${movie.release_date}`;
      releaseDate.appendChild(releaseDateText);

      cardBody.appendChild(movieTitle);
      cardBody.appendChild(releaseDate);

      movieLink.appendChild(movieImage);
      movieCard.appendChild(movieLink);
      movieCard.appendChild(cardBody);

      popularMoviesContainer.appendChild(movieCard);
    });
  }

  // Call the function to fetch and display popular movies
  fetchAndDisplayPopularMovies();

function red() {
    document.getElementById('p2').style.color="red";
}