// Global Constants
const API_KEY = "nOjzgnRK5wSxGHruvjd3HVSux7Zxk46H";
const LIMIT = "9";
const RATING = "g"

const BASE_API_URL = "http://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=" + LIMIT + "&rating=" + RATING;

const gifResultsEl = document.querySelector("#gif-results");
const searchFormEl = document.querySelector("form");
const loadMoreButtonEl = document.querySelector("#load-more");

let searchTerm = "";
let pageNum = 0;
let offset = LIMIT;

// add event listener to the input
searchFormEl.addEventListener("submit", handleFormSubmit);
loadMoreButtonEl.addEventListener("click", loadMoreGifs);

async function getResults (searchQuery){
    let apiURL = BASE_API_URL + "&q=" + searchQuery;
    console.log(apiURL)
    response = await fetch(apiURL);
    let resultsData = await response.json();
    return resultsData
}

function displayResults (resultsData){
    gifResults = resultsData.data 
    gifResults.forEach( gif => 
        gifResultsEl.innerHTML += `
        <div class="gif">
            <img src="${gif.images.fixed_width.url}"></img>
        </div>
    `
)}

async function handleFormSubmit (evt){

    // to prevent page from reloading
    evt.preventDefault();

    // clear gifs of past searches
    gifResultsEl.innerHTML = ''

    searchTerm = evt.target.searchbox.value;
    searchResults = await getResults(searchTerm);
    console.log(searchResults);
    displayResults(searchResults);

    // unhide load more button
    loadMoreButtonEl.classList.remove("hidden");
}

async function loadMoreGifs (evt){
    pageNum += 1
    // call getResults function with same search term
    updatedResults = await getResults(searchTerm + "&offset=" + offset*pageNum);
    console.log(updatedResults)
    displayResults(updatedResults);
}