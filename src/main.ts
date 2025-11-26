import "./styles.css";
import { ThreeScene } from "./threeScene.ts";
import { DrawCanvas } from "./draw.ts";
import { getElements, type AppElements } from "./setup/index.ts";

const setup = (appElements: AppElements): void => {
  const {
    drawCanvas: drawCanvasElement,
    threeScene: threeSceneElement,
    startBtn,
    durationInput,
    retryBtn,
    controlsContainer,
    nextBtn,
  } = appElements;

  const drawCanvas = new DrawCanvas(drawCanvasElement);
  const threeScene = new ThreeScene(threeSceneElement);

  const onStart = (): void => {
    drawCanvas.clear();

    const seconds = parseInt(durationInput.value, 10);

    startBtn.style.display = "none";
    controlsContainer.style.display = "none";

    setTimeout(showOverlay, seconds * 1000);
  };

  startBtn.onclick = () => {
    threeScene.randomizeCubeView();
    onStart();
  };

  function showOverlay(): void {
    const drawCanvasEl = drawCanvas.getCanvas();
    const ctx = drawCanvasEl.getContext("2d")!;

    retryBtn.style.display = "block";
    nextBtn.style.display = "block";
    controlsContainer.style.display = "flex";

    const dpr = 1 / drawCanvas.getDPR();

    const cubeImg = threeScene.getImage();
    const imgCube = new Image();
    imgCube.src = cubeImg;

    imgCube.onload = () => {
      const userDrawing = drawCanvasEl.toDataURL("image/png");
      const imgDraw = new Image();
      imgDraw.src = userDrawing;

      imgDraw.onload = () => {
        ctx.clearRect(
          0,
          0,
          drawCanvasEl.width * dpr,
          drawCanvasEl.height * dpr
        );
        ctx.drawImage(
          imgCube,
          0,
          0,
          drawCanvasEl.width * dpr,
          drawCanvasEl.height * dpr
        );
        ctx.drawImage(
          imgDraw,
          0,
          0,
          drawCanvasEl.width * dpr,
          drawCanvasEl.height * dpr
        );
      };
    };
  }

  document.onkeydown = (e) => {
    if (e.key === "t") {
      threeScene.randomizeCubeView();
      onStart();
    } else if (e.key === "r") {
      onStart();
    } else if (e.ctrlKey && e.key.toLowerCase() === "z") {
      drawCanvas.undo();
    }
  };

  retryBtn.onclick = () => {
    onStart();
  };

  nextBtn.onclick = () => {
    threeScene.randomizeCubeView();
    onStart();
  };
};

setup(
  getElements({
    drawCanvasId: "drawCanvas",
    threeSceneId: "threeCanvas",
    startBtnId: "startBtn",
    durationInputId: "durationInput",
    overlayContainerId: "overlayContainer",
    overlayImageId: "overlayImage",
    retryBtnId: "retryBtn",
    nextBtnId: "nextBtn",
    controlsContainerId: "controls",
  })
);
