$(document).ready(() => {
  // creating an event for when the form is submiting a sentence
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


// $('#searchForm').on('input', (e) => { 
//   var arr = $(this).val() // get the current value of the input field.
//   axios.get('https://www.omdbapi.com/?apikey=7e5d49a7&s='+arr)
//     .then((response) =>{
//       getMovies(response);
//     });
// });


function getMovies(searchText){
  // using axios to make requests to the api
  axios.get('https://www.omdbapi.com/?apikey=7e5d49a7&s='+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        if(movie.Poster == 'N/A'){
          movie.Poster = 'img/404.jpg';
        }
        output += `
          <div class="col-md-3 my-movie">
            <div class="well">
              <h5><strong class="movie-title" data-toggle="tooltip" data-placement="right" title="${movie.Title}">${movie.Title}</strong></h5><hr />
              <img class="thumbnail" src="${movie.Poster}">
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">More Details</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
    
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('https://www.omdbapi.com/?apikey=7e5d49a7&i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-11">
            <div class="well">
              <h3>Plot:</h3>
              ${movie.Plot}
              <hr>
              <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-default">Go back to search</a>
            </div>
          </div>
        </div>
        <br />
      `
      //check for images
      $('.thumbnail').attr('src','img/404.jpg');

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
