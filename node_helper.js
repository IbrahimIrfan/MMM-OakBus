var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		this.result = null;
	},

	getBus: function(payload) {
		var that = this;
		this.url = payload;

		request({url: this.url, method: 'GET'}, function(error, response, body) {
			// Check to see if we are error free and got an OK response
			if (!error && response.statusCode == 200) {
				that.result = body;
			} else {
				console.log("Error==============" + this.url);
			}

			// We have the response figured out so lets fire off the notifiction
			that.sendSocketNotification('GOT-BUS', {'url': that.url, 'result': that.result});
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET-BUS') {
			this.getBus(payload);
		} 
	}

});
