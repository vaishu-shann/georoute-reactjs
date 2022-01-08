const MQTT = require("async-mqtt"),
    fs = require('fs');

var locDetails = [];
var mqtt_client = null;

async function initialize(filePath) {
    try {
        mqtt_client = await MQTT.connectAsync(`tcp://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`)

        var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        locDetails = obj.geometry.coordinates

        return locDetails.length
    } catch (err) {
        console.log("Error while initializing the connection!", err)
        console.log(err.stack);
    }
}

async function publish(index) {
    try {
        await mqtt_client.publish(process.env.MQTT_TOPIC,  Buffer.from(locDetails[index]));

        // This line doesn't run until the client has disconnected without error
        console.log("Published data into the Topic");
    } catch (err) {
        console.log("Error while trying to publish data!", err)
        console.log(err.stack);
    }
}

async function disconnect() {
    try {
        // This line doesn't run until the server responds to the publish
        await mqtt_client.end();
    } catch (err) {
        console.log("Error while trying to disconnect the connection!", err)
        console.log(err.stack);
    }
}

module.exports = {
    initialize,
    publish,
    disconnect
}