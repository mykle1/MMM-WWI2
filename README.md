## MMM-WWI2

**Weather Without Icons 2**

## Same as WWI but . . .

I just didn't feel like making WWI display both ways.
So this is designed for top or bottom bar position.

## Why would you use this module?

* It uses the minimum amount of screen real estate yet it gives you full weather conditions and forecast.
* You hate icons.
* I begged you. **:^)**

## The information 

* Current conditions, temperature and time
* Conditions for the next hour
* A summary for the next 7 days
* Pictures of lightning events (1-13) if you want them
* Heat index/Wind chill temperature at this moment
* Nearest storm/weather event at this moment
* Bearing of the nearest storm/weather event at this moment
* Wind speed for your location at this moment
* Wind gusts speed for your location at this moment
* Wind bearing at this moment
* Visibility (in miles) at this moment
* Cloud cover at this moment
* Barometer reading at this moment (in millibars)
* Humidity at this moment
* DewPoint reading at this moment
* UV Index reading at this moment

## Examples

No picture. Just imagine a thin line of text in your top or bottom bar.

Or better yet, take a minute and install it. :-)

## Installation and requirements

* `git clone https://github.com/mykle1/MMM-WWI2` into the `~/MagicMirror/modules` directory.

* Free API key at `https://darksky.net/dev/register` using just your email.

* No dependencies needed! No kidding!


## Config.js entry and options

    {
		disabled: false,
		module: "MMM-WWI",
		position: "top_bar",                  // top_bar or bottom_bar
		config: {
			apiKey: "YOUR API KEY GOES HERE", // Free API key @ https://darksky.net
			lat: "YOUR LATITUDE GOES HERE",   // Your latitude goes here
			lng: "YOUR LONGITUDE GOES HERE",  // Your longitude goes here
			tempUnits: "C",		              // C and km or F and miles
			useHeader: false,                 // true if you want a header                 
			header: "Weather Without Icons",
			maxWidth: "100%",
		}
	},
	
## If you want icons

```
	var messageToYou = document.createElement("div");
	messageToYou.classList.add("U.R.xsmall", "notTooBright", "uglyToo");
if (you.want.icons && a.module.by.a.genius) {
	messageToYou.innerHTML = "Install MMM-NOAA instead";
}
	wrapper.appendChild(messageToYou);
```

## [Powered by Dark Sky](https://darksky.net/poweredby/)
