// Function below waits for entire page to load before displaying
$(function () {

  // My API key made into a variable
  var apiKey = "705ad1e9f99bbb933fb4e2da5d5a4e09";

  // Function to send AJAX request and post it to weather card
  function cityWeather(city) {
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;


    // Searches current weather from Open Weather API
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;

    // AJAX request to Open Weather API
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (data) {

      https://api.openweathermap.org/data/2.5/uvi?lat=47.61&lon=-122.33&appid=69f200b9e911acf86732762db74cef27
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // create url for uv index query
      var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?";
      uvQueryUrl += "lat=" + lat;
      uvQueryUrl += "&lon=" + lon;
      uvQueryUrl += "&appid=" + apiKey;

      //AJAX request to retrieve UV index
      $.ajax({
        url: uvQueryUrl,
        method: "GET",
      }).then(function (uvData) {

        // Converts UV index to text
        $("#uv-index").text(uvData.value);
      });


      // Sets text of city name in the H2 element
      $("#city-name").text(data.name + " Weather");

      // Weather Icon Url
      var iconUrl =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

      // Creates IMG element and sets the src and alt attribute
      var iconImg = $("<img>").attr({
        src: iconUrl,
        alt: data.weather[0].description,
      });

      $("#weather-image").empty().append(iconImg);


      $("#temp").text(data.main.temp + "°");
      $("#wind").text(data.wind.speed + " mph");
      $("#humidity").text(data.main.humidity + " %");



    });
  }

  $(document).on("click", ".city", function () {
    // Retrieves name of city using data-city attribute
    var city = $(this).attr("data-city");

    cityWeather(city);
  });

  // Search form event listener
  $("#search-form").on("submit", function (event) {
    event.preventDefault();

  // Stores value and removes whitespace
    var city = $("#search-input").val().trim();

    // Nothing happens if city value isn't valid
    if (city === "") {
      return;
    }

    
    cityWeather(city);
  });
});