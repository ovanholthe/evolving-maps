// Olivier van Holthe
// 5927161
window.onload = function() {

	var defaultfill = "#555555"
	var defaultFill = "#550055"
	var data = {
		"AZ": {
			"fillKey": defaultfill,
	  },
		"CO": {
			"fillKey": defaultFill,
	  },
		"DE": {
			"fillKey": defaultFill,
	  },
		"FL": {
			"fillKey": defaultFill,
	  },
		"GA": {
			"fillKey": defaultfill,
	  },
		"HI": {
			"fillKey": defaultFill,
	  },
		"ID": {
			"fillKey": defaultfill,
	  },
		"IL": {
			"fillKey": defaultFill,
	  },
		"IN": {
			"fillKey": defaultfill,
	  },
		"IA": {
			"fillKey": defaultFill,
	  },
		"KS": {
			"fillKey": defaultfill,
	  },
		"KY": {
			"fillKey": defaultfill,
	  },
		"LA": {
			"fillKey": defaultfill,
	  },
		"MD": {
			"fillKey": defaultFill,
	  },
		"ME": {
			"fillKey": defaultFill,
	  },
		"MA": {
			"fillKey": defaultFill,
	  },
		"MN": {
			"fillKey": defaultFill,
	  },
		"MI": {
			"fillKey": defaultFill,
	  },
		"MS": {
			"fillKey": defaultfill,
	  },
		"MO": {
			"fillKey": defaultfill,
	  },
		"MT": {
			"fillKey": defaultfill,
	  },
		"NC": {
			"fillKey": defaultFill,
	  },
		"NE": {
			"fillKey": defaultfill,
	  },
		"NV": {
			"fillKey": defaultFill,
	  },
		"NH": {
			"fillKey": defaultFill,
	  },
		"NJ": {
			"fillKey": defaultFill,
	  },
		"NY": {
			"fillKey": defaultFill,
	  },
		"ND": {
			"fillKey": defaultfill,
	  },
		"NM": {
			"fillKey": defaultFill,
	  },
		"OH": {
			"fillKey": defaultFill,
	  },
		"OK": {
			"fillKey": defaultfill,
	  },
		"OR": {
			"fillKey": defaultFill,
	  },
		"PA": {
			"fillKey": defaultFill,
	  },
		"RI": {
			"fillKey": defaultFill,
	  },
		"SC": {
			"fillKey": defaultfill,
	  },
		"SD": {
			"fillKey": defaultfill,
	  },
		"TN": {
			"fillKey": defaultfill,
	  },
		"TX": {
			"fillKey": defaultfill,
	  },
		"UT": {
			"fillKey": defaultfill,
	  },
		"WI": {
			"fillKey": defaultFill,
	  },
		"VA": {
			"fillKey": defaultFill,
	  },
		"VT": {
			"fillKey": defaultFill,
	  },
		"WA": {
			"fillKey": defaultFill,
	  },
		"WV": {
			"fillKey": defaultfill,
	  },
		"WY": {
			"fillKey": defaultfill,
	  },
		"CA": {
			"fillKey": defaultFill,
	  },
		"CT": {
			"fillKey": defaultFill,
	  },
		"AK": {
			"fillKey": defaultfill,
	  },
		"AR": {
			"fillKey": defaultfill,
	  },
		"AL": {
			"fillKey": defaultfill,
	  }
	}
	var colorlist = ["color1", "color2", "color3", "color4"]
	function colorCounties(map) {
		var mapcoloring = {};
		for(var county in data){
			mapcoloring[county] = {fillKey: colorlist[Math.floor(Math.random() * colorlist.length)]}
		}
		console.log(mapcoloring)

		map.updateChoropleth(mapcoloring);
	}

	// Create the map itself.
	var data_map = new Datamap({
 
		element: document.getElementById("mapcontainer"),

		// Insert a dummy item to define the structure of the data. 
		data: {
		dummy: { fillKey: "defaultFill" }
		},

		
		fills: {
			defaultFill: "#555555",
			color1: "#ff0000",
			color2: "#00ff00",
			color3: "#0000ff",
			color4: "#ffff00"
	},

	geographyConfig: {
 
	borderColor: "white",
	borderWidth: 0.3,
	highlightFillColor: "black"
 
	}
 
	});

	colorCounties(data_map);

}