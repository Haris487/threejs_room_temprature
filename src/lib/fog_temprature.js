import { Singleton } from "./singleton"
import {outerBoxSize} from "./constants"
const THREE = Singleton.getInstance().THREE;


export class FogTemprature {
  constructor({
    pos,
    temperature,
    size,
  }) {
    this.temperature = temperature;
    this.pos = pos;
    this.size = size;
  }
  
  getColorByTemperature(temperature) {
    if (temperature <= 20) {
      return '#0000ff';
    } else if (temperature >= 40) {
      return '#ff0000';
    } else {
      // Calculate color between blue and red based on temperature range
      const blueValue = 255 * (25 - temperature) / 5;
      const greenValue = 255 * (temperature - 20) / 5;
      const redValue = 0
      
      // Convert RGB values to hexadecimal format
      const blueHex = Math.round(blueValue).toString(16).padStart(2, '0');
      const redHex = Math.round(redValue).toString(16).padStart(2, '0');
      const greenHex = Math.round(greenValue).toString(16).padStart(2, '0');
      
      return `#${redHex}${greenHex}${blueHex}`;
    }
  }

  getMaterial() {
    const material =  new THREE.MeshBasicMaterial({ color: this.getColorByTemperature(this.temperature) });
    material.transparent = true;
    material.opacity = 0.8
    return material;
  }

  create() {
    const geometery = new THREE.BoxGeometry(this.size.w, this.size.h, this.size.d);
    
    const fog_temprature = new THREE.Mesh(geometery, this.getMaterial());
    const scene = Singleton.getInstance().scene;
    fog_temprature.position.x = (-this.pos.x + outerBoxSize.w/2) - (this.size.w/2);
    fog_temprature.position.y = (-this.pos.y + outerBoxSize.h/2) - (this.size.h/2);
    fog_temprature.position.z = (-this.pos.z + outerBoxSize.d/2) - (this.size.d/2);
    fog_temprature.layers.enable(1);
    scene.add(fog_temprature);
    this.fog_temprature = fog_temprature;
  }
}