class meteoapi {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
        this.url = "https://api.open-meteo.com/v1/forecast?";
        this.parameters = {
            "latitude" : 0, 
            "longitude" : 0,
            "current" : "temperature_2m,wind_speed_10m&",
            "hourly" : "temperature_2m,relative_humidity_2m,wind_speed_10m",
            "timezone" : "auto"
        } ;
        
    }
    getForecast(city) {
        this.parameters.latitude = city.latitude;
        this.parameters.longitude = city.longitude;
        
        for (let key in this.parameters) {
            this.url = this.url + key + "=" + this.parameters [key] + "&";
        }

        fetch(this.url).then(response => {
            return response.json();
        }).then(data => {
            this.displayForecast(data, city.name);
            console.log(data);
        })

        const newDiv = document.createElement("div");
        newDiv.classList.add("cities");
        document.body.appendChild(newDiv);
    }

    displayForecast(data, cityname) {
        var citylabel = document.getElementById("city_Label");
        var citytemp = document.getElementById("city_temperatur");

        console.log(citylabel)
        citylabel.innerHTML = `<h1>${cityname}</h1>`;
        citytemp.innerHTML = `<h2>${data.current.temperature_2m} C°</h2>`;

        var maintable = document.getElementsByClassName("pragnoz-table") [0];
        var tempsum = 0;
        
        for (var i = 0; i < data.hourly.temperature_2m.length; i++) {

             tempsum = tempsum + data.hourly.temperature_2m[i];

            if(i % 6 == 0) { 

                let newDiv = document.createElement("div");
                let newContainer = document.createElement("div");
                let newTimeDiv = document.createElement("div");

                newContainer.className = "box";
                newDiv.className = "temp";
                newTimeDiv.className = "time";

                let timeStr = data.hourly.time[i];

                tempsum = tempsum / 6;
                newDiv.innerHTML = `<h3>${tempsum.toFixed(1)} C°</h3>`
                newTimeDiv.innerHTML = this.formatDateString(timeStr);
                

                newContainer.appendChild(newTimeDiv);
                newContainer.appendChild(newDiv);
                maintable.appendChild(newContainer);

                tempsum = 0;
            } 
        }
        
    }

    formatDateString(dateString) {
        const date = new Date (dateString);
        const day = date.getDate();
        const month = date.getMonth();
        var monthNames = ["янв.", "фев.", "мар.", "апр.", "май", "июнь", "июль", "авг.", "сен.", "окт.", "ноя.", "дек."];
        const monthText = monthNames[month];

        var hour = date.getHours();
        if(hour == 0)
            hour = 24;
        console.log(hour)

        var resultHour;
        if(hour >= 6 && hour < 12)
            resultHour = "утро";
        
        if(hour >= 12 && hour < 18)
            resultHour = "день";

        if(hour >= 18 && hour < 24)
            resultHour = "вечер";

        if(hour == 24 || hour < 6)
            resultHour = "ночь";

        return `${day} ${monthText} ${resultHour}`;
    }
}



// оставь каментарии