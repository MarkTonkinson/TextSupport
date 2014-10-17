var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var twilio = require('twilio');
var client = new twilio.RestClient('AC97bbae9260b12a30559f5254d6a37925','78410cc430e678533bae6db1520fe7b9');
var Firebase = require('firebase');

var myRootRef = new Firebase('https://mttextsupport.firebaseio.com/numbers');



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/support/messages/:number', function(req, res){
	//Send an SMS text message
	
	var reply = "Text Support Says: " + req.body.message;
	var toNum = req.param('number'); //param in the documentation said you could notate it this way

	console.log("the " + reply + " message is being sent to: " + toNum);
	client.sms.messages.create({

	    to: toNum, // Any number Twilio can deliver to
	    from: '+12178920083', // A number you bought from Twilio and can use for outbound communication
	    body: reply// body of the SMS message

}, function(error, responseData) { //this function is executed when a response is received from Twilio

    if (!error) { // "err" is an error received during the request, if any
    	res.json(responseData);
        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body.message); // outputs "word to your mother."

    } else{
    	console.log(error.code + " : something went wrong")
    }

});

})

app.get('/support/resources/:resource_name', function(req, res){
	//var path = req.param('resource_name');
	console.log('hi');
	console.log(req.param('resource_name'));
	if(req.param('resource_name') === "FakeCeaseandDesist.pdf") {

		res.status(200).sendFile('FakeCeaseandDesist.pdf', {root: './public'});
	}
});


app.listen(8899, function(){
	console.log("listening on 8899");
});