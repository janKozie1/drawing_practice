// src/draw.ts
export class DrawCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drawing = false;

  private dpr = Math.min(window.devicePixelRatio || 1, 2);

  // --- Undo stack ---
  private undoStack: ImageData[] = [];
  private maxUndo = 30;

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

  // Save canvas state for undo
  private saveState(): void {
    const snapshot = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.undoStack.push(snapshot);

    if (this.undoStack.length > this.maxUndo) {
      this.undoStack.shift();
    }
  }

  // Undo last action
  undo(): void {
    if (this.undoStack.length === 0) return;

    const last = this.undoStack.pop()!;
    this.ctx.putImageData(last, 0, 0);
  }

  private resize(): void {
    const cssW = this.canvas.clientWidth;
    const cssH = this.canvas.clientHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.max(1, Math.floor(cssW * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(cssH * this.dpr));

    this.canvas.style.width = `${cssW}px`;
    this.canvas.style.height = `${cssH}px`;

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private start(e: PointerEvent): void {
    // Save state before starting a new stroke
    this.saveState();

    this.drawing = true;
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
    // Save state before clearing
    this.saveState();

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getImage(): string {
    return this.canvas.toDataURL("image/png");
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getDPR(): number {
    return this.dpr;
  }
}
