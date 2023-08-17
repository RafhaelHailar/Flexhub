

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
  //fetchAndDisplayPopularMovies();


  async function displaySwiperNoSwiping() {
    const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=9455ea8347cb46b03f90c88f132db4a2")
    const items = await response.json();

    const table = document.querySelector(".now-playing .swiper .swiper-wrapper");

    items.results.forEach(result => {
        const continir = document.createElement("div");
        continir.className = "swiper-slide";

        const aLuhaAkbar = document.createElement("a");
        aLuhaAkbar.setAttribute("href",`movie-details.html?id=${result.id}`);
        aLuhaAkbar.style.width = "100%"

        const imaheNgNakaraan = document.createElement("img");
        imaheNgNakaraan.setAttribute("src","https://image.tmdb.org/t/p/w300" + result.poster_path);
        imaheNgNakaraan.alt = result.title;

        const imNoRat = document.createElement("h4");
        imNoRat.className = "swiper-rating";

        const intindihinAngMgaAralin = document.createElement("i");
        intindihinAngMgaAralin.className = "fas fa-star text-secondary";

        imNoRat.innerHTML += `<i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10`

        aLuhaAkbar.appendChild(imaheNgNakaraan);
        aLuhaAkbar.appendChild(imNoRat);

        continir.appendChild(aLuhaAkbar);
        
        table.appendChild(continir);
    });

    const swiper = new Swiper('.now-playing .swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: {
            enabled: true,
            sticky: true,
          },

        breakpoints: {
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 40
            }
        },
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
  }

  

 // displaySwiperNoSwiping();

// Structure

/*   <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="movie-details.html?id=1">
              <img
                src="./images/no-image.jpg"
                alt="Movie Title"
              />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> 8 / 10
            </h4>
          </div>
        </div>
 */

  window.addEventListener("DOMContentLoaded",function() {
    let str = location.href;
    let id = str.slice(str.search(/id=\d+/)).slice(3);
    //display(id);

    let type = /type=(tv|movie)/.exec(str)[1];
    let search_term = /search-term=(\w+)/.exec(str)[1];
    displaySearch(type,search_term);
  })

  function display(id) {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9455ea8347cb46b03f90c88f132db4a2`)
        .then(response => response.json())
        .then(data => {
            let res = `
            <div class="details-top">
            <div>
              <img
                src="https://image.tmdb.org/t/p/w300${data.poster_path}"
                class="card-img-top"
                alt="Movie Title"
              />
            </div>
            <div>
              <h2>${data.title}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                8 / 10
              </p>
              <p class="text-muted">Release Date: ${data.release_date}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                atque molestiae error debitis provident dolore hic odit, impedit
                sint, voluptatum consectetur assumenda expedita perferendis
                obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
                quae molestiae cupiditate modi libero dolorem commodi obcaecati!
                Ratione quia corporis recusandae delectus perspiciatis consequatur
                ipsam. Cumque omnis ad recusandae.
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
                <li>Genre 1</li>
                <li>Genre 2</li>
                <li>Genre 3</li>
              </ul>
              <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
              <li><span class="text-secondary">Budget:</span> $1,000,000</li>
              <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
              <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
              <li><span class="text-secondary">Status:</span> Released</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">Company 1, Company 2, Company 3</div>
          </div>
  `
            document.getElementById("movie-details").innerHTML = res;
        })

        
  }


  async function displaySearch(type,search_term) {
      const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${search_term}&include_adult=false&page=1&api_key=9455ea8347cb46b03f90c88f132db4a2`);
      
      const data = await response.json();
      const results = data.results;

      results.forEach(result => {
          const card = document.createElement("div");
          card.className = "card";
          const a = document.createElement("a");
          const img = document.createElement("img");
          img.src = result.poster_path ? "https://image.tmdb.org/t/p/w300" + result.poster_path : "./images/no-image.jpg";
          img.className = "card-img-top";
          const body = document.createElement("div");
          body.className = "card-body";
          const title = document.createElement("h5");
          title.className = "card-title";
          title.innerHTML = type == "tv" ? result.name : result.title;
          const text = document.createElement("p");
          text.className = "card-text";
          text.innerHTML= `<small class="text-muted">Release: ${type == "tv" ? result.first_air_date : result.release_date}`;


          body.appendChild(title);
          body.appendChild(text);

          a.appendChild(img);

          card.appendChild(a);
          card.appendChild(body);

          document.getElementById("search-results").appendChild(card);
      })  
      console.log(results)
  }


//Structure
/*   <div class="card">
  <a href="#">
    <img src="./images/no-image.jpg" class="card-img-top" alt="" />
  </a>
  <div class="card-body">
    <h5 class="card-title">Movie Or Show Name</h5>
    <p class="card-text">
      <small class="text-muted">Release: XX/XX/XXXX</small>
    </p>
  </div>
</div> */

async function fetchAndDisplayPopularShows() {
  const apiKey = '9455ea8347cb46b03f90c88f132db4a2'; // Replace with your actual API key
  const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`);
  const data = await response.json();

  const popularshowsContainer = document.getElementById('popular-shows');

  data.results.forEach(shows => {
    const showsCard = document.createElement('div');
    showsCard.className = 'card';

    const showsLink = document.createElement('a');
    showsLink.href = `shows-details.html?id=${shows.id}`;

    const showsImage = document.createElement('img');
    showsImage.src = `https://image.tmdb.org/t/p/w300${shows.poster_path}`;
    showsImage.className = 'card-img-top';
    showsImage.alt = shows.title;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const showsTitle = document.createElement('h5');
    showsTitle.className = 'card-title';
    showsTitle.textContent = shows.original_name;

    const releaseDate = document.createElement('p');
    releaseDate.className = 'card-text';
    const releaseDateText = document.createElement('small');
    releaseDateText.className = 'text-muted';
    releaseDateText.textContent = `Release: ${shows.first_air_date}`;
    releaseDate.appendChild(releaseDateText);

    cardBody.appendChild(showsTitle);
    cardBody.appendChild(releaseDate);

    showsLink.appendChild(showsImage);
    showsCard.appendChild(showsLink);
    showsCard.appendChild(cardBody);

    popularshowsContainer.appendChild(showsCard);
  });
}
// Call the function to fetch and display popular movies
//fetchAndDisplayPopularShows();