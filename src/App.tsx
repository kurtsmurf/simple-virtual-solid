import { createSignal } from "solid-js";
import style from "./App.module.scss";

const App = () => (
  <>
    <ZoomDemo />
  </>
);

const ZoomDemo = () => {
  const ZOOM_FACTOR = 1.1;

  let outerRef: HTMLDivElement;
  let innerRef: HTMLDivElement;

  const [contentWidth, setContentWidth] = createSignal(1000);

  const zoomIn = () => {
    setContentWidth((prev) => prev * ZOOM_FACTOR);
    const center = outerRef.scrollLeft + outerRef.clientWidth / 2;
    const nextCenter = center * ZOOM_FACTOR;
    const nextScrollLeft = nextCenter - outerRef.clientWidth / 2;
    outerRef.scrollLeft = nextScrollLeft;
  };

  const zoomOut = () => {
    setContentWidth((prev) => prev / ZOOM_FACTOR);
    const center = outerRef.scrollLeft + outerRef.clientWidth / 2;
    const nextCenter = center / ZOOM_FACTOR;
    const nextScrollLeft = nextCenter - outerRef.clientWidth / 2;
    outerRef.scrollLeft = nextScrollLeft;
  };

  /**
   * TODO: preserve cursor position relative to content during zoom 
   */
  const wheelZoom = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaX + e.deltaY;
    if (delta < 0) {
      zoomOut();
    } else if (delta > 0) {
      zoomIn();
    }
  }

  return (
    <section class={style.zoomDemo}>
      <button onClick={zoomIn}>zoom in</button>
      <button onClick={zoomOut}>zoom out</button>
      <div class={style.outer} ref={outerRef} onWheel={wheelZoom}>
        <div
          class={style.inner}
          ref={innerRef}
          style={`--contentWidth: ${contentWidth()}px`}
        >
          <div class={style.mid}></div>
        </div>
      </div>
    </section>
  );
};

export default App;
