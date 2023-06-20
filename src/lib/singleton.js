
const THREE = require('three');

export class Singleton {
  static instance = null;
  constructor(){
    if(!this.instance){
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
      this.loadingScreen = this.createLoadingScreen();
      this.light = new THREE.AmbientLight( 0x898989 );
      this.clock = new THREE.Clock();
      this.delta = this.clock.getDelta();
      this.THREE = THREE;
      this.debug = {};
    }
    else{
      throw new Error("Singleton class can not create its another instance");
    }
  }

  updateDeltaTime(){
    this.delta = this.clock.getDelta();
  }

  static getInstance(){
    if(!this.instance){
      this.instance = new Singleton()
    }
    return this.instance;
  }

  addDebug(name,obj){
    this.debug[""+name] = obj;
  }

  load(){
    this.loadingScreen.hide()
  }

  createLoadingScreen(){
    class LoadingScreen {
      constructor(){
        this.element = document.getElementById( 'loading-screen' );
      }
      hide(){
        this.element.classList.add( 'fade-out' );
        setTimeout( () => this.element.style.display = 'none' , 500 );
      }
    }
    return new LoadingScreen();
  }
}