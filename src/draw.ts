// src/draw.ts
export class DrawCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drawing = false;

  private dpr = Math.min(window.devicePixelRatio || 1, 2);

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    this.resize();
    window.addEventListener("resize", () => this.resize());

    canvas.addEventListener("pointerdown", (e) => this.start(e));
    canvas.addEventListener("pointermove", (e) => this.move(e));
    canvas.addEventListener("pointerup", () => this.stop());
    canvas.addEventListener("pointerleave", () => this.stop());
  }

  private resize(): void {
    // Use DPR so the canvas has correct pixel resolution
    const cssW = this.canvas.clientWidth;
    const cssH = this.canvas.clientHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    // set the internal pixel size
    this.canvas.width = Math.max(1, Math.floor(cssW * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(cssH * this.dpr));

    // keep CSS size unchanged so layout doesn't break
    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;

    // scale drawing operations to DPR
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private start(e: PointerEvent): void {
    this.drawing = true;
    // offsetX/Y are in CSS pixels; because of ctx transform they align correctly
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);
  }

  private move(e: PointerEvent): void {
    if (!this.drawing) return;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "black";
    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
  }

  private stop(): void {
    this.drawing = false;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getImage(): string {
    // canvas.toDataURL uses internal pixel buffer (so DPR aware)
    return this.canvas.toDataURL("image/png");
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getDPR(): number {
    return this.dpr;
  }
}
