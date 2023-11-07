const WebSocket = require("ws");
const accessKey = "be7213f6-350f-47b0-8a65-867b340556a2";

const socketUrl = "wss://test.lisuns.com:4576/";

socket = new WebSocket(socketUrl);

function doSend(message) {
	socket.send(JSON.stringify(message));
}

socket.onopen = function (event) {
	console.log("WebSocket connection opened.");

	// Authenticate with the server
	Authenticate();
};

// Function to handle WebSocket message event
socket.onmessage = function (event) {
	const response = JSON.parse(event.data);
	console.log("Received message: ", response);

	if (
		response.MessageType === "AuthenticateResult" &&
		response.Complete === true
	) {
		console.log("Authentication successful");

		// Once authenticated, you can send other data requests here
		// Example: Send a request to subscribe to real-time market data

		getLimitation()
	}
};

// Function to send an authentication request
function Authenticate() {
	console.log("Authenticating...");
	const message = {
		MessageType: "Authenticate",
		Password: accessKey,
	};
	doSend(message);
}

// Function to send a request to subscribe to real-time market data
function SubscribeRealtime() {
	console.log("Subscribing to real-time market data...");
	const message = {
		MessageType: "SubscribeRealtime",
		Exchange: "NFO",
		InstrumentIdentifier: "FUTIDX_BANKNIFTY_24NOV2016_XX_0",
	};
	doSend(message);
}

function getInstrumentTypes() {
	const message = {
		MessageType: "GetInstrumentTypes",
		Exchange: "NSE Stocks",
	};
	doSend(message);
}

function getExchanges() {
	const message = {
		MessageType: "GetExchanges",
	};
	doSend(message);
}

function getInstruments() {
	const message = {
		MessageType: "GetInstruments",
		Exchange: "NFO",
		InstrumentType: "FUTIDX",
	};
	doSend(message);
}

function getProducts() {
	const message = {
		MessageType: "GetProducts",
		Exchange: "NFO",
		InstrumentType: "FUTIDX",
	};
	doSend(message);
}

function getLimitation() {
	const request = {
		MessageType: "GetLimitation",
	};
	const message = JSON.stringify(request);
doSend(message)
}
