const mqtt = require("mqtt");

var client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", function () {
  client.subscribe("geodata");
});

client.on("message", function (topic, message) {
  // if(message){
  console.log(message.toString());
  client.end();
  // }
  // client.end()
});
