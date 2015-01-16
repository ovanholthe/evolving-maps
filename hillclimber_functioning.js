// Olivier van Holthe
// 5927161
window.onload = function() {


	var neighbours = {
		"AK": [],
		"AL": ["FL", "GA", "MS", "TN"],
		"AR": ["LA", "MO", "MS", "OK", "TN", "TX"],
		"AZ": ["CA", "NM", "NV", "UT"],
		"CA": ["NV", "OR", "AZ"],
		"CO": ["KS", "NE", "NM", "OK", "UT", "WY"],
		"CT": ["MA", "NY", "RI"],
		"DC": ["MD", "VA"],
		"DE": ["MD", "NJ", "PA"],
		"FL": ["GA", "AL"],
		"GA": ["AL", "NC", "SC", "TN", "FL"],
		"HI": [],
		"IA": ["IL", "MN", "MO", "NE", "SD", "WI"],
		"ID": ["MT", "NV", "OR", "UT", "WA", "WY"],
		"IL": ["IN", "KY", "MO", "WI", "IA"],
		"IN": ["KY", "MI", "OH", "IL"],
		"KS": ["MO", "NE", "OK", "CO"],
		"KY": ["MO", "OH", "TN", "VA", "WV", "IN", "IL"],
		"LA": ["MS", "TX", "AR"],
		"MA": ["NH", "NY", "RI", "VT", "CT"],
		"MD": ["PA", "VA", "WV", "DC", "DE"],
		"ME": ["NH"],
		"MI": ["OH", "WI", "IN"],
		"MN": ["ND", "SD", "WI", "IA"],
		"MO": ["NE", "OK", "TN", "KS", "AR", "KY", "IA", "IL"],
		"MS": ["TN", "AL", "AR", "LA"],
		"MT": ["ND", "SD", "WY", "ID"],
		"NC": ["SC", "TN", "VA", "GA"],
		"ND": ["SD", "MN", "MT"],
		"NE": ["SD", "WY", "CO", "KS", "MO", "IA"],
		"NH": ["VT", "MA", "ME"],
		"NJ": ["NY", "PA", "DE"],
		"NM": ["OK", "TX", "CO", "AZ"],
		"NV": ["OR", "UT", "ID", "CA", "AZ"],
		"NY": ["PA", "VT", "MA", "CT", "NJ"],
		"OH": ["PA", "WV", "KY", "IN", "MI"],
		"OK": ["TX", "AR", "MO", "KS", "CO", "NM"],
		"OR": ["WA", "CA", "NV", "ID"],
		"PA": ["WV", "NJ", "MD", "NY", "DE", "OH"],
		"RI": ["CT", "MA"],
		"SC": ["NC", "GA"],
		"SD": ["WY", "MT", "ND", "MN", "IA", "NE"],
		"TN": ["VA", "KY", "NC", "GA", "MO", "AL", "MS", "AR"], 
		"TX": ["LA", "AR", "OK", "NM"],
		"UT": ["WY", "CO", "AZ", "NV", "ID"],
		"VA": ["WV", "MD", "KY", "TN", "NC", "DC"],
		"VT": ["NY", "MA", "NH"],
		"WA": ["ID", "OR"],
		"WV": ["PA", "MD", "VA", "KY", "OH"],
		"WI": ["MI", "IL", "IA", "MN"],
		"WY": ["MT", "SD", "NE", "CO", "UT", "ID"]
	}

	var colorlist = ["color1", "color2", "color3", "color4"]
	var mapcoloring = {};

	// Count the total number of collisions on the map. 
	function collisions(mapcoloring) {
		var collision = 0;
		for(var county in neighbours){
			buren = neighbours[county];
			for(buur in buren){
				if (mapcoloring[county].fillKey === mapcoloring[buren[buur]].fillKey){
					collision += 1;
				}
			}
		}
		return collision;
	}

	function fitness(population) {
		popfitness = [];
		for (var i = 0; i < 100; i++){
			individualfit = collisions(popfitness[i]);
			popfitness.push(individualfit);
		}
		return popfitness;
	}

	// Find the node with the highest number of collisions
	function selectnode(){
		maxcol = 0;
		changenode = "x";
		for(var county in neighbours){
			buren = neighbours[county];
			botsingen = 0;
			for(buur in buren){
				if (mapcoloring[county].fillKey === mapcoloring[buren[buur]].fillKey){
					botsingen += 1;
				}
			}
			if (botsingen > maxcol){
				maxcol = botsingen;
				changenode = county;
			}
		}
		console.log(mapcoloring[changenode])
		return changenode;
	}

	// Change the color of a selected node to the color with least collisions. 
	function changecolor(node, map){
		
		dictionary = {'color1': 0, 'color2': 0, 'color3': 0, 'color4': 0}
		buren = neighbours[node];
		for (i in buren){
			if (mapcoloring[buren[i]].fillKey === "color1"){
				dictionary.color1 += 1;
			}
			if (mapcoloring[buren[i]].fillKey === "color2"){
				dictionary.color2 += 1;
			}
			if (mapcoloring[buren[i]].fillKey === "color3"){
				dictionary.color3 += 1;
			}
			if (mapcoloring[buren[i]].fillKey === "color4"){
				dictionary.color4 += 1;
			}
		}
		
		// Search for key with minimum value.
		min = 'color1'
		value = dictionary.color1
		for (col in dictionary){
			
			if (dictionary[col] < value){
				value = dictionary[col]
				min = col
			}
		}
		console.log(min)

		mapcoloring[node].fillKey = min
			
		map.updateChoropleth(mapcoloring);
	
	}

	// Add colors to the states. 
	function colorCounties(map) {
		
		for(var county in neighbours){
			mapcoloring[county] = {fillKey: colorlist[Math.floor(Math.random() * colorlist.length)]}
		}
		
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
	 
			borderColor: "black",
			borderWidth: 0.5,
			highlightFillColor: "black"
	 
		}
	 
	});
	
	colorCounties(data_map);

	var states = [];
	for (county in neighbours){
		states.push(county);
	}

	console.log(collisions(mapcoloring));

	// Initiate the coloring 
	var colorsequence = setInterval(function() {
		var target = selectnode();
		var before = collisions(mapcoloring);
		changecolor(target, data_map);
		var after = collisions(mapcoloring);
		console.log(after)
		
		if (after === 0){
			clearInterval(colorsequence);
		}

		if (before === after){
			mapcoloring[states[Math.floor(Math.random() * states.length)]].fillKey = colorlist[Math.floor(Math.random() * colorlist.length)]
			changecolor(states[Math.floor(Math.random() * states.length)], data_map)
			changecolor(states[Math.floor(Math.random() * states.length)], data_map)
		}
		
	}, 300);
}
