const apiKey = '0c23b158b013c7b7845ed5e115ee9847';
const showId = localStorage.getItem('selectedShowId');

function fetchShowDetails() {
    fetch(`https://api.themoviedb.org/3/tv/${showId}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(show => {
            document.getElementById('show_name').innerText = show.name;
            document.getElementById('overview').innerText = show.overview;
            

            document.getElementById('show_poster').src = `https://image.tmdb.org/t/p/w300${show.poster_path}`;
            document.getElementById('show_poster').alt = `${show.name} Poster`;

            const seriesRating = show.vote_average;
            document.getElementById('show_rating').innerText = seriesRating.toFixed(1);
            document.getElementById('show_rating').className = getRatingClass(seriesRating);


            const filteredSeasons = show.seasons.filter(season => season.season_number !== 0);

            filteredSeasons.forEach(season => {
                document.getElementById('seasons').innerHTML += `
                <div class="season">
                    <div class="h2"> <h2>${season.season_number}</h2> </div>
                    <div id="episodes_${season.season_number}" class="episodes-container"></div>
                </div>`;
                

                fetchEpisodes(season.season_number);
            });
        })
        .catch(error => console.error('Error fetching show details:', error));
}

function fetchEpisodes(seasonNumber) {
    fetch(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(season => {
            const episodesContainer = document.getElementById(`episodes_${seasonNumber}`);
            episodesContainer.innerHTML = '';
            
            season.episodes.forEach((episode) => {
                episodesContainer.innerHTML += `
                <div class="episode">
                    <p class="num"><strong> ${episode.episode_number}</strong></p>
                    <div class="ratings-container">
                        <span class="rating ${getRatingClass(episode.vote_average)}">${episode.vote_average.toFixed(1)}</span>
                    </div>
                </div>`;
            });
        })
        .catch(error => console.error('Error fetching episodes:', error));
}


function getRatingClass(rating) {
    if (rating < 4.0) return 'rating-red';         // rgb(153, 0, 0) Red
    if (rating < 5.0) return 'rating-red-orange';   // rgb(204, 0, 0) Red-orange
    if (rating < 6.0) return 'rating-orange';       // rgb(204, 51, 0) Orange
    if (rating < 7.0) return 'rating-yellow-orange'; // rgb(204, 102, 0) Yellow-orange
    if (rating < 8.0) return 'rating-yellow';       // rgb(153, 153, 0) Yellow
    if (rating < 8.5) return 'rating-yellow-green'; // rgb(102, 153, 0) Yellow-green
    if (rating < 9.0) return 'rating-green-yellow'; // rgb(51, 153, 0) Green-yellow
    if (rating < 9.5) return 'rating-green';        // rgb(0, 153, 0) Green
    return 'rating-purple';                        // rgb(102, 0, 102) Purple
}

fetchShowDetails();
