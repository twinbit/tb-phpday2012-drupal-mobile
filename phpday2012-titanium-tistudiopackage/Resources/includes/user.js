// Include our config file
Ti.include('../config.js');
Ti.include('../lib/redux.js');

// Create a user variable to hold some information about the user
var user = {
	uid: Titanium.App.Properties.getInt("userUid"),
	sessid: Titanium.App.Properties.getString("userSessionId"),
	session_name: Titanium.App.Properties.getString("userSessionName"),
	name: Titanium.App.Properties.getString("userName"),
}

// Create a new variable to map the current window
var win = Ti.UI.currentWindow;

Ti.UI.currentWindow.addEventListener('open', function() {
  getUserInfo();
})

Ti.UI.currentWindow.addEventListener('focus', function() {
  getUserInfo();
})

var getUserInfo = function() {
   // Check if the user is logged in
  if(user.sessid) {
    // Create the scrollview to contain the view
    var view = Titanium.UI.createScrollView({
      contentWidth:'auto',
      contentHeight:'auto',
      showVerticalScrollIndicator:true,
      showHorizontalScrollIndicator:true,
      top: 0,
    });
  
    // Add the view to the window
    win.add(view);
  
    // Define the URL, the full path would be http://example.com/api/rest/user/USERID.json
    var url = REST_PATH + 'user/' + user.uid + '.json';
  
    // Create a new connection in the variable xhr
    var xhr = Titanium.Network.createHTTPClient();
  
    // When the connection loads do:
    xhr.onload = function() {
      // Use the status Code in the variable statusCode
      var statusCode = xhr.status;
      
      Ti.API.log("Status is: " + statusCode);
      
      // Check for the status code = 200
      if(statusCode == 200) {        
        // Create a new variable to contain the response
        var response = xhr.responseText;        
        info(url);
        info(response);
            
        // Create a new variable to process the JSON output and create an object inside data
        var data = JSON.parse(response);
        
        var avatar = SITE_PATH + 'sites/default/files/pictures/' + data.picture.filename;
        
        var d_width = Titanium.Platform.displayCaps.platformWidth;
        var d_height = Titanium.Platform.displayCaps.platformHeight;
        
        // New variable to show the user picture
        // We create an ImageView to hold the image
        var userPicture = Ti.UI.createImageView({
          image: avatar,
          left: 10,
          top: 5,
          width: 150,
          height: 150,
        });
        
        // New variable to show the user name
        var userName = Ti.UI.createLabel({
          text: data.name + ' (' + data.mail + ')',
          font:{fontSize: 12, fontWeight: "bold"},
          left: 160,
          top: 5,
          width: 150,
          height:'auto'
        });
        
        // New variable to show the field "field_fullname"
        var userFullName = Ti.UI.createLabel({
          // Fields have this structure, is the same as any field
          text: data.field_fullname.und[0].value,
          font: {fontSize: 24, fontWeight: "bold"},
          left: 160,
          top: 25,
          width: 'auto',
          height:'auto'
        });
        
        // Create a label for the field "field_about"
        var userAbout = Ti.UI.createLabel({
          // Because D7 uses an object for the body itself including the language
          text: data.field_about.und[0].value,
          color:'#000',
          textAlign:'left',
          font:{fontSize: 14, fontWeight: 'normal'},
          width: 'auto',
          top: 90,
          height: "auto",
          left: 160,
          right: 10,
        });
  
        // New variable to show the field "field_country"
       var userCountry = Ti.UI.createLabel({
          text: 'Location:',
          font: {fontSize:14, fontWeight: "bold"},
          height: 'auto',
          top: 200,
          left: 30,
        });
    
          
       var lat = data.field_location.und[0].lat;
       var lng = data.field_location.und[0].lng
    
       var map_avatar = Ti.UI.createImageView({ image: avatar, width: 30, height: 30, backgroundColor: '#000', preventDefaultImage: true });
       var user_location = Titanium.Map.createAnnotation({
          latitude: lat,
          longitude: lng,
          title: data.name,
          subtitle: data.field_fullname.und[0].value,
          pincolor: Titanium.Map.ANNOTATION_RED,
          animate: true,
          leftView: map_avatar,
          rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
          //leftButton: avatar,
          myid: data.uid // Custom property to uniquely identify this annotation.
      });
      
      var mapview = Titanium.Map.createView({
          mapType: Titanium.Map.STANDARD_TYPE,
          region : {
              latitude : lat,
              longitude : lng,
              latitudeDelta : 0.1,
              longitudeDelta : 0.1
          },
          animate: true,
          regionFit: true,
          userLocation: true,
          annotations: [user_location],
          height: (d_height >= '600' ? '300' : '150'),
          width: (d_height >= '600' ? '300' : '150'),
         // top: 200,
          //userLocation:true,
          left: 30,
          top: 220,
          zoom: 1
      });
      
      // Add each variable (field) to the view
      view.add(userName);
      view.add(userPicture);
      view.add(userFullName);
      view.add(userAbout);
      view.add(userCountry);
      view.add(mapview);
      }
    }
  
    //Open the connection using GET
    xhr.open("GET", url);
  
    // Send the connection, since we're using GET we don't pass anything as argument
    xhr.send();
  }
  else {
    alert("You need to log in first");  
  } 
}
