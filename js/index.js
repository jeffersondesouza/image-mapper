const picContainerEl = document.getElementById("jsPicContainerEl");

let state = {
  isMousedown: false,
  mouseDownX: picContainerEl.offsetLeft,
  mouseDownY: picContainerEl.offsetTop,
  originX: picContainerEl.offsetLeft,
  originY: picContainerEl.offsetTop
};

let canvas1 = document.createElement("canvas");
canvas1.classList.add("canvas-coordinate");
canvas1.style.top = state.originY;
picContainerEl.appendChild(canvas1);
canvas1.setAttribute("width", "0px");
canvas1.setAttribute("height", "0px");

/* picContainerEl.addEventListener("mousemove", () => {
  console.log("mousemove:");
}); */

picContainerEl.addEventListener("mousedown", event => {
  const x = event.clientX;
  const y = event.clientY;
  setState({
    isMousedown: true,
    mouseDownX: x - state.originX,
    mouseDownY: y - state.originY
  });
});

picContainerEl.addEventListener("mouseup", event => {
  setState({ isMousedown: false });
});

picContainerEl.addEventListener("mousemove", event => {
  if (state.isMousedown) {
    const mouseX = parseInt(event.clientX - state.originX);
    const mouseY = parseInt(event.clientY - state.originY);
    const width = mouseX - state.mouseDownX;
    const height = mouseY - state.mouseDownY;

    canvas1.setAttribute("width", `${width}px`);
    canvas1.setAttribute("height", `${height}px`);
    canvas1.style.borderWidth = "1px";
    canvas1.style.top = `${state.mouseDownY}px`;
    canvas1.style.left = `${state.mouseDownX}px`;
  }
});

/* UTILS */
const setState = newState => {
  if (!newState || typeof newState !== "object") {
    return;
  }
  state = { ...state, ...newState };
};
