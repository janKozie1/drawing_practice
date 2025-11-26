// src/threeScene.ts
import * as THREE from "three";
export class ThreeScene {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private cube: THREE.Mesh;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setClearColor(0xffffff, 1);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(2, 2, 3);
    this.camera.lookAt(0, 0, 0);

    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshNormalMaterial()
    );
    this.scene.add(this.cube);

    window.addEventListener("resize", () => this.onResize());
    this.onResize();
    this.animate();
  }

  randomizeCubeView(): void {
    this.cube.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    this.camera.fov = 40 + Math.random() * 50;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(0, 0, 0);
    this.renderOnce();
  }

  renderOnce(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private animate(): void {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }

  private onResize(): void {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  getImage(): string {
    this.renderOnce();
    return this.renderer.domElement.toDataURL("image/png");
  }

  getCanvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }
}
