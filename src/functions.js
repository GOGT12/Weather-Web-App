// Giphy Api //
// Api key

// Back ground Image
async function weatherImg(weatherCondition) {

    const giphyKey = "ioOsh3RohVETU95RvMcCtIesYhunCGXk";

    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${weatherCondition}`, {mode: 'cors'});
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data
    }catch (error){
        console.error('There was an error when collectiong data from the server:', error)
        return false
    }
};


// Visual Crossing Api//
// Api key


async function weatherData(place = 'Tarija'){

    const visualKey = "R3K3GPJNC9G5LXCC7AUE3QYW3"

    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${visualKey}`, {mode: 'cors'});
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data

    }catch (error){
        console.error("There was an error when collection the data", error);
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New York?key=${visualKey}`, {mode: 'cors'});
        const data = await response.json();
        return data
    };

};

// Fahrenheit to Celsius //

function fahrenheitToCelsius(fahrenheit) {
    let celsius = (fahrenheit - 32) * 5/9;
    return Math.round(celsius)
};


// Get Day Name //
function getDayName(dateString){
    const date = new Date(dateString);
    const options = {weekday: 'long'};
    return date.toLocaleDateString('en-US',options)
}

export {fahrenheitToCelsius , weatherData, weatherImg, getDayName}
