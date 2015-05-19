var myUserID = null;
var ref = new Firebase("https://luifireapp.firebaseio.com/comments/");

function onLoginClick() {
  ref.authWithOAuthPopup("google",function(){});
}

ref.onAuth(function(authData) {
  if (authData) {
    myUserID = authData.google.id;
    $("#loginDiv").text(authData.google.displayName);
    var src = "https://www.googleapis.com/plusDomains/v1/people/"+authData.uid;
    $("userPic").attr("src",src);
    console.log(src);
  }
});

function onCommentKeyDown(event) {
  if (event.keyCode == 13) {
    if(myUserID == null) {
      alert("You must log in to leave a comment");
    } else {
      console.log(myUserID+" successfully commented: "+$("#newComment").val());
      ref.push({userid: myUserID, body: $("#newComment").val()});
      $("#newComment").val("");
    }
    event.preventDefault(); // prevents default actions
  }
}

//Create a query for only the last 4 comments
var last4Comments = ref.limit(4);

//Render Comments
last4Comments.on('child_added', function (snapshot) {
  var comment = snapshot.val();
  var newDiv = $("<div/>").addClass("comment").attr("id",snapshot.name()).appendTo("#oldComments");
  FB.api("/" + comment.userid, function(userdata) {
    comment.name = userdata.name;
    newDiv.html(Mustache.to_html($('#template').html(), comment));
  });
});

//Remove deleted comments
last4Comments.on("child_removed", function(snapshot) {
  $("#" + snapshot.name()).remove();
});
