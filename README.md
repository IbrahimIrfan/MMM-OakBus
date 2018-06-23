# MMM-OakBus
Real-time Oakville bus transit for MagicMirror.

# Screenshot
![](screenshot.png)

# Setup
In `config.js`, add this snippet to your `modules` array.

```
{
  module: "MMM-OakBus",
  position: "bottom_right",
  config: {
    interval: 50000,
    url: <YOUR_OAKVILLE_BUS_URL>
  }
},
```

Where `<YOUR_OAKVILLE_BUS_URL>` is the link of the bus and stop you want to track from [here](https://busfinder.oakvilletransit.ca/bustime/wireless/html/home.jsp)

For example, if I wanted to track Bus #1 (Trafalgar line), in direction of Oakville Go, at Sheridan College, I would use this link:

```
https://busfinder.oakvilletransit.ca/bustime/wireless/html/eta.jsp?route=1&direction=OAKVILLE+GO&id=3236&showAllBusses=on
```
