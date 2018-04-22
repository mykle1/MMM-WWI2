/* Magic Mirror
 * Module: MMM-WWI2
 * Weather Without Icons 2 (If CBD can do it, so can I hahahaha)
 * By Mykle1 - [Powered by Dark Sky](https://darksky.net/poweredby/)
 * MIT Licensed
 */
Module.register("MMM-WWI2", {

    // Module config defaults.
    defaults: {
		apiKey: "",                               // Get FREE API key from https://darksky.net
        lat: "",                                  // latitude
        lng: "",                                  // longitude
		tempUnits: "C",		                      // C and km or F and miles 
        useHeader: false,                         // true if you want a header      
        header: "Weather Without Icons",          // Any text you want. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 5 * 60 * 1000,           // 2 minutes is the least you can use for free

    },

    getStyles: function() {
        return ["MMM-WWI2.css"];
    },

    getScripts: function() {
        return ["moment.js"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);


        //  Set locale.
        this.url = "https://api.darksky.net/forecast/" + this.config.apiKey + "/" + this.config.lat + "," + this.config.lng;
        this.WWI = {};
        this.scheduleUpdate();
    },

    getDom: function() {
		
		
		function to_celcius (t) {
		 	return (t - 32) * 5 / 9;              // convert celcius to fahrenheit
		 }

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Not that WWI 2!";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

        var WWI = this.WWI;
		var apiKey = this.config.apiKey;
        var lat = this.config.lat; // latitude
        var lng = this.config.lng; // longitude
		var pix = this.config.pix; // 1-13


        var top = document.createElement("div");
        top.classList.add("list-row");
	
		// summary of weather at this moment
        var summary = document.createElement("div");
        summary.classList.add("small", "bright", "summary");
  		
	if (this.config.tempUnits != "F") {
			summary.innerHTML =
                
                '<marquee behavior="scroll" direction="left" scrollamount="5">'
                + WWI.currently.summary + " and " 
                + Math.round(to_celcius(WWI.currently.temperature)) + "°C at " 
                + moment(WWI.time).local().format("h:mm A") + ". &nbsp "
                + " Feels like = " +  Math.round(to_celcius(WWI.currently.apparentTemperature)) + "°C. &nbsp "
                + " " + WWI.minutely.summary + ". &nbsp"
                + " " + WWI.daily.summary + ". &nbsp"
                + " " + "Ground-Level Ozone is " + Math.round(WWI.currently.ozone) + ". &nbsp"
                + " " + "Wind speed is " + Math.round(WWI.currently.windSpeed * 1.609344) + " km/h" + ". &nbsp"
                + " " + "Wind gusts to " + Math.round(WWI.currently.windGust * 1.609344) + " km/h" + ". &nbsp"
                + " " + "Wind bearing is " + WWI.currently.windBearing + "°" + ". &nbsp"
                + " " + "Visibility is " + Math.round(WWI.currently.visibility  * 1.609344) + " km" + ". &nbsp"
                + " " + "Cloud cover is " + WWI.currently.cloudCover + "%" + ". &nbsp"
                + " " + "Humidity is " + WWI.currently.humidity + "%" + ". &nbsp"
                + " " + "Dew point is " + Math.round(to_celcius(WWI.currently.dewPoint)) + "°C" + ". &nbsp"
                + " " + "Barometer = " + Math.round(WWI.currently.pressure) + " mb" + ". &nbsp"
                + " " + "UV Index is " + WWI.currently.uvIndex + ". "
                +'</marquee>';
        
			wrapper.appendChild(summary);
        
		} else {
            
            summary.innerHTML =
                
                '<marquee behavior="scroll" direction="left" scrollamount="3">'
                + WWI.currently.summary + " right now"
                + " and " + Math.round(WWI.currently.temperature) 
                + "°F at " + moment(WWI.time).local().format("h:mm A") + " . &nbsp "
                + " Feels like " +  Math.round(WWI.currently.apparentTemperature) + "°F. &nbsp "
                + " " + WWI.minutely.summary + " . &nbsp "
                + " " + WWI.daily.summary + " . &nbsp "
                + " " + "Ground-Level Ozone is " + Math.round(WWI.currently.ozone) + " . &nbsp "
                + " " + "Wind speed is " + Math.round(WWI.currently.windSpeed) + " mph. &nbsp "
                + " " + "Wind gusts to " + Math.round(WWI.currently.windGust) + " mph. &nbsp "
                + " " + "Wind bearing is " + WWI.currently.windBearing + "°. &nbsp "
                + " " + "Visibility is " + WWI.currently.visibility + " miles. &nbsp "
                + " " + "Cloud cover is " + WWI.currently.cloudCover + "%. &nbsp "
                + " " + "Humidity is " + WWI.currently.humidity + "%. &nbsp "
                + " " + "Dew point is " + Math.round(WWI.currently.dewPoint) + "°F. &nbsp "
                + " " + "Barometer = " + Math.round(WWI.currently.pressure) + "mb. &nbsp "
                + " " + "UV Index is " + WWI.currently.uvIndex + ". &nbsp "
                +'</marquee>';
            
			wrapper.appendChild(summary);
		}
	
        return wrapper;
		
    },
	

    processWWI: function(data) {
        this.today = data.Today;
        this.WWI = data;
        this.loaded = true;
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getWWI();
        }, this.config.updateInterval);
        this.getWWI(this.config.initialLoadDelay);
    },

    getWWI: function() {
        this.sendSocketNotification('GET_WWI', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "WWI_RESULT") {
            this.processWWI(payload);

            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});