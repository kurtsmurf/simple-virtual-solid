import { createEffect, createSignal } from "solid-js";
import style from "./App.module.scss"

const App = () =>
  <>
    <ZoomDemo />
  </>

const ZoomDemo = () => {
  const ZOOM_FACTOR = 1.1;
  let outerRef: HTMLDivElement;
  let innerRef: HTMLDivElement;

  const [contentWidth, setContentWidth] = createSignal(1000)

  createEffect(() => console.log(contentWidth()))

  const zoomIn = () => {
    setContentWidth(prev => prev * ZOOM_FACTOR)
    // outerRef.scrollLeft = outerRef.scrollLeft * 2 + outerRef.clientWidth / 2
    const center = outerRef.scrollLeft + outerRef.clientWidth / 2
    const nextCenter = center * ZOOM_FACTOR
    const nextScrollLeft = nextCenter - outerRef.clientWidth / 2;
    outerRef.scrollLeft = nextScrollLeft;
  }

  const zoomOut = () => {
    // outerRef.scrollLeft = (outerRef.scrollLeft - outerRef.clientWidth / 2) / 2
    const center = outerRef.scrollLeft + outerRef.clientWidth / 2
    const nextCenter = center / ZOOM_FACTOR
    const nextScrollLeft = nextCenter - outerRef.clientWidth / 2;
    outerRef.scrollLeft = nextScrollLeft;
    setContentWidth(prev => prev / ZOOM_FACTOR)
  }

  return (
    <section class={style.zoomDemo}>
      <button onClick={zoomIn}>zoom in</button>
      <button onClick={zoomOut}>zoom out</button>
      <div class={style.outer} ref={outerRef}>
        <div class={style.inner} ref={innerRef} style={`--contentWidth: ${contentWidth()}px`}>
          <div class={style.mid}></div>
        </div>
      </div>
    </ section>
  );
};

export default App;
