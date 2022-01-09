import React, { Component } from "react";

import Route from "./components/route";
// var mqtt    = require('mqtt');
// var options = {
// 	protocol: 'mqtts',
// 	// clientId uniquely identifies client
// 	// choose any string you wish
// 	clientId: 'b0908853' 	
// };
// var client  = mqtt.connect('mqtt://test.mosquitto.org:8081', options);

// // preciouschicken.com is the MQTT topic
// client.subscribe('broker.hivemq.com');
class App extends Component {
 
 
  render() {
    return (
      <>
        <Route />
      </>
    );
  }
}

export default App;
