var ref = new Firebase("https://luifireapp.firebaseio.com/comments2");
var myUserID = null;

ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
