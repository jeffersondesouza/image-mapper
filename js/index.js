(function() {
  const canvas = document.getElementById("canvas");
  const canvas2 = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const context2 = canvas.getContext("2d");

  const canvasX = canvas.offsetLeft;
  const canvasY = canvas.offsetTop;
  let rect1 = [];
  let rect2 = [];
  let isContext2 = false;

  let state = {
    isMousedown: false,
    mouseDownX: 0,
    mouseDownY: 0
  };

  const setState = newState => {
    if (!newState || typeof newState !== "object") {
      return;
    }
    state = { ...state, ...newState };
  };

  document.getElementById("context1").addEventListener("click", () => {
    isContext2 = false;
  });

  document.getElementById("context2").addEventListener("click", () => {
    isContext2 = true;
  });

  canvas.addEventListener("mousedown", event => {
    const x = event.clientX;
    const y = event.clientY;
    setState({
      isMousedown: true,
      mouseDownX: x - canvasX,
      mouseDownY: y - canvasY
    });
  });

  canvas.addEventListener("mouseup", event => {
    console.log("mouseup:", state.isMousedown);
    setState({ isMousedown: false });
  });

  canvas.addEventListener("mousemove", event => {
    if (state.isMousedown) {
      if (!isContext2) {
        if (rect2.length) {
        }
        if (rect2.length) {
          console.log('rect2:', rect2)
          context2.clearRect(rect2[0], rect2[1], rect2[2], rect2[3]);
        }

        const mouseX = parseInt(event.clientX - canvasX);
        const mouseY = parseInt(event.clientY - canvasY);

        const width = mouseX - state.mouseDownX;
        const height = mouseY - state.mouseDownY;

        context2.beginPath();

        context2.rect(state.mouseDownX, state.mouseDownY, width, height);

        rect2 = [state.mouseDownX, state.mouseDownY, width, height];

        context2.strokeStyle = "black";
        context2.lineWidth = 1;
        context2.stroke();
      } else {
        if (rect1.length) {
          console.log('rect1:', rect1)
          context.clearRect(rect1[0], rect1[1], rect1[2], rect1[3]);
        }

        const mouseX = parseInt(event.clientX - canvasX);
        const mouseY = parseInt(event.clientY - canvasY);

        const width = mouseX - state.mouseDownX;
        const height = mouseY - state.mouseDownY;

        context.beginPath();

        context.rect(state.mouseDownX, state.mouseDownY, width, height);
        rect1 = [state.mouseDownX, state.mouseDownY, width, height];

        context.strokeStyle = "red";
        context.lineWidth = 1;
        context.stroke();
      }
    }
  });

  context.fillRect(0, 0, 40, 40);
})();
