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

$(document).ready(function() {

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

    database.ref().on('child_added',function (snap) {

        // console.log(snap.val());

        var trainName = snap.val().name;
        var trainDest = snap.val().destination;
        var trainFirst = snap.val().firstDeparture;
        var trainFreq = snap.val().frequency;

        // var trainTime = moment(trainFirst, 'hh:mm a').format('hh:mm a');

        // console.log(trainTime);

        var firstTrainConvert = moment(trainFirst, "HH:mm");
        console.log(firstTrainConvert);

        var currentTime = moment();
        console.log('CURRENT TIME: ' + moment(currentTime).format("hh:mm"));

        var timeBetween = moment().diff(moment(firstTrainConvert), "minutes");
        console.log('DIFFERENCE: ' + timeBetween);

        var timeApart = timeBetween % trainFreq;
        console.log('TIME APART: ' + timeApart);

        var minutesAway = trainFreq - timeApart;
        console.log('MINUTES AWAY: ' + minutesAway);

        var nextArrival = moment().add(minutesAway, "minutes");
        
        console.log('NEXT ARRIVAL: ' + nextArrival);

        var newRow = $('<tr>').append(
            $('<td>').text(trainName),
            $('<td>').text(trainDest),
            $('<td class="centered">').text(trainFreq),
            $('<td class="centered">').text(moment(nextArrival).format('hh:mm a')),
            $('<td class="centered">').text(minutesAway + ' mins away')        
        );

        $('#trainSched > tbody').append(newRow);
        
    });

});
