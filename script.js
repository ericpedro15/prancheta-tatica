const elementoArrastavel = document.querySelectorAll(".jogador");

let inicialX = 0,
    inicialY = 0;
let moverElemento = false;

//Eventos do Objeto
let eventos = {
    mouse: {
      down: "mousedown",
      move: "mousemove",
      up: "mouseup",
    },
    touch: {
      down: "touchstart",
      move: "touchmove",
      up: "touchend",
    },
  };
  
  let tipoDispositivo = "";
  
  //Detectar dispositivo de toque
  const ehTouch = () => {
    try {
      //Tentamos criar TouchEvent (ele falharia para desktops e lançaria um erro)
      document.createEvent("TouchEvent");
      tipoDispositivo = "touch";
      return true;
    } catch (e) {
      tipoDispositivo = "mouse";
      return false;
    }
  };
  
  ehTouch();

elementoArrastavel.forEach((elementoArrastavel) =>{
    //Start (mouse down / touch start)
elementoArrastavel.addEventListener(eventos[tipoDispositivo].down, (e) => {
    e.preventDefault();
    //initial x and y points
    inicialX = !ehTouch() ? e.clientX : e.touches[0].clientX;
    inicialY = !ehTouch() ? e.clientY : e.touches[0].clientY;
  
    //Start movement
    moverElemento = true;
  });
  
  //Move
  elementoArrastavel.addEventListener(eventos[tipoDispositivo].move, (e) => {
    //if movement == true then set top and left to new X andY while removing any offset
    if (moverElemento) {
      e.preventDefault();
      let newX = !ehTouch() ? e.clientX : e.touches[0].clientX;
      let newY = !ehTouch() ? e.clientY : e.touches[0].clientY;
      elementoArrastavel.style.top =
        elementoArrastavel.offsetTop - (inicialY - newY) + "px";
      elementoArrastavel.style.left =
        elementoArrastavel.offsetLeft - (inicialX - newX) + "px";
      inicialX = newX;
      inicialY = newY;
    }
  });
  
  //mouse up / touch end
  elementoArrastavel.addEventListener(
    eventos[tipoDispositivo].up,
    (pararMovimento = (e) => {
      moverElemento = false;
    })
  );
  
  elementoArrastavel.addEventListener("mouseleave", pararMovimento);
  elementoArrastavel.addEventListener(eventos[tipoDispositivo].up, (e) => {
    moverElemento = false;
  });
})
