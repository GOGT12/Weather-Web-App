
import {iconMap, giphySearchMap} from "./iconMap.js";
import { fahrenheitToCelsius, weatherImg, getDayName } from "./functions.js";
import { WeatherHourBox } from "./weatherbyhour.js";
import { DaysObject } from "./weatherbyday.js";

// Queary Selectors //

const containerDiv = document.querySelector('#container');
const dataContentDiv = document.querySelector("#data-content");
const iconContentDiv = document.querySelector('#icon-content');
const tmpContentDiv = document.querySelector('#data-content-tmp');
const convertionButton = document.querySelector('#convertion');
const nexdaysDiv = document.querySelector('#days-tmp');
const hourDiv = document.querySelector('.box-hour');

async function renderGif(data){

    // Getting the Gif background //
    const gifName = giphySearchMap[`${data.currentConditions.icon}`];
    const dataGif = await weatherImg(gifName);
    if(dataGif === false){
        containerDiv.style.background = 'blue';
    }else{
        containerDiv.style.backgroundImage = `url(${dataGif.data.images.original.url})`
    }
};

function changeUnits(data){

    let unit = 'celsius'
    convertionButton.addEventListener('click',() =>{
        if (unit === 'celsius'){
            unit = 'fahrenheit';
            renderData(data,unit);
            convertionButton.textContent = '°C'
        }else{
            unit = 'celsius';
            renderData(data,unit)
            convertionButton.textContent = '°F'
        };
    });
};


// RENDER WHEATHER DATA //
function renderData(data,unit = 'celsius'){

    // RESET DOM //
    dataContentDiv.innerHTML = '';
    iconContentDiv.innerHTML = '';
    tmpContentDiv.innerHTML = '';
    nexdaysDiv.innerHTML = '';
    hourDiv.innerHTML ='';

    // Icon //
    const icon = document.createElement('img')
    icon.src = iconMap[`${data.currentConditions.icon}`]
    const iconDescription = document.createElement('span');
    iconDescription.textContent = data.currentConditions.icon

     // Append to icon content
    iconContentDiv.appendChild(icon);
    iconContentDiv.appendChild(iconDescription);

    //Tmp Content //
    // Name
    const cityName = document.createElement('h2');
    cityName.textContent = data.address;

    // Date //
    const currentDate = document.createElement('p')
    currentDate.textContent = `Day: ${getDayName(data.days[0].datetime)}`

    // Temperature
    const cityTemperature = document.createElement('p');
    let cityTemperatureValue;
    if(unit === 'fahrenheit'){
        cityTemperatureValue = `Temp: ${Math.round(data.currentConditions.temp)}°F`;
    }else{
        cityTemperatureValue = `Temp: ${fahrenheitToCelsius(data.currentConditions.temp)}°C`;
    }
    cityTemperature.textContent = cityTemperatureValue;

    // min and max temperature
    const minMaxTemperature = document.createElement('p');
    if (unit === 'fahrenheit'){
        minMaxTemperature.textContent = `Low: ${Math.round(data.days[0].tempmin)}°F/High: ${Math.round(data.days[0].tempmax)}°F`
    }else{
        minMaxTemperature.textContent = `Low: ${fahrenheitToCelsius(data.days[0].tempmin)}°C/High: ${fahrenheitToCelsius(data.days[0].tempmax)}°C`
    }

    // Temperature Conditions
    const temperatureConditions = document.createElement('p');
    temperatureConditions.textContent = `Conditions: ${data.currentConditions.conditions}`;

    // Append to tmp content
    tmpContentDiv.appendChild(cityName);
    tmpContentDiv.appendChild(currentDate);
    tmpContentDiv.appendChild(cityTemperature);
    tmpContentDiv.appendChild(minMaxTemperature);
    tmpContentDiv.appendChild(temperatureConditions);

    // Append to Data Content //
    dataContentDiv.appendChild(iconContentDiv);
    dataContentDiv.appendChild(tmpContentDiv);

    // NEXT DAYS Weather //
    // Button //
    const nextDaysButton = document.createElement('span');
    nextDaysButton.classList.add('next-days-span');
    nextDaysButton.innerText = 'Next Days';
    // DaysBox //
    const daysbigBox = document.createElement('div');
    daysbigBox.classList.add('days-big-box')


    //days
    data.days.slice(1,6).forEach((day)=>{
        const nextDay = new DaysObject(daysbigBox,day,iconMap,unit);
        nextDay.render();
    });

    // Append to DaysDiv //
    nexdaysDiv.appendChild(nextDaysButton);
    nexdaysDiv.appendChild(daysbigBox);
    // Apped to Data Content //
    dataContentDiv.appendChild(nexdaysDiv);



    // WEATHER BY HOUR BOXES //
    function renderHours(todayHours,unit = 'celsius'){
        todayHours.forEach((dataHour) => {
            const hourObject = new WeatherHourBox(hourDiv,dataHour,iconMap,unit)
            hourObject.render();
        });
    };
    // Get next hour //
    let nextHour = data.currentConditions.datetime.slice(0,2);
    nextHour = Number(nextHour) + 1;
    // hoursData varialbes
    const todayHours = data.days[0].hours.slice(nextHour);
    const tomorrowHours = data.days[1].hours;

    if (unit === 'fahrenheit'){
        renderHours(todayHours,'fahrenheit');
    }else{
        renderHours(todayHours);
    }

    // Separetor //
    const separator = document.createElement('div');
    separator.textContent = 'Tomorrow';
    separator.classList.add('day-separator');
    hourDiv.appendChild(separator);

    if (unit === 'fahrenheit'){
        renderHours(tomorrowHours,'fahrenheit');
    }else{
        renderHours(tomorrowHours);
    }
};

export {renderData, renderGif, changeUnits}
