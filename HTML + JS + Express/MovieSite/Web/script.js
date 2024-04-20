const SEARCH_API = "http://www.omdbapi.com/?apikey=b3be3ea9&s=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(SEARCH_API + 'all');

function returnMovies(url){
    fetch(url).then(res => res.json())
              .then(function(data){
                console.log(data.Search);
                data.Search.forEach(e => {
                        
                        const div_column = document.createElement("div");
                        div_column.setAttribute("class","column");
                        const div_card = document.createElement("div");
                        div_card.setAttribute("class","card");
                        const image = document.createElement("img");
                        image.setAttribute("class","thumbnail");
                        const title = document.createElement("h3");

                        title.innerHTML = `${e.Title}<br><a href="movie.html?id=${e.imdbID}&title=${e.Title}">reviews</a>`;
                        image.src = e.Poster;

                        div_card.appendChild(image);
                        div_card.appendChild(title);
                        div_column.appendChild(div_card);
                        main.appendChild(div_column);


                });
              });          
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = "";

    const searchItem = search.value;

    if(searchItem) {
        returnMovies(SEARCH_API + searchItem);
        search.value = "";
    }
});