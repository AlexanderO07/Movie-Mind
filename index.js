let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn"); 
let result = document.getElementById("result");

// function to fetch data from my api key on other script

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    // if input field is empty

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Unlock the Magic of Movies with Movie Mind!</h3>
        <div id="image"></div>`;
    }

    // if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {

            // if movie does exist in database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot Summary:</h3>
                    <p>${data.Plot}</p>
                    <h3>Main Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }
            
            // adds the divs and h3 html elements to the result div once a response is recieved by the API url
            
            //if movie doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg">Please enter a valid movie title.</h3>`; 
            }
        })
            //if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured. Please try again.</h3>`;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
// since it may be more natural to just hit the enter key instead of clicking search
movieNameRef.addEventListener("keydown", function(event) {
    // If the key pressed is Enter (keyCode 13), call the getMovie function
    if (event.key === "Enter") {
      getMovie();
    }
  });
window.addEventListener("load", getMovie);