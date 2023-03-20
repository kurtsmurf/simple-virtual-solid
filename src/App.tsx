import { createEffect, createSignal } from "solid-js";
import style from "./App.module.scss"

const App = () =>
  <>
    <ZoomDemo />
  </>

const ZoomDemo = () => {
  let outerRef: HTMLDivElement;
  let innerRef: HTMLDivElement;

  const [width, setWidth] = createSignal(1000)

  createEffect(() => console.log(width()))

  const zoomIn = () => {
    setWidth(prev => prev * 2)
    outerRef.scrollLeft = outerRef.scrollLeft * 2 + outerRef.clientWidth / 2
  }

  const zoomOut = () => {
    outerRef.scrollLeft = (outerRef.scrollLeft - outerRef.clientWidth / 2) / 2
    setWidth(prev => prev / 2)
  }

  return (
    <section class={style.zoomDemo}>
      <button onClick={zoomIn}>zoom in</button>
      <button onClick={zoomOut}>zoom out</button>
      <div class={style.outer} ref={outerRef}>
        <div class={style.inner} ref={innerRef} style={`--content-width: ${width()}px`}>
          <div class={style.mid}></div>
        </div>
      </div>
    </ section>
  );
};

export default App;
