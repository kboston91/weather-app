// var forecastDiv = document.querySelector(".five-day");
var cityHistory = JSON.parse(localStorage.getItem("city")) || [];
var citiesEl = document.querySelector("#history");
var currentDiv = document.querySelector("#current-weather")
// get history div

$("#search-button").on("click", function () {
  var searchValue = $("#city-search").val();
  console.log(searchValue);
  if (!cityHistory.includes(searchValue)){
    cityHistory.push(searchValue);
    localStorage.setItem("city", JSON.stringify(cityHistory));
    
  };

  $("#five-day").html("");
  $("current-weather").html("");

  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=ab19f30213045455e1ed3db1fcc7e2c1`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      fetchWeather(data[0]);
    });

    
    renderHistory(searchValue);
});

// var loadCityHistory = function () {
//   citiesEl.innerHTML = "";
//   for (let i = 0; i < cityHistory.length; i++) {
//     var historyItem = document.createElement("a");
//     // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
//     historyItem.setAttribute("class", );
//     historyItem.setAttribute("id", "past-city");
//     historyItem.innerText = cityHistory[i];
//     var recent = cityHistory[i];
//     console.log(recent);
//     citiesEl.append(historyItem);
//   }
// };

function renderHistory() {
  // Retrieve the last email and password from localStorage using `getItem()`
 
  // citiesEl.innerHTML = "";

  // // If they are null, return early from this function
  // if (cityHistory.length > 0) {
  //   // either loop through array
  //     for(let i=0; i<cityHistory.length; i++) {
  //       return cityHistory[i]

        
  //     }
  //   // or display array as it
    

  //   // modify text content of div to show caityHistory
  //   var citiesEl = document.querySelector("#history");
    

  citiesEl.innerHTML = "";
  for (let i = 0; i < cityHistory.length; i++) {
    var historyItem = document.createElement("div");
    historyItem.setAttribute("class", "col my-1 bg-light text-secondary text-capitalize p-0 rounded text-center border");
    historyItem.setAttribute("id", "past-city");
    
    var historyContent = document.createElement("p");
    historyContent.setAttribute("class", "justify-content-center");
    historyItem.innerText = cityHistory[i];
    
    
    historyContent.append(historyItem);
    citiesEl.append(historyContent);
  }


  

  // Set the text of the 'userEmailSpan' and 'userPasswordSpan' to the corresponding values from localStorage
  // history.textContent = city;
  

  
};
console.log(cityHistory);
// renderHistory();

let currentFunction = function(forecastData) {
  colDiv2 = $(`<div id="colDiv2">`).addClass("col my-1 p-1");

    let cardDiv2 = $(`<div id="cardDiv2">`)
      .addClass("card border col bg-secondary")
      .css({ height: "200px" });

    let cardBody2 = $(`<div id="cardBody2">`).addClass("card-body justify-content-center py-2");

    let cardTitle2 = $(`<div id="cardTitle2">`).addClass("card-title");

    // let cardImage = $(`div id="cardImage">`).addClass("card-image");

    var d = new Date(forecastData[i].dt * 1000); // The 0 there is the key, which sets the date to the epoch
    // let dateTime = d.setUTCSeconds(forecastData[i].dt);
    console.log(d);

    cardTitle2.text((d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear());
    let cardTemp2 = $(`<div id="cardTemp2">`).addClass("card-temp");
    cardTemp2.text("Temp:" + forecastData[i].temp.max + "°F");

    let cardIcon2 = $(`<div id="cardIcon2">`).addClass("card-icon");
    cardIcon2.val(forecastData[i].weather[0].icon);

    var iconCode = forecastData[i].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log('iconurl', iconUrl);
    let iconImg = $(`<img id="icon-${i}" src="${iconUrl}" alt="weather icon">`);
    // $(`#icon-${i}`).attr('src', iconUrl);
    console.log(iconImg);
    // document.querySelector('#icon'+i).setAttribute('src', iconUrl);

    let cardWind2 = $(`<div id="cardWind2">`).addClass("card-wind");
    cardWind2.text("Wind:" + forecastData[i].wind_speed);

    let cardHumidity2 = $(`<div id="cardHumidity2">`).addClass("card-humidity");
    cardHumidity2.text("Humidity:" + forecastData[i].humidity);

    let cardUV2 = $(`<div id="cardUV2">`).addClass("card-uv");
    cardUV2.text("UV Index:" + forecastData[i].uvi);
    // let eventImageEl = $(`<img id="eventImg-5">`).addClass('card-img');
    // eventImageEl.attr('src', eventImgUrl);
    cardBody2.append(cardTitle2);
    cardIcon2.append(iconImg);
    cardBody2.append(cardIcon2);
    cardBody2.append(cardTemp);
    cardBody2.append(cardWind2);
    cardBody2.append(cardHumidity2);
    cardBody2.append(cardUV2);

    cardDiv2.append(cardBody2);

    colDiv2.append(cardDiv2);

    $("#current-weather").append(colDiv2);
};



let forecastFunction = function (forecastData) {
  for (let i = 0; i < 5; i++) {
   
    let colDiv = $(`<div id="colDiv">`).addClass("col my-1 p-1");

    let cardDiv = $(`<div id="cardDiv">`)
      .addClass("card border col bg-secondary")
      .css({ height: "200px" });

    let cardBody = $(`<div id="cardBody">`).addClass("card-body justify-content-center py-2");

    let cardTitle = $(`<div id="cardTitle">`).addClass("card-title");

    // let cardImage = $(`div id="cardImage">`).addClass("card-image");

    var d = new Date(forecastData[i].dt * 1000); // The 0 there is the key, which sets the date to the epoch
    // let dateTime = d.setUTCSeconds(forecastData[i].dt);
    console.log(d);

    cardTitle.text((d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear());
    let cardTemp = $(`<div id="cardTemp">`).addClass("card-temp");
    cardTemp.text("Temp:" + forecastData[i].temp.max + "°F");

    let cardIcon = $(`<div id="cardIcon">`).addClass("card-icon");
    cardIcon.val(forecastData[i].weather[0].icon);

    var iconCode = forecastData[i].weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log('iconurl', iconUrl);
    let iconImg = $(`<img id="icon-${i}" src="${iconUrl}" alt="weather icon">`);
    // $(`#icon-${i}`).attr('src', iconUrl);
    console.log(iconImg);
    // document.querySelector('#icon'+i).setAttribute('src', iconUrl);

    let cardWind = $(`<div id="cardWind">`).addClass("card-wind");
    cardWind.text("Wind:" + forecastData[i].wind_speed);

    let cardHumidity = $(`<div id="cardHumidity">`).addClass("card-humidity");
    cardHumidity.text("Humidity:" + forecastData[i].humidity);

    let cardUV = $(`<div id="cardUV">`).addClass("card-uv");
    cardUV.text("UV Index:" + forecastData[i].uvi);
    // let eventImageEl = $(`<img id="eventImg-5">`).addClass('card-img');
    // eventImageEl.attr('src', eventImgUrl);
    cardBody.append(cardTitle);
    cardIcon.append(iconImg);
    cardBody.append(cardIcon);
    cardBody.append(cardTemp);
    cardBody.append(cardWind);
    cardBody.append(cardHumidity);
    cardBody.append(cardUV);

    cardDiv.append(cardBody);

    colDiv.append(cardDiv);

    $("#five-day").append(colDiv);
    
  }
  
};

//main card container

var fetchWeather = function (location) {
  var { lat, lon } = location;
  var city = location.name;
  console.log(arguments);

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=ab19f30213045455e1ed3db1fcc7e2c1`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weather", data);

      forecastFunction(data.daily);

      currentFunction(data);
      //after this we render the current weather and forecast.
    });
};


currentFunction();
// create renderweather function

// let renderWeather = function (currentData) {
//   console.log(currentData);
// }
// renderweather();
// inside the ;function, create a card that displays the city, current date, and weather icon
// display the temp wind humidity and uv index with dynamic color changing based on uv index


//create renderforecast function
//inside the function, create forloop to dynamically create bootstrap cards
// each card needs these elements in this order
//first div is bootstrap column
// second div is card
//third div is card-body
// inside card-body h5 tag to display the date
//image tag to display icon
//p tags display temp, wind, and humidity
// appendchild to html
