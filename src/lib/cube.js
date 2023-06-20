import { Singleton } from "./singleton"
import { FogTemprature } from "./fog_temprature"
import { outerBoxSize } from "./constants"
const THREE = Singleton.getInstance().THREE;


export class Cube {
  constructor(x, y, z, color) {
    this.color = color;
    this.pos = [x, y, z];
  }

  getMaterial(color) {
    return new THREE.MeshBasicMaterial({ color: color });
  }

  create() {
    const cubeEdges = new THREE.Object3D()
    const edgesGeometry = new THREE.EdgesGeometry( new THREE.BoxGeometry(outerBoxSize.w, outerBoxSize.h, outerBoxSize.d) );
    const lineMaterial = new THREE.LineBasicMaterial(0xffff00);
    const edges = new THREE.LineSegments( edgesGeometry, lineMaterial );
    cubeEdges.add(edges);

    this.scene = Singleton.getInstance().scene;
    this.scene.add(cubeEdges);
    this.cubeEdges = cubeEdges;
    Singleton.getInstance().addDebug('cubeEdges',cubeEdges);

    const fog1 = new FogTemprature({
      pos:{x:5,y:5,z:0},
      size : {w: 26, h: 45, d: 25},
      temperature : 20,
    });
    const fog2 = new FogTemprature({
      pos:{x:31,y:5,z:0},
      size : {w:13, h:22, d: 25},
      temperature : 40,
    });
    const fog3 = new FogTemprature({
      pos:{x:31,y:27,z:0},
      size : {w:13, h:22, d: 25},
      temperature : 30,
    });
    // const fog4 = new FogTemprature({
    //   pos:{x:13,y:13,z:0},
    //   size : {w:12, h:12, d: 25},
    //   color : 0xff00ff,
    // });
    const fog5 = new FogTemprature({
      pos:{x:5,y:50,z:0},
      size : {w:26, h:45, d: 25},
      temperature : 35,
    });
    const fog6 = new FogTemprature({
      pos:{x:31,y:50,z:0},
      size : {w:13, h:45, d: 25},
      temperature : 25,
    });
    const fog7 = new FogTemprature({
      pos:{x:44,y:50,z:0},
      size : {w:26, h:45, d: 25},
      temperature : 40,
    });
    // const fog8 = new FogTemprature({
    //   pos:{x:13,y:13,z:0},
    //   size : {w:12, h:12, d: 25},
    //   color : 0xff00ff,
    // });
    Singleton.getInstance().addDebug("fog1",fog1)
    Singleton.getInstance().addDebug("fog2",fog2)
    Singleton.getInstance().addDebug("fog3",fog3)
    Singleton.getInstance().addDebug("fog5",fog5)
    Singleton.getInstance().addDebug("fog6",fog6)
    Singleton.getInstance().addDebug("fog7",fog7)
    fog1.create();
    fog2.create();
    fog3.create();
    fog5.create();
    fog6.create();
    fog7.create();
  }
}