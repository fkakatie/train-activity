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

$('#submitBtn').click(function() {
    event.preventDefault();

    var trainName = $('#trName').val().trim();
    var trainDest = $('#trDest').val().trim();
    var trainFirst = $('#trFirst').val().trim();
    var trainFreq = $('#trFreq').val().trim();

    // var trainName = $('#trName').val().trim();
    // var trainName = $('#trName').val().trim();
    // var trainName = $('#trName').val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDest,
        firstDeparture: trainFirst,
        frequency: trainFreq
    };

    database.ref().push(newTrain);

    $('#trName').val('');
    $('#trDest').val('');
    $('#trFirst').val('');
    $('#trFreq').val('');

});

database.ref().on('child_added',function (childSnapshot) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstDeparture;
    var trainFreq = childSnapshot.val().frequency;

    var newRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(trainDest),
        $('<td class="centered">').text(trainFreq),
        $('<td class="centered">').text('Next Arrival'),
        $('<td class="centered">').text(trainFirst)        
    );

    $('#trainSched > tbody').append(newRow);
    
});
