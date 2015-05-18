var ref = new Firebase("https://luifireapp.firebaseio.com/comments/fireapp");
// prefer pop-ups, so we don't navigate away from the page
ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    if (error.code === "TRANSPORT_UNAVAILABLE") {
      // fall-back to browser redirects, and pick up the session
      // automatically when we come back to the origin page
      ref.authWithOAuthRedirect("google", function(error) { /* ... */ });
    }
  } else if (authData) {
    // user authenticated with Firebase
  }
});
