const apiKey = `api_key=9455ea8347cb46b03f90c88f132db4a2`;
const domainName = "https://api.themoviedb.org/3/";
let current_page = 1;

  async function displaySwiper() {
    const response = await fetch(`${domainName}movie/now_playing?${apiKey}`)
    const items = await response.json();

    const wrapper = document.querySelector(".now-playing .swiper .swiper-wrapper");

    items.results.forEach(result => {
        const slide = createElement("div","swiper-slide");

        const image_link = createElement("a","",{
          href : `movie-details.html?id=${result.id}`,
          style : "width:100%"
        });
      
        const image = createElement("img","",{
          src : "https://image.tmdb.org/t/p/w300" + result.poster_path,
          alt : result.title
        });

        const rating = createElement("h4","swiper-rating",{},`
          <i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10
        `);
        
        appendChild(image_link,image,rating);

        slide.appendChild(image_link);
        wrapper.appendChild(slide);
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
              slidesPerView: 1,
              spaceBetween: 10
            },
            // when window width is >= 480px
            800: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            // when window width is >= 640px
            1000 : {
              slidesPerView: 3,
              spaceBetween: 40
            },
            1400 : {
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

      hideSpinner();
  }

  //Display Show / Movie  Details
  async function displayDetails(type,id) {    
      const response = await fetch(`${domainName}${type}/${id}?${apiKey}`);
      const data = await response.json();

      displayBackgroundImage(type,data.backdrop_path);
      const container = document.getElementById(`${type == "tv" ? "show" : "movie"}-details`);

      const details_top = createElement("div","details-top");
      const image_container = createElement("div");
      const image = createElement("img","card-img-top",{
        src : data.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : "images/no-image.jpg"
      });

      const details_container = createElement("div");
      const title = createElement("h2","",{},`${type == "tv" ? data.name : data.title}`);
      const rating = createElement("p","",{},`
        <i class="fas fa-star text-primary"></i>
        ${data.vote_average.toFixed(1)} / 10
      `);
      const release_data = createElement("p","text-muted",{},`
          ${type == "tv" ? data.first_air_date : data.release_date}
      `);
      const overview = createElement("p","",{},`
         ${data.overview}
      `);
      const genre_display = createElement("h5");

      const genres = createElement("ul","list-group",{},`
          ${data.genres.map(genre => `<li>${genre.name}</li>`).join("")}
      `); 

      const visit = createElement("a","btn",{
        target : "_blank",
        href : `${data.homepage}`
      },`Visit ${type == "tv" ? "Show" : "Movie"} Homepage`);

      const details_bottom = createElement("div","details-bottom");
      const info = createElement("h2","",{},`
        ${type == "tv" ? "Show" : "Movie"} Info
      `);
      const infos = createElement("ul","",{},
        type == "tv" ?
        `
          <li><span class="text-secondary" id="details">Number Of Episodes:</span> ${data.number_of_episodes}</li>
          <li><span class="text-secondary" id="details">Last Episode To Air:</span> ${data.last_episode_to_air.name}</li>
          <li><span class="text-secondary" id="details">Status:</span> ${data.status}</li>
        `
        :
        `
          <li><span class="text-secondary">Budget:</span> $${commaSeperateNumber(data.budget)}</li>
          <li><span class="text-secondary">Revenue:</span> $${commaSeperateNumber(data.revenue)}</li>
          <li><span class="text-secondary">Runtime:</span> ${data.runtime} minutes</li>
          <li><span class="text-secondary">Status:</span> ${data.status}</li>
        `
      );
      const companies_display = createElement("h4","",{},"Production Companies");
      const companies = createElement("div","list-group",{});

      companies.innerHTML = data.production_companies.map(company => company.name).join(",");

      appendChild(image_container,image);

      appendChild(details_container,
        title,
        rating,
        release_data,
        overview,
        genre_display,
        genres,
        visit
      );

      appendChild(details_top,
        image_container,
        details_container
      );

      appendChild(details_bottom,
        info,
        infos,
        companies_display,
        companies
      );

      appendChild(container,
        details_top,
        details_bottom
      );
      
      hideSpinner();
  }


  async function displaySearch(type = "tv",search_term = "a") {
      showSpinner();

      const response = await fetch(`${domainName}search/${type}?query=${search_term}&include_adult=false&page=${current_page}&${apiKey}`);
      const data = await response.json();
      const results = data.results;

      const search_results = document.getElementById("search-results");
      search_results.innerHTML = "";  

      const prev_button = document.getElementById('prev');
      const next_button = document.getElementById('next');

      if (current_page == 1) {
        prev_button.setAttribute("disabled",true);
      } else {
        prev_button.removeAttribute("disabled");
      }

      if (current_page == data.total_pages) {
        next_button.setAttribute("disabled",true);
      } else {
        next_button.removeAttribute("disabled");
      }
      
      document.getElementById("page-counter").innerHTML = `Page ${current_page} of ${data.total_pages}`;
     if (data.total_results == 0) {
        document.getElementById("alert").innerHTML = `
          <div class="alert error">No results found</div>
        `;
        setTimeout(() => document.getElementById("alert").innerHTML = ``,2000);
     }  else {  
        const header_result = document.getElementById("search-results-heading");
        header_result.innerHTML = `<h2>${results.length} OF ${data.total_results} RESULTS FOR ${search_term}</h2>`;
        window.scrollTo(0,0);
     }

      results.forEach(result => {
          const card = createElement("div","card");

          const a = createElement("a","",{
            href : `./${type}-details.html?id=` + result.id
          });

          const image = createElement("img","card-img-top", {
            src : result.poster_path ? "https://image.tmdb.org/t/p/w300" + result.poster_path : "./images/no-image.jpg"
          });

          const body = createElement("div","card-body");

          const title = createElement("h5","card-title",{},type == "tv" ? result.name : result.title);

          const text = createElement("p","card-text",{},`
              <small class="text-muted">Release: ${type == "tv" ? result.first_air_date : result.release_date}</small>
          `);

          appendChild(body,
              title,
              text
          );

          a.appendChild(image);

          appendChild(card,
              a,
              body
          );

          search_results.appendChild(card);
      });

      hideSpinner();
  }

async function displayPopular(type) {
  const response = await fetch(`${domainName}${type}/popular?${apiKey}`);
  const data = await response.json();

  const popularshowsContainer = document.getElementById(`popular-${type == "tv" ? "shows" : "movies"}`);

  data.results.forEach(shows => {
    const showsCard = createElement("div","card");

    const showsLink = createElement("a","",{
      href : `./${type}-details.html?id=${shows.id}`
    });

    const showsImage = createElement("img","card-img-top",{
      src : `https://image.tmdb.org/t/p/w300${shows.poster_path}`,
      alt : shows.title
    });

    const cardBody = createElement("div","card-body");

    const showsTitle = createElement("h5","card-title",{},type == "tv" ? shows.name : shows.title);

    const releaseDate = createElement("p","card-text");

    const releaseDateText = createElement("small","text-muted",{},`Release: ${type == "tv" ? shows.first_air_date : shows.release_date}`);

    releaseDate.appendChild(releaseDateText);

    appendChild(cardBody,
      showsTitle,
      releaseDate
    );

    showsLink.appendChild(showsImage);

    appendChild(showsCard,
      showsLink,
      cardBody
    );

    popularshowsContainer.appendChild(showsCard);
    hideSpinner();
  });
}



window.addEventListener("DOMContentLoaded",initialize);

function initialize() {
  let path = location.pathname;
  
  showSpinner();
  switch (path) {
    case "/" :
    case "/index.html" :
    case "/shows.html" :
      (() => {
        let type = path.split(".")[0].slice(1);
        type = type == "shows" ? "tv" : "movie";  

        document.querySelectorAll(".nav-link")[type == "tv" ? 1 : 0].classList.add("active");

        displayPopular(type);

        if (type == "movie") 
          displaySwiper();
        

      })();
      break;
    case "/tv-details.html":
    case "/movie-details.html":
      (() => {
        let type = path.split("-")[0].slice(1);
        let id = location.search.split("=")[1];
        displayDetails(type,id);
      })();
      break;
    case "/search.html" :
      let queries = location.search;
      let [type,search_term] = queries.split("&").map(q => q.split("=")[1]);
      displaySearch(type,search_term); 

      document.getElementById('next').addEventListener("click",function() {
        current_page++;
        displaySearch(type,search_term);
      })

      document.getElementById('prev').addEventListener("click",function() {
        current_page--;
        displaySearch(type,search_term);
      })
  }

}

function createElement(element,classes,attributes = {},innerHTML) {
    let result = document.createElement(element);
    if (classes) result.className = classes;

    if (innerHTML) result.innerHTML = innerHTML;

    for (let key in attributes) {
      result.setAttribute(key,attributes[key]);
    }

    return result;
} 

function appendChild(parent,...childs) {
  for (let i = 0;i < childs.length;i++) {
    parent.appendChild(childs[i]);
  }
}


function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function commaSeperateNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function displayBackgroundImage(type, backgroundPath){
  const overlayDiv = document.createElement("div");  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;  
  overlayDiv.style.backgroundSize = "cover";  
  overlayDiv.style.backgroundPosition = "center";  overlayDiv.style.backgroundRepeat = "no-repeat";  overlayDiv.style.height = "100vh";  
  overlayDiv.style.width = "100vw";  
  overlayDiv.style.position = "absolute";  
  overlayDiv.style.top = "0";  
  overlayDiv.style.left = "0";  
  overlayDiv.style.zIndex = "-1";  
  overlayDiv.style.opacity = "0.1";  
  
  if (type === "movie") {    
    document.querySelector("#movie-details").appendChild(overlayDiv);  
  } else {    
    document.querySelector("#show-details").appendChild(overlayDiv);  
  }
}
