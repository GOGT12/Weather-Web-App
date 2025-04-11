import { fahrenheitToCelsius } from "./functions.js";


class WeatherHourBox{


    constructor(box,data,iconMap,unit){
        this.box = box;
        this.data = data;
        this.iconMap = iconMap;
        this.unit = unit;
    }

    render(){

        const hourBox = document.createElement('div');
        hourBox.classList.add('hour-box-little')

        const time = document.createElement('p');
        const formatedHour = this.data.datetime.slice(0,5);
        time.textContent = formatedHour;

        const img = document.createElement('img');
        img.src = this.iconMap[`${this.data.icon}`];

        const temperature = document.createElement('p');
        let temperatureValue;
        if(this.unit === 'fahrenheit'){
            temperatureValue = `${Math.round(this.data.temp)}°F`
        }else{
            temperatureValue = `${fahrenheitToCelsius(this.data.temp)}°C`;
        }
        temperature.textContent = temperatureValue;

        // Append to hourBox//
        hourBox.appendChild(time);
        hourBox.appendChild(img);
        hourBox.appendChild(temperature);

        // Append to Box//
        this.box.appendChild(hourBox);
    };

};

export {WeatherHourBox}
