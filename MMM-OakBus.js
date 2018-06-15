Module.register("MMM-OakBus",{
	// Default module config.
	defaults: {
	},

	getScripts: function(){
 		return [
		'https://code.jquery.com/jquery-3.3.1.min.js'
		]
	}

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		var url = "https://busfinder.oakvilletransit.ca/bustime/wireless/html/eta.jsp?route=20&direction=OAKVILLE+GO&id=3045&showAllBusses=on";
		
		$.get(url, function(data){
			var elements = $(data);
			var found = $("body > strong:nth-child(18)", elements);
			wrapper.innerHTML = found.val();
			return wrapper;
		});
	}
});
