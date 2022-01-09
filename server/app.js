require('dotenv').config()
const mqtt_utils = require('./mqtt_utils'),
    path = require('path');

var locLength = 0
var counter = 0

mqtt_utils.initialize(path.join(__dirname, "./geojson.json")).then((val) => {
    locLength = val
});

var refreshId = setInterval(async function () {
    await mqtt_utils.publish(counter);

    if (counter == locLength - 1) {
        // clear the current interval
        clearInterval(refreshId);

        // disconnect the mqtt connection
        await disconnect();
        
        // exit the service gracefully
        process.exit();
    }

    counter++
}, 2000);
