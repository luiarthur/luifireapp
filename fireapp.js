var ref = new Firebase("https://luifireapp.firebaseio.com/comments/fireapp");
var myUserID = null;

function onGoogleLogin() {
  ref.authWithOAuthPopup("google",function(){});
}
