// initialize firebase
var config = {
apiKey: "AIzaSyBIMxaLdlWZa2HzHULfYYC0UdE0imtQYvY",
authDomain: "train-activity-afff0.firebaseapp.com",
databaseURL: "https://train-activity-afff0.firebaseio.com",
projectId: "train-activity-afff0",
storageBucket: "train-activity-afff0.appspot.com",
messagingSenderId: "825608051446"
};

firebase.initializeApp(config);

var database = firebase.database();
