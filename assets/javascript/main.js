$(document).ready(function() {

    // add remove button feature
    // add auto refresh feature

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
    
    $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var firstTrain = $('#trainTime').val().trim();
        var trainFreq = $('#trainFreq').val().trim();
        
        var trainUpdate = {
            
            name: trainName,
            place: destination,
            firstTrain: firstTrain,
            frequency: trainFreq
        }
        
        database.ref().push(trainUpdate);
        
        
        $('form')[0].reset();
        
    });
    
    database.ref().on("child_added", function(childSnapshot) {
        
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().place;
        var firstTrain = childSnapshot.val().firstTrain;
        var trainFreq = childSnapshot.val().frequency;
        
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
        
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);
        
        var minsTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minsTillTrain);
        
        var nextTrain = moment().add(minsTillTrain, "minutes");
        console.log("ARRIVAL TIME: "  + moment(nextTrain).format("HH:mm"));
        
        var nextTrainFormated = moment(nextTrain).format("HH:mm");
        
        var newTrain = "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" + nextTrainFormated + "</td><td>" + minsTillTrain  + "</td></tr>";

        $("table tbody").append(newTrain);
        
    });
    
    $('#backToTop').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate({scrollTop:0}, '500');
        
    });

});