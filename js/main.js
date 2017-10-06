$(document).ready(function() {





// retrieve user's geo location
if (navigator.geolocation) {
  
  navigator.geolocation.getCurrentPosition(function(position) {
  	var lat = position.coords.latitude;
  	var lon = position.coords.longitude;

    // setup ajax connection to free code camp's weather API and retrieve weather
	getWeather(lat, lon);
	
  });
  	
  	
	
}	// notify user that weather cannot be retrieved
else {
	$('.location').html('error: unable to determine your location for retrieving weather');
}

function getWeather(lat, lon) {
	var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon;
	$.getJSON(url, function(json) {

		// retrieve city
		var location = json.name;
		location += ", " + json.sys.country;

		// output city to web page
		$('.location').html(location);

		// retrieve celsius temperature
		var tempC = json.main.temp;

		// convert to fahrenheit
		var tempF = Math.round(tempC * 1.8 + 32);
		
		// output temp to web page
		degreeSymbol = String.fromCharCode(176);
		$('.temperature').html(tempF + ' ' + degreeSymbol + '<span class="fahrenhiet">F</span>');
	
		// setup event handler to convert fahrenhiet to celsius
		$('.temperature').on('click', '.fahrenhiet', function() {
  			$('.temperature').html(tempC + ' ' + degreeSymbol + '<span class="celsius">C</span>');
		});

		// setup event handler to convert fahrenhiet to celsius
		$('.temperature').on('click', '.celsius', function() {
			$('.temperature').html(tempF + ' ' + degreeSymbol + '<span class="fahrenhiet">F</span>');
		});

		//retrieve weather condition (e.g. Cloudy)
		var condition = json.weather[0].main;

		// output condition to web page
		$('.condition').html(condition);	

		// retrieve weather icon
		var icon = json.weather[0].icon;

		// output icon to web page
		$('.icon').html('<img src="' + icon + '" alt="' + condition + 'icon ">');

	    // failure callback function, notify user of error retrieving data from server
	    }).fail(function( jqxhr, textStatus, error ) {
	    		var err = textStatus + ", " + error;
	    		$('.temperature').html( 'OOPS! unable to retrieve data due to error: ' + err + '. Please try your request again later.');
			});
}


});	