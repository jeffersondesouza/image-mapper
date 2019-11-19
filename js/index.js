(function() {
  const picContainerEl = document.getElementById("jsPicContainerEl");

  let state = {
    isMousedown: false,
    mouseDownX: picContainerEl.offsetLeft,
    mouseDownY: picContainerEl.offsetTop,
    originX: picContainerEl.offsetLeft,
    originY: picContainerEl.offsetTop,
    inforAreas: [buildInfoAreaEl("black"), buildInfoAreaEl("red")]
  };

  let isUsingCanvas1 = true;

  picContainerEl.appendChild(state.inforAreas[0]);
  picContainerEl.appendChild(state.inforAreas[1]);

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
        drawInformationArea(state.inforAreas[0], width, height, state);
      } else {
        drawInformationArea(state.inforAreas[1], width, height, state);
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

  function buildInfoAreaEl(color) {
    let infoArea = document.createElement("canvas");
    infoArea.setAttribute("width", "0px");
    infoArea.setAttribute("height", "0px");
    infoArea.style.position = "absolute";
    infoArea.style.top = "0px";
    infoArea.style.borderWidth = "0px";
    infoArea.style.borderColor = color;
    infoArea.style.borderStyle = "solid";
    infoArea.style.zIndex = "9999";
    return infoArea;
  }

  function drawInformationArea(informtionAreaEl, width, height, state) {
    informtionAreaEl.setAttribute("width", `${width}px`);
    informtionAreaEl.setAttribute("height", `${height}px`);
    informtionAreaEl.style.borderWidth = "1px";
    informtionAreaEl.style.top = `${state.mouseDownY}px`;
    informtionAreaEl.style.left = `${state.mouseDownX}px`;
  }
})();
