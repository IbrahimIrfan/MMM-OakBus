Module.register('MMM-OakBus', {
	defaults: {
		interval:  30000
	},

	start:  function() {
		Log.log('Starting module: ' + this.name);
		this.loaded = false;
		this.result = null;
		this.url = this.config.url;

		// Trigger the first request
		this.getBus(this);
	},

	getBus: function(that) {
		that.sendSocketNotification('GET-BUS', that.config.url);
		setTimeout(that.getBus, that.config.interval, that);
	},

	getDom: function() {
		var wrapper = null;
		if (this.loaded) {
			// parse the webpage
			wrapper = document.createElement('div');
			found = this.result.indexOf("<hr/>");
			found2 = this.result.indexOf("<hr />");
			wrapper.innerHTML = this.result.substr(found + 5, found2 - found);
		} else {
			wrapper = document.createElement('div');
			wrapper.innerHTML = 'Loading bus times...';
		}

		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GOT-BUS') {
			this.loaded = true;
			this.result = payload.result;
			this.updateDom();
		}
	}
});
