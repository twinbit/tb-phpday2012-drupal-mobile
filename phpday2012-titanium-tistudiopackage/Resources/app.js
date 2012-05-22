// Create a reference to the underscore.js module
// var _ = require('lib/underscore')._;

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// include redux
Ti.include('lib/redux.js');

// Create tab group to hold all the tabs
var tabGroup = Titanium.UI.createTabGroup();

//Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid"),
	sessid: Titanium.App.Properties.getString("userSessionId"),
	session_name: Titanium.App.Properties.getString("userSessionName"),
	name: Titanium.App.Properties.getString("userName"),
}

// Create the home window
var homeWin = Titanium.UI.createWindow({  
	// Set the title for the window
    title:'Home',
    
    // Set the background color for the window
    backgroundColor:'#fff',
    
    // The actual window data will be in this file, not here
    url: 'home.js'
});

// Create the home tab
var homeTab = Titanium.UI.createTab({  
	// Set the icon for the button
    icon:'icons/53-house.png',
    
    // Set the title for the tab
    title:'Home',
    
    // Relate the tab to a window so the app knows what window to open.
    window: homeWin
});

// Create the user window
var userWin = Ti.UI.createWindow({
	title: "User",
	backgroundColor: '#fff',
	url: 'includes/user.js',
});

// Create the user tab
var userTab = Ti.UI.createTab({
	icon: "icons/111-user.png",
	window: userWin
});

// Create the Sessions window
var contentsWin = Ti.UI.createWindow({
  title: "Sessions",
  backgroundColor: '#fff',
  url: 'includes/view-all-content.js',
});

// Create the user tab
var contentsTab = Ti.UI.createTab({
  title: 'Sessions',
  icon: "icons/137-presentation.png",
  window: contentsWin
});

// Create the Sessions window
var boookMarkWin = Ti.UI.createWindow({
  title: "Favorites",
  backgroundColor: '#fff',
  url: 'includes/favorites.js',
});

// Create the user tab
var boookMarkTab = Ti.UI.createTab({
  title: 'Favorites',
  icon: "icons/163-glasses-1.png",
  window: boookMarkWin
});


if(user.name) {
	userTab.title = user.name;
}
else {
	userTab.title = "User";
}

// Create the search window
var searchWin = Ti.UI.createWindow({
	title: "Search",
	backgroundColor: '#fff',
	url: 'includes/search.js'
});

// Create the search tab
var searchTab = Ti.UI.createTab({
	title: 'Search',
	icon: "icons/06-magnify.png",
	window: searchWin,
});

// Create the maps window
var mapsWin = Ti.UI.createWindow({
	title: "Maps",
	backgroundColor: '#fff',
	url: 'includes/maps.js'
});

// Create the tab window
var mapsTab = Ti.UI.createTab({
	title: "Maps",
	icon: "icons/07-map-marker.png",
	window: mapsWin,
});

// Add the home tab to the tab group
tabGroup.addTab(homeTab);  

// Add the user tab to the tab group
tabGroup.addTab(userTab);

// Add the user tab to the tab group
tabGroup.addTab(contentsTab);


tabGroup.addTab(boookMarkTab);

// Add the search tab to the tab group
tabGroup.addTab(searchTab);

// Add the maps tab
tabGroup.addTab(mapsTab);

// open tab group
tabGroup.open();


