import { Singleton } from "./singleton"
const THREE = Singleton.getInstance().THREE;


export class Camera {
  constructor(x, y, z) {
    this.pos = {x, y, z};
  }

  create() {
    const scene = Singleton.getInstance().scene;
    const camera = Singleton.getInstance().camera;
    scene.add(camera);
    camera.position.x = this.pos.x;
    camera.position.y = this.pos.y;
    camera.position.z = this.pos.z;
    this.camera = camera
  }
}