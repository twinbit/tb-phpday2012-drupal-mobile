// Include our config file
Ti.include('../config.js');
Ti.include('../lib/redux.js');

// Define the variable win to contain the current window
var win = Ti.UI.currentWindow;

var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region:{latitude: 0, longitude: 0, latitudeDelta: 0.05, longitudeDelta: 0.05},
    animate: true,
    regionFit: true,
    userLocation: true,
	touchEnabled: true,
});

// Add our scrollview to the window
win.add(mapview);

// Define the name of the view (view as in Drupal's view)
var drupal_view = "user_locations";

// Define the url which contains the full url
// in this case, we'll connecting to http://example.com/api/rest/views/maps.json
var url = REST_PATH + 'views/' + drupal_view + '.json';

// Create a conection inside the variable connection
var connection = Titanium.Network.createHTTPClient();

// Open the connection
connection.open("GET",url);

// Send the connection
connection.send();

// When the connection loads we do:
connection.onload = function() {
// Save the status of the connection in a variable
// this will be used to see if we have a connection (200) or not
var statusCode = connection.status;
	
	// Check if we have a connection
	if(statusCode == 200) {
	
		// Save the responseText from the connection in the response variable
		var response = connection.responseText;
		
		// Parse (build data structure) the JSON response into an object (data)
		var result = JSON.parse(response);
	
		/**
		* Create a new array "results"
		* This is necessary because we need to create an object
		* to send to the Table we're creating with the results
		* the table will have the title and the nid of every result
		* and we'll use the nid to move to another window when we click
		* on it.
		*/
		// var results = new Array();
		var annotations = [];
		// Start loop
		for(var key in result) {
			// Create the data variable and hold every result
			var data = result[key];
			var user_entity = data._field_data.uid.entity;
			
			var annotation = Titanium.Map.createAnnotation({
				latitude: data.field_field_location[0].raw.lat,
				longitude: data.field_field_location[0].raw.lng,
				title: user_entity.field_about.und[0].value,
			  subtitle: data.users_name,
			  pincolor: Math.floor(Math.random()*16777215).toString(16),
				animate: true,
				uid: data.uid
				// rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
				// myid: key, // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS,
				// leftView: annotationView,
			});
			
			annotations.push(annotation);
		}
	
		// Create a new table to hold our results
		// We tell Titanium to use our array results as the Property "data"
		// See http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.TableView-object
		// Specially the properties
		// mapview.annotations = annotations;
		mapview.addAnnotations(annotations);
		
		mapview.addEventListener('click',function(evt)
				{
				  var clickSource = evt.clicksource;
				  Ti.API.info('mapview click clicksource = ' + clickSource);
				});
	}
	else {
		// Create a label for the node title
		var errorMessage = Ti.UI.createLabel({
			// The text of the label will be the node title (data.title)
			text: "Please check your internet connection.",
			color:'#000',
			textAlign:'left',
			font:{fontSize:24, fontWeight:'bold'},
			top:25,
			left:15,
			height:18
		});
		
		// Add the error message to the window
		win.add(errorMessage);
	}
}