const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// The callback route used for Android, which will send the callback parameters from Apple into the Android app.
// This is done using a deeplink, which will cause the Chrome Custom Tab to be dismissed and providing the parameters from Apple back to the app.
app.post("/auth/android/callback", (request, response) => {
  const redirect = `intent://callback?${new URLSearchParams(
    request.body
  ).toString()}#Intent;package=${
    process.env.ANDROID_PACKAGE_IDENTIFIER
  };scheme=signinwithapple;end`;

  console.log(`Redirecting to ${redirect}`);

  response.redirect(307, redirect);
});


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});