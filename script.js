const API_KEY = 'fe0b36055976bbcdd70817a74f7e4e2f';;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const homeBtn = document.getElementById("homeBtn");

// Modal Elements
const movieModal = document.getElementById("movieModal");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalOverview = document.getElementById("modalOverview");
const modalRating = document.getElementById("modalRating");
const closeModal = document.getElementById("closeModal");

// Fetch Popular Movies
async function fetchMovies(query = "") {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <p class="movie-title">${movie.title}</p>
    `;

    card.addEventListener("click", () => showDetails(movie));
    movieContainer.appendChild(card);
  });
}

function showDetails(movie) {
  modalPoster.src = IMG_URL + movie.poster_path;
  modalTitle.textContent = movie.title;
  modalOverview.textContent = movie.overview || "No description available.";
  modalRating.textContent = `⭐ Rating: ${movie.vote_average}`;

  movieModal.style.display = "flex";
}

closeModal.onclick = () => {
  movieModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === movieModal) movieModal.style.display = "none";
};

// Search Movies
searchInput.addEventListener("input", (e) => {
  fetchMovies(e.target.value.trim());
});

// Home Button Show/Hide + Scroll
window.addEventListener("scroll", () => {
  homeBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Initial Load
fetchMovies();
