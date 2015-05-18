var myUserID = null;
var ref = new Firebase("https://luifireapp.firebaseio.com/comments/");

function onLoginClick() {
  ref.authWithOAuthPopup("google",function(){});
}

ref.onAuth(function(authData) {
  if (authData) {
    myUserID = authData.google.id;
    $("#loginDiv").text(authData.google.displayName);
  }
});

function onCommentKeyDown(event) {
  if (event.keyCode == 13) {
    if(myUserID == null) {
      alert("You must log in to leave a comment");
    } else {
      console.log(myUserID+" successfully commented: "+$("#newComment").val());
      ref.push({userid: myUserID, body: $("#newComment").val()})
    }
    event.preventDefault(); // prevents default actions
  }
}
