const picContainerEl = document.getElementById("jsPicContainerEl");

let isUsingCanvas1 = true;

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
canvas1.setAttribute("width", "0px");
canvas1.setAttribute("height", "0px");
picContainerEl.appendChild(canvas1);


let canvas2 = document.createElement("canvas");
canvas2.classList.add("canvas-coordinate");
canvas2.style.top = state.originY;
canvas2.setAttribute("width", "0px");
canvas2.setAttribute("height", "0px");
picContainerEl.appendChild(canvas2);


/* picContainerEl.addEventListener("mousemove", () => {
  console.log("mousemove:");
}); */

document.getElementById("canvas2").addEventListener("click", () => {
  isUsingCanvas1 = !isUsingCanvas1;
});

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

    if (isUsingCanvas1) {
      canvas1.setAttribute("width", `${width}px`);
      canvas1.setAttribute("height", `${height}px`);
      canvas1.style.borderWidth = "1px";
      canvas1.style.top = `${state.mouseDownY}px`;
      canvas1.style.left = `${state.mouseDownX}px`;
    }else{
      canvas2.setAttribute("width", `${width}px`);
      canvas2.setAttribute("height", `${height}px`);
      canvas2.style.borderWidth = "1px";
      canvas2.style.borderColor = "red";
      canvas2.style.top = `${state.mouseDownY}px`;
      canvas2.style.left = `${state.mouseDownX}px`;
      
    }
  }
});

/* UTILS */
const setState = newState => {
  if (!newState || typeof newState !== "object") {
    return;
  }
  state = { ...state, ...newState };
};
