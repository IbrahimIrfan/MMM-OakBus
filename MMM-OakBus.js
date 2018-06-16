Module.register('MMM-OakBus', {

    defaults: {
            interval:   5000
        },


    start:  function() {
        Log.log('Starting module: ' + this.name);

        // Set up the local values, here we construct the request url to use
        this.loaded = false;
		this.url = "https://busfinder.oakvilletransit.ca/bustime/wireless/html/eta.jsp?route=1&direction=OAKVILLE+GO&id=3146&showAllBusses=on";
        this.result = null;

        // Trigger the first request
        this.getAirQualityData(this);
        },


    getAirQualityData: function(that) {
        that.sendSocketNotification('GET-AIR-QUALITY', that.url);
        setTimeout(that.getAirQualityData, that.config.interval, that);
        },

    getDom: function() {
        // Set up the local wrapper
        var wrapper = null;
        if (this.loaded) {
			wrapper = document.createElement('div');
			found = this.result.indexOf("<hr/>");
			found2 = this.result.indexOf("<hr />");
			wrapper.innerHTML = this.result.substr(found + 5, found2 - found);
		} else {
			wrapper = document.createElement('div');
			wrapper.innerHTML = 'Loading bus route...';
		}

		return wrapper;
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GOT-AIR-QUALITY') {
			this.loaded = true;
			this.result = payload.result;
			this.updateDom();
		}
	}
});
