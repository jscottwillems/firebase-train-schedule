$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyBsZbpqIkUvURSKGWiukwE7HemufIVurN0",
        authDomain: "train-schedule-e2835.firebaseapp.com",
        databaseURL: "https://train-schedule-e2835.firebaseio.com",
        projectId: "train-schedule-e2835",
        storageBucket: "train-schedule-e2835.appspot.com",
        messagingSenderId: "551724273577"
      };

    firebase.initializeApp(config);

    var database = firebase.database();

    // set variable trainSchedule equal to empty variable that will hold all possible train arrival times based on first train time and frequency

    $('#submitBtn').on('click', function(event) {
        event.preventDefault();

        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var trainTime = $('#trainTime').val().trim();
        var trainFreq = $('#trainFreq').val().trim();
        // set variable currentTime equal to current time
        // set variable nextTrain equal to next trainSchedule time closest to current time
        // set variable minsTo equal to the result of subtracting the nextTrain time from the current time

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(trainFreq);

        var markup = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" + 'nextTrain' + "</td><td>" + 'minsTo'  + "</td></tr>";
                $("table tbody").append(markup);

    });

    $('#backToTop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '500');
    });


});