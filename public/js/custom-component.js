if (typeof DEBUG === "undefined") {
  DEBUG = 0;
}

AFRAME.registerComponent("unfolded-cube-position", {
  schema: {},

  init: function() {
    this.globalPosition = new THREE.Vector3();

    this.componentName = "unfolded-cube-position";
    this.currentFace = 1;
    this.currentDirection = 0;

    DEBUG >= debugINFO && console.log("Attaching " + this.componentName + " to the entity ");
    DEBUG >= debugINFO && console.log(this.el);


    // A throttled logging function to that can be called from the tick functions
    this.throttledLog = AFRAME.utils.throttle(this.log, 1000 / 1.0, this);

    // Throttle the tick function to run at most at 60fps
    this.tick = AFRAME.utils.throttleTick(this.tick, 1000 / 60.0, this);
  },

  // The function to run in the render loop
  tick: function(t, dt) {
    // Use this.throttledLog to log 

    // this.el.object3D.getWorldPosition(this.globalPosition);

    this.globalPosition = this.el.object3D.position
    this.trackCurrentFace(t, dt);
    DEBUG >= debugINFO && this.throttledLog(t, dt, "");

  },

  // A logging fuction
  log: function(t, dt, str) {
    console.log(str);
    console.log("currentFace = " + this.currentFace);
    console.log("currentDirection = " + this.currentDirection);
    // console.log("currentPosition = " + this.globalPosition.x + " " + this.globalPosition.y + " " + this.globalPosition.z);
  },

  // A function to keep track of the face
  trackCurrentFace(t, dt) {

    let nextFace, nextDirection;
    let jump = false;

    if (this.globalPosition.x > 5) {
      [nextFace, nextDirection] = this.faceTransitionFunction(this.currentFace, 0 - this.currentDirection);
      this.globalPosition.x -= 10;
      jump = true;
    }
    if (this.globalPosition.x < -5) {
      [nextFace, nextDirection] = this.faceTransitionFunction(this.currentFace, 180 - this.currentDirection);
      this.globalPosition.x += 10;
      jump = true;
    }
    if (this.globalPosition.z > 5) {
      [nextFace, nextDirection] = this.faceTransitionFunction(this.currentFace, 90 - this.currentDirection);
      this.globalPosition.z -= 10;
      jump = true;
    }

    if (this.globalPosition.z < -5) {
      [nextFace, nextDirection] = this.faceTransitionFunction(this.currentFace, 270 - this.currentDirection);
      this.globalPosition.z += 10;
      jump = true;
    }

    if (jump) {
      DEBUG >= debugINFO && this.log(t, dt, String(nextFace) + " " + String(nextDirection));
      this.currentFace = nextFace;
      this.currentDirection = (360 + nextDirection) % 360
    }

  },

  faceTransitionFunction: function(face, direction) {
    direction = (360 + direction) % 360;
    // DEBUG >= debugINFO && console.log(direction);
    switch (face) {
      case 1:
        switch (direction) {
          case 0:
            return [2, 0]
            break;
          case 90:
            return [3, 0]
            break;
          case 180:
            return [4, 0]
            break;
          case 270:
            return [5, 0]
            break;
        }
        break;
      case 2:
        switch (direction) {
          case 0:
            return [4, 0]
            break;
          case 90:
            return [3, -90]
            break;
          case 180:
            return [1, 0]
            break;
          case 270:
            return [5, 90]
            break;
        }
        break;
      case 3:
        switch (direction) {
          case 0:
            return [2, 90]
            break;
          case 90:
            return [3, -90]
            break;
          case 180:
            return [4, -90]
            break;
          case 270:
            return [1, 0]
            break;
        }
        break;
      case 4:
        switch (direction) {
          case 0:
            return [1, 0]
            break;
          case 90:
            return [3, 90]
            break;
          case 180:
            return [2, 0]
            break;
          case 270:
            return [5, -90]
            break;
        }
        break;
      case 5:
        switch (direction) {
          case 0:
            return [2, -90]
            break;
          case 90:
            return [1, 0]
            break;
          case 180:
            return [4, 90]
            break;
          case 270:
            return [6, 0]
            break;
        }
        break;
      case 6:
        switch (direction) {
          case 0:
            return [2, 180]
            break;
          case 90:
            return [5, 0]
            break;
          case 180:
            return [4, 180]
            break;
          case 270:
            return [3, 0]
            break;
        }
        break;
    }
  }
});




