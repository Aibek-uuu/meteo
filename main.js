var arrCity = [];
arrCity.push(new city("Bishkek", 42.882004, 74.582748))
arrCity.push(new city("Balykchy", 42.28, 76.11))
var mapi = new meteoapi();


var select = document.getElementById("cities");
var btnforecast = document.getElementById("btnforecast");

for (var i = 0; i < arrCity.length; i++) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = arrCity[i].name;
    select.appendChild(opt);
}

//слушатель

btnforecast.addEventListener("click", () => {
    var selectedValue = select.value
    console.log(selectedValue)
    
    mapi.getForecast(arrCity[selectedValue]);
}
)

