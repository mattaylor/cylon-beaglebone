"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    beaglebone: { adaptor: "beaglebone" }
  },

  devices: {
    sensor: { driver: "analogSensor", pin: "P9_33" },
    led: { driver: "led", pin: "P9_14" },
  },

  work: function(my) {
    every((0.1).seconds(), function() {
      var brightness = my.sensor
        .analogRead()
        .fromScale(0, 1799)
        .toScale(0, 255) | 0;
      console.log("brightness => ", brightness);
      my.led.brightness(brightness);
    });
  }
}).start();
