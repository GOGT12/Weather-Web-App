import "./styles.css"
import { renderData, renderGif, changeUnits } from "./render.js";
import { weatherData } from "./functions.js";


const input = document.querySelector('#input');
const searchButton = document.querySelector('#search-button');

 async function main() {
    /* This functions controls the flow of the Web Page*/

    // Getting the Data //
    const data = await weatherData();

    // RENDER DATA //
    renderGif(data);
    renderData(data);
    changeUnits(data);
    console.log(data)

    function handleSearch() {
        // Check if input is valid
        if (!input.checkValidity()) {
            input.reportValidity();
            return;
        }

        // Getting the data from the API
        async function getPlaceData(place) {
            const data = await weatherData(place);
            renderGif(data);
            renderData(data);
            changeUnits(data);
        }

        const placeData = input.value.trim();
        getPlaceData(placeData);
        input.value = "";
    }

    // Click event
    searchButton.addEventListener('click', handleSearch);

    // Enter key event
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
};

main();
