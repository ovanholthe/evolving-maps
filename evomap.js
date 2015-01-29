// Olivier van Holthe
// 5927161

// The data used. An object containing all the states and their neighbours. 
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
	};

// Global lists and objects. 
var colorlist = ["color1", "color2", "color3", "color4"];
var mapcoloring = {};
var orderedstates = ["WA","OR","CA","AZ","NV","UT","ID","MT","WY","CO","NM","TX",
	"OK","KS","NE","SD","ND","MN","IA","MO","AR","LA","MS","IL","WI","MI","IN","KY",
	"TN","AL","FL","GA","SC","NC","VA","WV","OH","PA","NY","VT","NH","ME","MA","RI",
	"CT","NJ","DE","MD","DC","AK","HI"];
var selectionlist = document.getElementsByClassName("selected"); 
// List of just the states. 
var states = [];
for (county in neighbours){
	states.push(county);
}


// Prepare all elements on the site. 
window.onload = function() {

	// Below the actual map elements are created.

	var example_map = new Datamap({
 
		element: document.getElementById("example"),

		// Insert a dummy item to define the structure of the data. 
		data: {
			dummy: { fillKey: "defaultFill" }
		},
		fills: {
			defaultFill: "#ffffff",
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
	colorWhite(example_map)

	var data_map = new Datamap({
 
		element: document.getElementById("mapcontainer"),

		// Insert a dummy item to define the structure of the data. 
		data: {
			dummy: { fillKey: "defaultFill" }
		},
		fills: {
			defaultFill: "#ffffff",
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
	var data_map2 = new Datamap({
 
		element: document.getElementById("parent"),

		// Insert a dummy item to define the structure of the data. 
		data: {
			dummy: { fillKey: "defaultFill" }
		},
		fills: {
			defaultFill: "#ffffff",
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
	var data_map3 = new Datamap({
 
		element: document.getElementById("child"),

		// Insert a dummy item to define the structure of the data. 
		data: {
			dummy: { fillKey: "defaultFill" }
		},
		fills: {
			defaultFill: "#ffffff",
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
	
	colorWhite(data_map);
	colorWhite(data_map2);

	// Making the buttons on the page work. 
	d3.select("#startknop").
		on("click", function() {
			colorRandom(example_map);
		});
	
	d3.select("#startevo").
		on("click", function() {
			evolve(data_map, data_map2, data_map3);
		})
}

/* Next follow the functions used in the evolution process. An important definition
	is collision: a collision occurs when two adjacent counties have the same color. */

// The evolution process. 
function evolve(data_map, data_map2, data_map3){
	// Color the maps white again. 
	colorWhite(data_map);
	colorWhite(data_map2);
	colorWhite(data_map3);

	// Set variable parameters (user input). 
	var maxgeneration = Number(document.getElementById("myGenerations").value);
	var maxspeed = Number(document.getElementById("mySpeed").value) * 1000;
	var maxmutations = Number(document.getElementById("myMutations").value);

	// Check value of user input. 
	if (maxgeneration % 1 != 0 || maxgeneration < 1){
		document.getElementById("error1").innerHTML = "Enter integer larger then 0";
		return;
	} else {
		document.getElementById("error1").innerHTML = "";
	}

	if (maxmutations < 0){
		document.getElementById("error2").innerHTML = "Enter number larger then 0";
		return;
	} else {
		document.getElementById("error2").innerHTML = "";
	}

	if (maxspeed < 0){
		document.getElementById("error3").innerHTML = "Enter number larger then 0";
		return;
	} else {
		document.getElementById("error3").innerHTML = "";
	}

	// Create a population
	var population = []
	for (var i = 0; i < 100; i++){
		var individu = {};
		for(var county in neighbours){
			individu[county] = {fillKey: colorlist[Math.floor(Math.random() * colorlist.length)]}
		};
		population.push(individu);
	}

	// Start the evolution process. 
	mapsfitness = fitness(population);
	var generation = 0;

	var evolution = setInterval(function(){
	
		var nextgen = selection(population, mapsfitness);
		var fitst = Math.min.apply(null, mapsfitness);
		var laziest = Math.max.apply(null, mapsfitness);
		var average = (fitst + laziest) / 2;
		var dnagarbage1 = {};
		var dnagarbage2 = {};
		var leastcollisions = 100;
		var father = {};
		var mother = {};
		var bestchild = {};

		// Initiate crossover: create new individuals. 
		while (nextgen.length < 100){
			var dnainfo = crossover(nextgen);
			var baby = dnainfo[0];
			var badDNA = selectnode(baby);

			// Mutate: change the "dna" a little bit, i.e. give a few states different colors. 
			for (var i = 0; i < maxmutations; i++){
				mutate(baby, badDNA);
				baby[states[Math.floor(Math.random() * states.length)].fillKey = colorlist[Math.floor(Math.random() * colorlist.length)]];
				baby[states[Math.floor(Math.random() * states.length)].fillKey = colorlist[Math.floor(Math.random() * colorlist.length)]];
			}
			if (fitst === average){
				for (var i = 0; i < 10; i++){
					baby[states[Math.floor(Math.random() * states.length)].fillKey = colorlist[Math.floor(Math.random() * colorlist.length)]];
				}
			}
			nextgen.push(baby);

			// Keep track of best child and its genetic mom and dad.
			var bestbaby = collisions(baby);
			if (bestbaby < leastcollisions){
				leastcollisions = bestbaby;
				dnagarbage1 = dnainfo[1];
				dnagarbage2 = dnainfo[2];
				father = dnainfo[3];
				mother = dnainfo[4];
				bestchild = baby;
			}
		}
		console.log(data_map2)
		// display parent colors and show number of collisions. 
		var colorMomDad = setTimeout(function(){
			data_map.updateChoropleth(father);
			data_map2.updateChoropleth(mother);
			document.getElementById("col1").innerHTML = collisions(father);
			document.getElementById("col2").innerHTML = collisions(mother);
			document.getElementById("col3").innerHTML = collisions(bestchild);
		}, maxspeed / 5);

		population = nextgen;
		mapsfitness = fitness(nextgen);

		// Make clone of mom and dad. 
		var show1 = JSON.parse(JSON.stringify(father));
		var show2 = JSON.parse(JSON.stringify(mother));

		// Color the useless half of parents white. 
		var makewhite = setTimeout(function(){
			
			for (county in dnagarbage2){
				show1[county].fillKey = "defaultFill";
			}
			for (county in dnagarbage1){
				show2[county] = {fillKey: "defaultFill"};
			}
			data_map.updateChoropleth(show1);
			data_map2.updateChoropleth(show2);
		}, maxspeed/3);
		
		// Display the colors of the fittest child. 
		var colorchild = setTimeout(function(){
			data_map3.updateChoropleth(bestchild);
		}, maxspeed / 2);

		console.log(Math.min.apply(null, mapsfitness), laziest, average);

		generation++;
		document.getElementById("gencount").innerHTML = generation;
		document.getElementById("fittestind").innerHTML = Math.min.apply(null, mapsfitness);

		// Terminate after number of generations. 
		if (generation === maxgeneration || fitst === 0){
			clearInterval(evolution);
		}
	
	}, maxspeed);
};

// Display part of selection. 
function select(){
	
	for(var i = 0; i < selectionlist.length; i++){
		var part = new Datamap({

			element: selectionlist[i],

			// Insert a dummy item to define the structure of the data. 
			data: {
				dummy: { fillKey: "defaultFill" }
			},
			fills: {
				defaultFill: "#ffffff",
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
		colorRandom(part);
	};
};

// Count the total number of collisions on the map. 
function collisions(mapcoloring) {
	var collision = 0;
	for(var county in neighbours){
		buren = neighbours[county];
		for(buur in buren){
			if (mapcoloring[county].fillKey === mapcoloring[buren[buur]].fillKey){
				collision += 1;
			};
		};
	};
	return collision;
};

// Determine the fitness of a map. 
function fitness(population) {
	popfitness = [];
	for (var i = 0, n = population.length; i < n; i++){
		individualfit = collisions(population[i]);
		popfitness.push(individualfit);
	}
	return popfitness;
};

// Make a selection of fittest maps. 
function selection(population, popfitness){
	survivors = [];
	for (var i = 0; i < 40; i++){
		var fitst = popfitness.indexOf(Math.min.apply(null, popfitness));
		var alpha = population[fitst];
		survivors.push(alpha);

		popfitness.splice(fitst, 1);
		population.splice(fitst, 1);
	};

	return survivors;
};

// Create new maps by using parts of the selected ones 
function crossover(oldgeneration){
	/* Of each parent half of its dna (= half of its colored states) is used to 
	create a child. The halfs are chosen randomly by selecting 25 states of parent 1
	and complementing this with the missing states of parent 2. */

	// Choose parents out of selection. 
	parent1 = oldgeneration[Math.floor(Math.random() * oldgeneration.length)];
	parent2 = oldgeneration[Math.floor(Math.random() * oldgeneration.length)];

	while(parent1 === parent2){
		parent2 = oldgeneration[Math.floor(Math.random() * oldgeneration.length)];
	}
	
	var promotor = Math.floor(Math.random() * orderedstates.length);
	var terminator = (promotor + 25) % 50;
	var child = {};
	var dnapart1 = {};
	var dnapart2 = {};

	// Create a child by adding the halves of both parents. 
	// Also store the halves that are not used for later in the animation. 
	if (promotor < terminator){
		var start1 = 0;
		while (start1 < promotor){
			child[orderedstates[start1]] = parent1[orderedstates[start1]];
			dnapart1[orderedstates[start1]] = parent2[orderedstates[start1]];
			start1++; 
		};
		for (var j = promotor; j < terminator; j++){
			child[orderedstates[j]] = parent2[orderedstates[j]];
			dnapart2[orderedstates[j]] = parent1[orderedstates[j]];
		};
		for(var k = terminator, n = orderedstates.length; k < n; k++){
			child[orderedstates[k]] = parent1[orderedstates[k]];
			dnapart1[orderedstates[k]] = parent2[orderedstates[k]];
		};
	};

	if (promotor > terminator){
		var start2 = 0;
		while (start2 < terminator){
			child[orderedstates[start2]] = parent1[orderedstates[start2]];
			dnapart1[orderedstates[start2]] = parent2[orderedstates[start2]];
			start2++; 
		};
		for (var j = terminator; j < promotor; j++){
			child[orderedstates[j]] = parent2[orderedstates[j]];
			dnapart2[orderedstates[j]] = parent1[orderedstates[j]];
		};
		for(var k = promotor, n = orderedstates.length; k < n; k++){
			child[orderedstates[k]] = parent1[orderedstates[k]];
			dnapart1[orderedstates[k]] = parent2[orderedstates[k]];
		};
	};
	return [child, dnapart1, dnapart2, parent1, parent2];
};

// Find the node with the highest number of collisions
function selectnode(individual){
	maxcol = 0;
	changenode = "x";
	for(var county in neighbours){
		buren = neighbours[county];
		var botsingen = 0;
		for(var buur in buren){
			if (individual[county].fillKey === individual[buren[buur]].fillKey){
				botsingen += 1;
			};
		};
		if (botsingen > maxcol){
			maxcol = botsingen;
			changenode = county;
		};
	};
	return changenode;
};

// Change the color of a selected node to the color with least collisions. 
function mutate(unit, node){
	// Keep track of number of collisions for each color. 
	var dictionary = {'color1': 0, 'color2': 0, 'color3': 0, 'color4': 0};
	var buren = neighbours[node];
	for (i in buren){
		if (mapcoloring[buren[i]].fillKey === "color1"){
			dictionary.color1 += 1;
		};
		if (mapcoloring[buren[i]].fillKey === "color2"){
			dictionary.color2 += 1;
		};
		if (mapcoloring[buren[i]].fillKey === "color3"){
			dictionary.color3 += 1;
		};
		if (mapcoloring[buren[i]].fillKey === "color4"){
			dictionary.color4 += 1;
		};
	};
	
	// Search for key with minimum value and give fillKey this value. 
	var min = 'color1';
	var value = dictionary.color1;
	for (col in dictionary){
		if (dictionary[col] < value){
			value = dictionary[col];
			min = col;
		};
	};
	unit[node].fillKey = min;
};

// Color all states white. 
function colorWhite(map) {
	
	for(var county in neighbours){
		mapcoloring[county] = {fillKey: "defaultFill"}
	}
	map.updateChoropleth(mapcoloring);
};

// Give a map a random coloring. 
function colorRandom(map) {
		coloring = {};
		for(var county in neighbours){
			coloring[county] = {fillKey: colorlist[Math.floor(Math.random() * colorlist.length)]}
		};
		console.log(coloring);
		map.updateChoropleth(coloring);

		var collisionexample = document.getElementById("examplecol");
		collisionexample.innerHTML = "Collisions: " + collisions(coloring);
};

function checkBestChild(child){
	d3.map(child).forEach(function(key, value){
		switch (value['fillKey']){
			case 'defaultFill':
			case 'color1':
			case 'color2':
			case 'color3':
			case 'color4':
				break;
			default:
				console.log('State ' + key + ' has color ' + value['fillKey']);
		}
	});
};