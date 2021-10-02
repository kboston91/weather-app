var forecastDiv = document.querySelector(".five-day");


$("#search-button").on("click", function () {
  var searchValue = $("#city-search").val();
  console.log(searchValue);

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

    
    renderHistory();
});

function renderHistory() {
  // Retrieve the last email and password from localStorage using `getItem()`
  var city = localStorage.getItem('city');
  

  // If they are null, return early from this function
  if (city === null) {
    return;
  }

  // Set the text of the 'userEmailSpan' and 'userPasswordSpan' to the corresponding values from localStorage
  history.textContent = city;
  
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
    let iconImg = $(`<img id="icon" src="" alt="weather icon">`);
    $('#icon').attr('src', iconUrl);
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

      currentFunction(data.current);
      //after this we render the current weather and forecast.
    });
};

localStorage.setItem('city', searchValue);

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
