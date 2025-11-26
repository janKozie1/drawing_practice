type AppElements = {
  drawCanvas: HTMLCanvasElement;
  threeScene: HTMLCanvasElement;
  startBtn: HTMLButtonElement;
  durationInput: HTMLInputElement;
  overlayContainer: HTMLDivElement;
  controlsContainer: HTMLDivElement;
  overlayImage: HTMLImageElement;
  retryBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
};

type ElementsConfig = Readonly<{
  [key in keyof AppElements as `${key}Id`]: string;
}>;

const getElements = (config: ElementsConfig): AppElements => {
  const drawCanvas = document.getElementById(
    config.drawCanvasId
  ) as HTMLCanvasElement;
  const threeScene = document.getElementById(
    config.threeSceneId
  ) as HTMLCanvasElement;
  const startBtn = document.getElementById(
    config.startBtnId
  ) as HTMLButtonElement;
  const durationInput = document.getElementById(
    config.durationInputId
  ) as HTMLInputElement;
  const overlayContainer = document.getElementById(
    config.overlayContainerId
  ) as HTMLDivElement;
  const overlayImage = document.getElementById(
    config.overlayContainerId
  ) as HTMLImageElement;
  const retryBtn = document.getElementById(
    config.retryBtnId
  ) as HTMLButtonElement;
  const nextBtn = document.getElementById(
    config.nextBtnId
  ) as HTMLButtonElement;
  const controlsContainer = document.getElementById(
    config.controlsContainerId
  ) as HTMLDivElement;

  return {
    drawCanvas,
    threeScene,
    startBtn,
    durationInput,
    overlayContainer,
    overlayImage,
    retryBtn,
    controlsContainer,
    nextBtn,
  };
};

export { type AppElements, type ElementsConfig, getElements };
