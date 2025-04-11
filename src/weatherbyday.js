import { fahrenheitToCelsius, getDayName } from "./functions.js";

class DaysObject{


    constructor(box,data,iconMap,unit){
        this.box = box;
        this.data = data;
        this.iconMap = iconMap;
        this.unit = unit;

    };

    render(){

        const dayBox = document.createElement('div');
        dayBox.classList.add('days-box-little');

        const dateTime = document.createElement('p');
        dateTime.textContent = getDayName(this.data.datetime)

        const img = document.createElement('img');
        img.src = this.iconMap[`${this.data.icon}`];

        const condition =document.createElement('p');
        condition.textContent = this.data.conditions

        const tmp = document.createElement('p');
        if(this.unit === 'fahrenheit'){
            tmp.textContent = `Low:${Math.round(this.data.tempmin)}°F/High:${Math.round(this.data.tempmax)}°F`;
        }else{
            tmp.textContent = `Low:${fahrenheitToCelsius(this.data.tempmin)}°C/High:${fahrenheitToCelsius(this.data.tempmax)}°C`;
        }


        // Append to dayBox //
        dayBox.appendChild(dateTime)
        dayBox.appendChild(img)
        dayBox.appendChild(condition)
        dayBox.appendChild(tmp)

        // Append to Box //
        this.box.appendChild(dayBox)

    };
};

export { DaysObject }
