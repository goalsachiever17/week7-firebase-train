 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqWO5EtQ4c6gNFoPbZ0jikCbN1cS6k-D0",
    authDomain: "fir-project-6b194.firebaseapp.com",
    databaseURL: "https://fir-project-6b194.firebaseio.com",
    projectId: "fir-project-6b194",
    storageBucket: "fir-project-6b194.appspot.com",
    messagingSenderId: "183329493953"
  };
  firebase.initializeApp(config);




var database = firebase.database();

//Button for adding trains
$("#addTrainButton").on("click", function(event) {
  event.preventDefault();

  //  user input
  var trainName = $("#trainInput").val().trim();
  var trainDestination = $("#destinationInput").val().trim();
  var trainStart = $("#firstTrain-input").val().trim();
  var trainFrequency = $("#frequencyInput").val().trim();

  // this object store train data temporary
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // pull train data to the database
  database.ref().push(newTrain);

  // Log everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // create alert when new train is added
  alert("New train added successfully");

  // Clears all of the text-boxes
  $("#trainInput").val("");
  $("#destinationInput").val("");
  $("#firstTrain-input").val("");
  $("#frequencyInput").val("");
});

// Create Firebase event  when new train is added to the database and additional row when there is a user input.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  // Calculate the next arrival
  var tFrequency = trainFrequency;

  // Time is 3:30 AM
  var firstTime = trainStart;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  var trainArrival = moment(nextTrain).format("hh:mm A");


// each train's data is added into the table
$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
trainFrequency + "</td><td>" + trainArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

