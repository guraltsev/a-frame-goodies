if (typeof DEBUG === "undefined") {
  DEBUG = 0;
}

AFRAME.registerComponent("custom-component", {
  schema: {},

  init: function() {
    this.componentName = "custom-component";
    DEBUG > debugINFO || console.log("Attaching " + this.componentName + " to the entity ");
    DEBUG > debugINFO || console.log(this.el);


    // A throttled logging function to that can be called from the tick functions
    this.throttledLog = AFRAME.utils.throttle(console.log, 1000 / 1.0, this)

    // Throttle the tick function to run at most at 60fps
    this.tick = AFRAME.utils.throttleTick(this.tick, 1000 / 60.0, this);
  },

  // The function to run in the render loop
  tick: function(time, timeDelta) {
    // Use this.throttledLog to log 
    DEBUG > debugINFO || this.throttledLog(this.componentName + ": log-tick!");

  }
});
