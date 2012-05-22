/**
 * This is the home window
 * 
 * It doesn't do anything fancy, the only thing it does is to create a table
 * with links to other windows that actually demonstrates the functionality
 * 
 * To see how a table is created see the file controls.js in Kitchen Sink
 */

// Create a new variable to hold the current window
var win = Titanium.UI.currentWindow;

Ti.UI.currentWindow.addEventListener('open', function() {
  if (Titanium.App.Properties.getInt("userUid")) {
     // Create a user variable to hold some information about the user
     var user = {
      uid: Titanium.App.Properties.getInt("userUid"),
      name: Titanium.App.Properties.getString("userName"),
     }
     alert('Welcome ' + user.name);
  }
})


Ti.UI.currentWindow.addEventListener('focus', function() {
// create table view data object
var data = [
    {title:'Login', hasChild:true, test:'includes/login.js'},
	  //{title:'Get Node', hasChild:true, test:'includes/get-node.js'},
	  {title:'Create content', hasChild:true, test:'includes/post.js'},
	  //{title:'Create account', hasChild:true, test:'includes/create-account.js'},
	  {title:'View all content', hasChild:true, test:'includes/view-all-content.js'},
	  {title:'Favorites', hasChild:true, test:'includes/favorites.js'},
];
 
// create table view
var tableview = Titanium.UI.createTableView({
	data:data
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title,
			backgroundColor:'#fff',
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
});

var logo = Ti.UI.createImageView({
    image: 'http://2012.phpday.it/wp-content/themes/phpday/img/logo_phpday.png',
    //left: 10,
    //top: 5,
    width: 'auto',
    height: 'auto',
});

// add table view to the window
win.add(logo);
//win.add(tableview);

/**
 *************************************
 * CREATE THE POST BUTTON
 *************************************
 */
if (Titanium.App.Properties.getInt("userUid")) {

  // Create a user variable to hold some information about the user
  var user = {
    uid: Titanium.App.Properties.getInt("userUid"),
    name: Titanium.App.Properties.getString("userName"),
  }
  
  // For users who created an account, they will be logged in but there will be no session id
  // or session_name 
  if(Titanium.App.Properties.getString("userSessionId")) {
    user.sessid = Titanium.App.Properties.getString("userSessionId");
  }
  
  if(Titanium.App.Properties.getString("userSessionName")) {
    user.session_name = Titanium.App.Properties.getString("userSessionName");
  }
    
  // Create a new button
  var rightButton = Ti.UI.createButton({
    title: 'Post',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE
  });
  
  var logout = Ti.UI.createButton({
    title: 'Logout',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE
  });
  
  
  logout.addEventListener("click", function() {
    var logoutWindow = Ti.UI.createWindow({
      // title of the window
      title: "Logout",
      
      // the modal indicates that this window will open outside the tabgroup
      modal: true,
      
      // url to the post file
      url: 'includes/login.js',
      
      // do not hide the navigation bar
      navBarHidden: false,
      
      // close the window on close
      exitOnClose: true,
      
      backgroundColor:'#fff'
    });
    logoutWindow.open();
  });

  // Create a new event listener for the rightButton
  rightButton.addEventListener("click", function() {
    // Create a new window here to show the form
    var postWin = Ti.UI.createWindow({
      // title of the window
      title: "Post",
      
      // the modal indicates that this window will open outside the tabgroup
      modal: true,
      
      // url to the post file
      url: 'includes/post.js',
      
      // do not hide the navigation bar
      navBarHidden: false,
      
      // close the window on close
      exitOnClose: true,
    });
    
    // open the window
    postWin.open();
  });

  // We don't add the button to the window, instead, we tell the app
  // to set the button as the right navigation button
  win.setRightNavButton(rightButton);
  win.setLeftNavButton(logout);
}
else {
  var login = Ti.UI.createButton({
    title: 'Login',
    style:Titanium.UI.iPhone.SystemButtonStyle.DONE
  });
  // Create a new event listener for the rightButton
  login.addEventListener("click", function() {
    // Create a new window here to show the form
    var postWin = Ti.UI.createWindow({
      // title of the window
      title: "Login",
      
      // the modal indicates that this window will open outside the tabgroup
      modal: true,
      
      // url to the post file
      url: 'includes/login.js',
      
      // do not hide the navigation bar
      navBarHidden: false,
      
      // close the window on close
      exitOnClose: true,
      backgroundColor:'#fff'
    });
    
    // open the window
    postWin.open();
  });
  win.setLeftNavButton(login);
  //win.setRightNavButton({});
}


});


