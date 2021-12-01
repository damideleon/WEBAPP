var pronostico_data = {};

		Handlebars.registerHelper("dia", function(unix) {
			var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
			var d = new Date(unix * 1000);
			return dias[d.getDay()] + " " + d.getDate();
		});

		Handlebars.registerHelper("temperatura", function(k) {
			return Math.round(k - 273.15);
		});

		function pronostico(info){
			//info = info.daily.splice(0, 1);
			pronostico_data = info
			let source = document.getElementById("t-pronostico").innerHTML;
            let html = Handlebars.compile(source);
			let ahora = document.getElementById("t-ahora").innerHTML;
			let ahoraHMTL = Handlebars.compile(ahora)
            document.getElementById("info-pronostico").innerHTML = html(info);
			document.getElementById("ahora").innerHTML = ahoraHMTL(info);
			drawChart(parseData(pronostico_data));
		}

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				pronostico(JSON.parse(this.responseText));
			}
		};

		const url =  "https://api.openweathermap.org/data/2.5/onecall?lat=-25.30066&lon=-57.63591&exclude=minutely&lang=es&appid=f497ad49d905eec750c1c273a9ae8351"
		xhttp.open("GET", url, true)
		xhttp.send();

		var parseData = (data)=>{
			var arr = [];
			for (var i in data.hourly){
				var dia = new Date(data.hourly[i].dt * 1000).getDate();
				var hoy = new Date().getDate();
					if(dia == hoy){
						arr.push({
						date: new Date(data.hourly[i].dt * 1000), //date
						value: Math.round(data.hourly[i].temp - 275.15) //convert string to number
					});
				}
				
			}
			return arr;
		}

		function drawChart(data){
			var svgWidth = 550, svgHeight = 150;
			var margin = { top: 20, right: 20, bottom: 30, left: 50 };
			var width = svgWidth - margin.left - margin.right;
			var height = svgHeight - margin.top - margin.bottom;

			var svg = d3.select('svg').attr("width", svgWidth).attr("height", svgHeight);
			var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			var x = d3.scaleTime().ticks(5).rangeRound([0, width]);
			var y = d3.scaleLinear().ticks(2).rangeRound([height, 0]);
			
			var line = d3.line()
				.x(function(d){return x(d.date)})
				.y(function(d){return y(d.value)});

			x.domain(d3.extent(data, function(d){return d.date }));
			y.domain(d3.extent(data, function(d){return d.value }));

			g.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x))
			
			g.append("g")
				.attr("class", "axisWhite")
				.call(d3.axisLeft(y))
				.append("text")
				.attr("fill", "#000")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.text("Temperatura ºC");

			g.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "steelblue")
				.attr("stroke-linejoin", "round")
				.attr("stroke-linecap", "round")
				.attr("stroke-width", 3)
				.attr("d", line);
		};


var p = {
  "lat": -25.3007,
  "lon": -57.6359,
  "timezone": "America/Asuncion",
  "timezone_offset": -10800,
  "current": {
    "dt": 1636108250,
    "sunrise": 1636102774,
    "sunset": 1636150122,
    "temp": 300.84,
    "feels_like": 302.25,
    "pressure": 1007,
    "humidity": 61,
    "dew_point": 292.64,
    "uvi": 0.74,
    "clouds": 40,
    "visibility": 10000,
    "wind_speed": 3.09,
    "wind_deg": 60,
    "weather": [
      {
        "id": 802,
        "main": "Clouds",
        "description": "nubes dispersas",
        "icon": "03d"
      }
    ]
  },
  "hourly": [
    {
      "dt": 1636106400,
      "temp": 300.47,
      "feels_like": 301.9,
      "pressure": 1007,
      "humidity": 63,
      "dew_point": 292.81,
      "uvi": 0.14,
      "clouds": 49,
      "visibility": 10000,
      "wind_speed": 2.82,
      "wind_deg": 26,
      "wind_gust": 9.56,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "nubes dispersas",
          "icon": "03d"
        }
      ],
      "pop": 0.04
    },
    {
      "dt": 1636110000,
      "temp": 300.84,
      "feels_like": 302.25,
      "pressure": 1007,
      "humidity": 61,
      "dew_point": 292.64,
      "uvi": 0.74,
      "clouds": 40,
      "visibility": 10000,
      "wind_speed": 3.79,
      "wind_deg": 359,
      "wind_gust": 9,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "lluvia moderada",
          "icon": "10d"
        }
      ],
      "pop": 0.28,
      "rain": {
        "1h": 3.16
      }
    },
    {
      "dt": 1636113600,
      "temp": 301.48,
      "feels_like": 302.85,
      "pressure": 1007,
      "humidity": 58,
      "dew_point": 292.43,
      "uvi": 2.03,
      "clouds": 48,
      "visibility": 10000,
      "wind_speed": 3.11,
      "wind_deg": 327,
      "wind_gust": 6.64,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "lluvia moderada",
          "icon": "10d"
        }
      ],
      "pop": 0.26,
      "rain": {
        "1h": 1.15
      }
    },
    {
      "dt": 1636117200,
      "temp": 301.92,
      "feels_like": 303.38,
      "pressure": 1008,
      "humidity": 57,
      "dew_point": 292.56,
      "uvi": 4.43,
      "clouds": 60,
      "visibility": 10000,
      "wind_speed": 2.45,
      "wind_deg": 330,
      "wind_gust": 4.68,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "muy nuboso",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636120800,
      "temp": 302.44,
      "feels_like": 303.89,
      "pressure": 1008,
      "humidity": 55,
      "dew_point": 292.47,
      "uvi": 6.65,
      "clouds": 72,
      "visibility": 10000,
      "wind_speed": 2.77,
      "wind_deg": 304,
      "wind_gust": 5.07,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "muy nuboso",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636124400,
      "temp": 303.53,
      "feels_like": 305.13,
      "pressure": 1009,
      "humidity": 52,
      "dew_point": 292.57,
      "uvi": 8.28,
      "clouds": 85,
      "visibility": 10000,
      "wind_speed": 1.95,
      "wind_deg": 301,
      "wind_gust": 3.53,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636128000,
      "temp": 305.33,
      "feels_like": 306.91,
      "pressure": 1008,
      "humidity": 46,
      "dew_point": 292.55,
      "uvi": 11.4,
      "clouds": 96,
      "visibility": 10000,
      "wind_speed": 2.2,
      "wind_deg": 287,
      "wind_gust": 3.57,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636131600,
      "temp": 306.54,
      "feels_like": 308.28,
      "pressure": 1008,
      "humidity": 43,
      "dew_point": 292.5,
      "uvi": 10.33,
      "clouds": 97,
      "visibility": 10000,
      "wind_speed": 3.35,
      "wind_deg": 260,
      "wind_gust": 4.05,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636135200,
      "temp": 306.37,
      "feels_like": 307.99,
      "pressure": 1006,
      "humidity": 43,
      "dew_point": 292.46,
      "uvi": 7.94,
      "clouds": 98,
      "visibility": 10000,
      "wind_speed": 3.41,
      "wind_deg": 216,
      "wind_gust": 3.47,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.08
    },
    {
      "dt": 1636138800,
      "temp": 307.25,
      "feels_like": 309.02,
      "pressure": 1004,
      "humidity": 41,
      "dew_point": 292.47,
      "uvi": 4.23,
      "clouds": 97,
      "visibility": 10000,
      "wind_speed": 3.01,
      "wind_deg": 228,
      "wind_gust": 2.64,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.24
    },
    {
      "dt": 1636142400,
      "temp": 299.73,
      "feels_like": 299.73,
      "pressure": 1007,
      "humidity": 77,
      "dew_point": 295.01,
      "uvi": 2.04,
      "clouds": 94,
      "visibility": 6881,
      "wind_speed": 7.45,
      "wind_deg": 252,
      "wind_gust": 10.24,
      "weather": [
        {
          "id": 502,
          "main": "Rain",
          "description": "lluvia de gran intensidad",
          "icon": "10d"
        }
      ],
      "pop": 0.5,
      "rain": {
        "1h": 4.74
      }
    },
    {
      "dt": 1636146000,
      "temp": 296.62,
      "feels_like": 297.5,
      "pressure": 1008,
      "humidity": 95,
      "dew_point": 295.9,
      "uvi": 0.65,
      "clouds": 96,
      "visibility": 10000,
      "wind_speed": 4.93,
      "wind_deg": 222,
      "wind_gust": 9.32,
      "weather": [
        {
          "id": 502,
          "main": "Rain",
          "description": "lluvia de gran intensidad",
          "icon": "10d"
        }
      ],
      "pop": 0.9,
      "rain": {
        "1h": 8.77
      }
    },
    {
      "dt": 1636149600,
      "temp": 294.94,
      "feels_like": 295.63,
      "pressure": 1009,
      "humidity": 94,
      "dew_point": 294.12,
      "uvi": 0.11,
      "clouds": 97,
      "visibility": 10000,
      "wind_speed": 4.94,
      "wind_deg": 249,
      "wind_gust": 9.35,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "lluvia moderada",
          "icon": "10d"
        }
      ],
      "pop": 0.98,
      "rain": {
        "1h": 1.3
      }
    },
    {
      "dt": 1636153200,
      "temp": 293.56,
      "feels_like": 294.14,
      "pressure": 1010,
      "humidity": 95,
      "dew_point": 292.86,
      "uvi": 0,
      "clouds": 98,
      "visibility": 10000,
      "wind_speed": 5.41,
      "wind_deg": 225,
      "wind_gust": 10.79,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.78
    },
    {
      "dt": 1636156800,
      "temp": 292.44,
      "feels_like": 292.91,
      "pressure": 1012,
      "humidity": 95,
      "dew_point": 291.78,
      "uvi": 0,
      "clouds": 97,
      "visibility": 10000,
      "wind_speed": 4.61,
      "wind_deg": 212,
      "wind_gust": 11.36,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.77
    },
    {
      "dt": 1636160400,
      "temp": 292.45,
      "feels_like": 292.89,
      "pressure": 1013,
      "humidity": 94,
      "dew_point": 291.72,
      "uvi": 0,
      "clouds": 86,
      "visibility": 10000,
      "wind_speed": 3.41,
      "wind_deg": 223,
      "wind_gust": 8.2,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.14
    },
    {
      "dt": 1636164000,
      "temp": 292.32,
      "feels_like": 292.77,
      "pressure": 1013,
      "humidity": 95,
      "dew_point": 291.63,
      "uvi": 0,
      "clouds": 84,
      "visibility": 10000,
      "wind_speed": 2.99,
      "wind_deg": 224,
      "wind_gust": 6.31,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "muy nuboso",
          "icon": "04n"
        }
      ],
      "pop": 0.08
    },
    {
      "dt": 1636167600,
      "temp": 291.74,
      "feels_like": 292.14,
      "pressure": 1013,
      "humidity": 95,
      "dew_point": 291.16,
      "uvi": 0,
      "clouds": 79,
      "visibility": 10000,
      "wind_speed": 3.17,
      "wind_deg": 239,
      "wind_gust": 5.97,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "muy nuboso",
          "icon": "04n"
        }
      ],
      "pop": 0.19
    },
    {
      "dt": 1636171200,
      "temp": 291.27,
      "feels_like": 291.59,
      "pressure": 1012,
      "humidity": 94,
      "dew_point": 290.53,
      "uvi": 0,
      "clouds": 84,
      "visibility": 10000,
      "wind_speed": 3.68,
      "wind_deg": 238,
      "wind_gust": 6.5,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "muy nuboso",
          "icon": "04n"
        }
      ],
      "pop": 0.17
    },
    {
      "dt": 1636174800,
      "temp": 290.75,
      "feels_like": 291.02,
      "pressure": 1012,
      "humidity": 94,
      "dew_point": 289.92,
      "uvi": 0,
      "clouds": 87,
      "visibility": 10000,
      "wind_speed": 4.16,
      "wind_deg": 236,
      "wind_gust": 7.75,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.17
    },
    {
      "dt": 1636178400,
      "temp": 290.37,
      "feels_like": 290.58,
      "pressure": 1012,
      "humidity": 93,
      "dew_point": 289.47,
      "uvi": 0,
      "clouds": 89,
      "visibility": 10000,
      "wind_speed": 4.02,
      "wind_deg": 238,
      "wind_gust": 8.03,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.21
    },
    {
      "dt": 1636182000,
      "temp": 290.09,
      "feels_like": 290.27,
      "pressure": 1012,
      "humidity": 93,
      "dew_point": 289.19,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.69,
      "wind_deg": 238,
      "wind_gust": 7.67,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.36
    },
    {
      "dt": 1636185600,
      "temp": 290.03,
      "feels_like": 290.2,
      "pressure": 1012,
      "humidity": 93,
      "dew_point": 289.02,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.35,
      "wind_deg": 234,
      "wind_gust": 6.9,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.4
    },
    {
      "dt": 1636189200,
      "temp": 290.1,
      "feels_like": 290.25,
      "pressure": 1013,
      "humidity": 92,
      "dew_point": 289.06,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.31,
      "wind_deg": 241,
      "wind_gust": 6.46,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "lluvia ligera",
          "icon": "10d"
        }
      ],
      "pop": 0.56,
      "rain": {
        "1h": 0.24
      }
    },
    {
      "dt": 1636192800,
      "temp": 290.01,
      "feels_like": 290.15,
      "pressure": 1014,
      "humidity": 92,
      "dew_point": 288.88,
      "uvi": 0.03,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.41,
      "wind_deg": 239,
      "wind_gust": 6.02,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "lluvia ligera",
          "icon": "10d"
        }
      ],
      "pop": 0.56,
      "rain": {
        "1h": 0.2
      }
    },
    {
      "dt": 1636196400,
      "temp": 290.21,
      "feels_like": 290.35,
      "pressure": 1015,
      "humidity": 91,
      "dew_point": 288.96,
      "uvi": 0.16,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.39,
      "wind_deg": 233,
      "wind_gust": 5.53,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "lluvia ligera",
          "icon": "10d"
        }
      ],
      "pop": 0.56,
      "rain": {
        "1h": 0.17
      }
    },
    {
      "dt": 1636200000,
      "temp": 290.51,
      "feels_like": 290.65,
      "pressure": 1015,
      "humidity": 90,
      "dew_point": 289.06,
      "uvi": 0.42,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.34,
      "wind_deg": 232,
      "wind_gust": 5.12,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.53
    },
    {
      "dt": 1636203600,
      "temp": 291.05,
      "feels_like": 291.22,
      "pressure": 1015,
      "humidity": 89,
      "dew_point": 289.32,
      "uvi": 0.78,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.32,
      "wind_deg": 234,
      "wind_gust": 4.67,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.25
    },
    {
      "dt": 1636207200,
      "temp": 291.61,
      "feels_like": 291.76,
      "pressure": 1015,
      "humidity": 86,
      "dew_point": 289.51,
      "uvi": 1.17,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.27,
      "wind_deg": 234,
      "wind_gust": 4.37,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.25
    },
    {
      "dt": 1636210800,
      "temp": 291.94,
      "feels_like": 292.09,
      "pressure": 1015,
      "humidity": 85,
      "dew_point": 289.6,
      "uvi": 1.45,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.36,
      "wind_deg": 232,
      "wind_gust": 4.37,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.16
    },
    {
      "dt": 1636214400,
      "temp": 292.22,
      "feels_like": 292.38,
      "pressure": 1014,
      "humidity": 84,
      "dew_point": 289.73,
      "uvi": 2.06,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.41,
      "wind_deg": 233,
      "wind_gust": 4.49,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.12
    },
    {
      "dt": 1636218000,
      "temp": 292.46,
      "feels_like": 292.64,
      "pressure": 1013,
      "humidity": 84,
      "dew_point": 289.84,
      "uvi": 1.86,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.32,
      "wind_deg": 235,
      "wind_gust": 4.48,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.1
    },
    {
      "dt": 1636221600,
      "temp": 292.84,
      "feels_like": 293.01,
      "pressure": 1013,
      "humidity": 82,
      "dew_point": 289.99,
      "uvi": 1.43,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.42,
      "wind_deg": 238,
      "wind_gust": 4.66,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.1
    },
    {
      "dt": 1636225200,
      "temp": 293.09,
      "feels_like": 293.28,
      "pressure": 1012,
      "humidity": 82,
      "dew_point": 290.07,
      "uvi": 1.15,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.33,
      "wind_deg": 241,
      "wind_gust": 4.61,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636228800,
      "temp": 293.23,
      "feels_like": 293.41,
      "pressure": 1012,
      "humidity": 81,
      "dew_point": 290.08,
      "uvi": 0.56,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.27,
      "wind_deg": 246,
      "wind_gust": 4.53,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636232400,
      "temp": 292.94,
      "feels_like": 293.12,
      "pressure": 1012,
      "humidity": 82,
      "dew_point": 289.93,
      "uvi": 0.18,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.39,
      "wind_deg": 250,
      "wind_gust": 4.81,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636236000,
      "temp": 292.11,
      "feels_like": 292.25,
      "pressure": 1012,
      "humidity": 84,
      "dew_point": 289.57,
      "uvi": 0.03,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.38,
      "wind_deg": 252,
      "wind_gust": 5.71,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636239600,
      "temp": 291.29,
      "feels_like": 291.41,
      "pressure": 1013,
      "humidity": 86,
      "dew_point": 289.2,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.46,
      "wind_deg": 250,
      "wind_gust": 6.57,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636243200,
      "temp": 290.89,
      "feels_like": 291.02,
      "pressure": 1014,
      "humidity": 88,
      "dew_point": 289.06,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 3.16,
      "wind_deg": 250,
      "wind_gust": 6.43,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636246800,
      "temp": 290.86,
      "feels_like": 290.98,
      "pressure": 1014,
      "humidity": 88,
      "dew_point": 289.09,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.99,
      "wind_deg": 246,
      "wind_gust": 6.58,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636250400,
      "temp": 291,
      "feels_like": 291.14,
      "pressure": 1014,
      "humidity": 88,
      "dew_point": 289.2,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.67,
      "wind_deg": 241,
      "wind_gust": 6.06,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636254000,
      "temp": 291.19,
      "feels_like": 291.35,
      "pressure": 1013,
      "humidity": 88,
      "dew_point": 289.43,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.4,
      "wind_deg": 239,
      "wind_gust": 5.38,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636257600,
      "temp": 291.34,
      "feels_like": 291.54,
      "pressure": 1012,
      "humidity": 89,
      "dew_point": 289.68,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.44,
      "wind_deg": 243,
      "wind_gust": 5.34,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636261200,
      "temp": 291.32,
      "feels_like": 291.54,
      "pressure": 1012,
      "humidity": 90,
      "dew_point": 289.8,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.48,
      "wind_deg": 249,
      "wind_gust": 5.05,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636264800,
      "temp": 291.2,
      "feels_like": 291.44,
      "pressure": 1012,
      "humidity": 91,
      "dew_point": 289.89,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.67,
      "wind_deg": 245,
      "wind_gust": 5.33,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1636268400,
      "temp": 291.07,
      "feels_like": 291.35,
      "pressure": 1012,
      "humidity": 93,
      "dew_point": 290.03,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.61,
      "wind_deg": 243,
      "wind_gust": 5.34,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.16
    },
    {
      "dt": 1636272000,
      "temp": 290.98,
      "feels_like": 291.25,
      "pressure": 1013,
      "humidity": 93,
      "dew_point": 290.04,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.92,
      "wind_deg": 236,
      "wind_gust": 6.27,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04n"
        }
      ],
      "pop": 0.24
    },
    {
      "dt": 1636275600,
      "temp": 290.95,
      "feels_like": 291.21,
      "pressure": 1013,
      "humidity": 93,
      "dew_point": 289.93,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 2.72,
      "wind_deg": 235,
      "wind_gust": 6.16,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "pop": 0.13
    }
  ],
  "daily": [
    {
      "dt": 1636124400,
      "sunrise": 1636102774,
      "sunset": 1636150122,
      "moonrise": 1636104660,
      "moonset": 1636154040,
      "moon_phase": 0.03,
      "temp": {
        "day": 303.53,
        "min": 292.32,
        "max": 307.25,
        "night": 292.32,
        "eve": 296.62,
        "morn": 299.82
      },
      "feels_like": {
        "day": 305.13,
        "night": 292.77,
        "eve": 297.5,
        "morn": 301.07
      },
      "pressure": 1009,
      "humidity": 52,
      "dew_point": 292.57,
      "wind_speed": 7.45,
      "wind_deg": 252,
      "wind_gust": 12.48,
      "weather": [
        {
          "id": 502,
          "main": "Rain",
          "description": "lluvia de gran intensidad",
          "icon": "10d"
        }
      ],
      "clouds": 85,
      "pop": 0.98,
      "rain": 19.12,
      "uvi": 11.4
    },
    {
      "dt": 1636210800,
      "sunrise": 1636189139,
      "sunset": 1636236563,
      "moonrise": 1636194000,
      "moonset": 1636244700,
      "moon_phase": 0.07,
      "temp": {
        "day": 291.94,
        "min": 290.01,
        "max": 293.23,
        "night": 291,
        "eve": 292.94,
        "morn": 290.1
      },
      "feels_like": {
        "day": 292.09,
        "night": 291.14,
        "eve": 293.12,
        "morn": 290.25
      },
      "pressure": 1015,
      "humidity": 85,
      "dew_point": 289.6,
      "wind_speed": 4.16,
      "wind_deg": 236,
      "wind_gust": 8.03,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "lluvia ligera",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 0.56,
      "rain": 0.61,
      "uvi": 2.06
    },
    {
      "dt": 1636297200,
      "sunrise": 1636275506,
      "sunset": 1636323005,
      "moonrise": 1636283700,
      "moonset": 1636335240,
      "moon_phase": 0.11,
      "temp": {
        "day": 295.03,
        "min": 290.95,
        "max": 297.87,
        "night": 295.28,
        "eve": 296.97,
        "morn": 290.95
      },
      "feels_like": {
        "day": 295.28,
        "night": 295.56,
        "eve": 297.29,
        "morn": 291.21
      },
      "pressure": 1014,
      "humidity": 77,
      "dew_point": 291.01,
      "wind_speed": 2.92,
      "wind_deg": 236,
      "wind_gust": 6.27,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0.24,
      "uvi": 6.22
    },
    {
      "dt": 1636383600,
      "sunrise": 1636361874,
      "sunset": 1636409446,
      "moonrise": 1636373760,
      "moonset": 1636425540,
      "moon_phase": 0.14,
      "temp": {
        "day": 301.46,
        "min": 293.96,
        "max": 304.9,
        "night": 299.47,
        "eve": 301.6,
        "morn": 293.96
      },
      "feels_like": {
        "day": 302.26,
        "night": 299.47,
        "eve": 302.12,
        "morn": 294.26
      },
      "pressure": 1012,
      "humidity": 53,
      "dew_point": 291.31,
      "wind_speed": 3.29,
      "wind_deg": 169,
      "wind_gust": 8.42,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "lluvia ligera",
          "icon": "10d"
        }
      ],
      "clouds": 58,
      "pop": 0.28,
      "rain": 0.28,
      "uvi": 7.71
    },
    {
      "dt": 1636470000,
      "sunrise": 1636448244,
      "sunset": 1636495888,
      "moonrise": 1636464000,
      "moonset": 0,
      "moon_phase": 0.18,
      "temp": {
        "day": 305.05,
        "min": 291.92,
        "max": 306.9,
        "night": 297.03,
        "eve": 303.98,
        "morn": 291.92
      },
      "feels_like": {
        "day": 303.85,
        "night": 296.41,
        "eve": 302.4,
        "morn": 291.65
      },
      "pressure": 1012,
      "humidity": 30,
      "dew_point": 285.77,
      "wind_speed": 4.53,
      "wind_deg": 148,
      "wind_gust": 12.25,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "cielo claro",
          "icon": "01d"
        }
      ],
      "clouds": 0,
      "pop": 0,
      "uvi": 3.42
    },
    {
      "dt": 1636556400,
      "sunrise": 1636534614,
      "sunset": 1636582331,
      "moonrise": 1636554360,
      "moonset": 1636515360,
      "moon_phase": 0.22,
      "temp": {
        "day": 304.92,
        "min": 290.7,
        "max": 305.85,
        "night": 300.04,
        "eve": 303.57,
        "morn": 290.7
      },
      "feels_like": {
        "day": 305.45,
        "night": 300.83,
        "eve": 304.18,
        "morn": 290.21
      },
      "pressure": 1011,
      "humidity": 42,
      "dew_point": 290.73,
      "wind_speed": 4.21,
      "wind_deg": 146,
      "wind_gust": 13.11,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "nubes",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0.09,
      "uvi": 4
    },
    {
      "dt": 1636642800,
      "sunrise": 1636620987,
      "sunset": 1636668773,
      "moonrise": 1636644540,
      "moonset": 1636604700,
      "moon_phase": 0.25,
      "temp": {
        "day": 303.07,
        "min": 294.5,
        "max": 305.58,
        "night": 296.46,
        "eve": 301.56,
        "morn": 294.5
      },
      "feels_like": {
        "day": 305.26,
        "night": 297.07,
        "eve": 303.22,
        "morn": 294.62
      },
      "pressure": 1014,
      "humidity": 57,
      "dew_point": 293.93,
      "wind_speed": 3.04,
      "wind_deg": 99,
      "wind_gust": 7.76,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "lluvia ligera",
          "icon": "10d"
        }
      ],
      "clouds": 91,
      "pop": 0.8,
      "rain": 5.14,
      "uvi": 4
    },
    {
      "dt": 1636729200,
      "sunrise": 1636707360,
      "sunset": 1636755216,
      "moonrise": 1636734540,
      "moonset": 1636693620,
      "moon_phase": 0.29,
      "temp": {
        "day": 304.59,
        "min": 293.25,
        "max": 307.06,
        "night": 299.41,
        "eve": 304.36,
        "morn": 293.25
      },
      "feels_like": {
        "day": 304.81,
        "night": 299.41,
        "eve": 304.19,
        "morn": 293.8
      },
      "pressure": 1014,
      "humidity": 41,
      "dew_point": 290.03,
      "wind_speed": 4.87,
      "wind_deg": 98,
      "wind_gust": 10.42,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "nubes dispersas",
          "icon": "03d"
        }
      ],
      "clouds": 33,
      "pop": 0.02,
      "uvi": 4
    }
  ],
  "alerts": [
    {
      "sender_name": "DMH-DINAC",
      "event": "Sistema de tormentas",
      "start": 1636081200,
      "end": 1636221600,
      "description": "Sistema de tormentas comenzaría a afectar durante la madrugada del vienes 05 y hasta la mañana sábado 06 a varios departamentos de ambas regiones, generando a su paso acumulados de lluvias importantes, no descartando la ocurrencia de ráfagas de viento próximas a 100 km/h, alta probabilidad de caída de granizos de manera puntual y alta frecuencia de descargas eléctricas.",
      "tags": [
        "Wind"
      ]
    }
  ]
}

pronostico(p);