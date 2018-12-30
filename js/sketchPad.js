
// let body = document.body,
//     html = document.documentElement;

// let height = Math.max( body.scrollHeight, body.offsetHeight,
//                        html.clientHeight, html.scrollHeight, html.offsetHeight );

  // let isMobile =    /iPhone|iPad|Android/i.test(navigator.userAgent);
  // if (isMobile) {
  //   document.querySelector('link').outerHTML =
  //    '<link rel="stylesheet" href="padMobile.css">';
  //    location.reload();
  //   // uiContent  = document.querySelector('html').innerHTML;
  //   // document.querySelector('html').innerHTML =  uiContent;
  //
  // } else {
  //   document.querySelector('link').outerHTML =
  //    '<link rel="stylesheet" href="./css/padDesktop.css">';
  // }

  

  // if (screen.width <= 699) {
  // document.location = "mobile.html";
  // }

//   UI: get no of columns
  let noOfColumns;
  function getGridSizeUIandDisplay() {
     noOfColumns =
      document.querySelector('div.ui>input').value;

    displayGridAndActionUI(noOfColumns);
  }

  // Get the input field
  let inputColumns = document.querySelector("div.ui>input");

  // Execute a function when the user releases a key on the keyboard
  inputColumns.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Trigger the button element with a click
      document.querySelector('div.ui>input').blur();
      document.querySelector("div.ui>button").click();
    }
  });


//   UI: set the colour for the drawing
  let selectedColour="black";
  let randomColourOnOff = 'off'
  function getSelectedColourUI() {
    selectedColour = document.querySelector("div>select").value;
    if (selectedColour=="randomColour") {
      randomColourOnOff = 'on';
      selectedColour = getRandomColour();
    } else randomColourOnOff = 'off';


    document.querySelector("div.ui>.colorSelect").style.color=
      selectedColour;
//     document.querySelector("#demo2").innerHTML =  selectedColour;

  }
//   ---------------------------------------------------------


function getRandomColour() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//   Apply the colour for the drawing
  // let sketchOnOff = 'off';
  let sketchOnOff = 'off';
  function getPickGridBoxUI(mouseOverDivBox) {
    if (randomColourOnOff == 'on')
      selectedColour = getRandomColour()
    if (sketchOnOff == 'on')
      mouseOverDivBox.style.backgroundColor = selectedColour;
    else return;
  }
//   ------------------------------------------------------------

//   Toggle rubber on and off
  let rubber = "off";
  function setRubberToolUI() {
    if (rubber== "off"){
        document.querySelectorAll('button')[1].innerHTML = "Rubber ON";
        document.querySelectorAll('button')[1].style.backgroundColor =
          "red";
        rubber = "on";
        selectedColour = "white";
     }
     else {
        document.querySelectorAll('button')[1].innerHTML = "Rubber OFF";
        document.querySelectorAll('button')[1].style.backgroundColor =
          "lightgrey";
        rubber = "off";
        selectedColour = document.querySelector("div>select").value;
        if (selectedColour=="randomColour") {
          randomColourOnOff = 'on';
          selectedColour = getRandomColour();
        } else randomColourOnOff = 'off';

        document.querySelector("div.ui>.colorSelect").style.color=
          selectedColour;

     }
  }

//   ---------------------------------------------------------


// Display Grid
//  displayGridAndActionUI(noOfColumns);

  noOfColumns =  document.querySelector('div.ui>input').value;
  displayGridAndActionUI(noOfColumns);
  function displayGridAndActionUI(noOfColumns){
    // clear pad of divs
    divElements = document.querySelectorAll('div.sketchPad>div')
    while(divElements.length > 0){
     divElements[0].parentNode.removeChild(divElements[0]);
     divElements = document.querySelectorAll('div.sketchPad>div')
    }

    // calculate box size or pixel to be square
    let widthOfDiv =
      document.querySelector('body').clientWidth;
    let heightOfDiv =
      document.querySelector('html').clientHeight;
    let boxWidthHeight =
      widthOfDiv/noOfColumns;
    let noOfRows =
      Math.floor((heightOfDiv-240)/boxWidthHeight);

    // sketchPad will have width and height to fit the max grid boxes
    document.querySelector('div.sketchPad')
       .style.width=widthOfDiv+"px";
    document.querySelector('div.sketchPad')
      .style.height= (noOfRows*boxWidthHeight)+"px";

    document.querySelector('div.sketchPad').style.gridTemplateColumns ='';
    for (i=1; i<=noOfColumns; i++)
      document.querySelector('div.sketchPad').style.gridTemplateColumns += " auto";

    // create 2*2 grid of squares inside the sk
    for (let i=1; i<=(noOfRows*noOfColumns); i++) {
      let divElement=document.createElement('div');
      document.querySelector('div.sketchPad').appendChild(divElement);
      divElement.classList.add('box'+i);
      let str = divElement.outerHTML;
      divElement.outerHTML =
        str.replace("div",'div \
        ontouchstart="funcTouchStart(event)"\
        onmouseover="funcMouseOver(event)"\
        onclick="funcClick(event)"\
        ');
        // ontouchcancel="funcTouchCancel(event)"\
        // ontouchstart="funcTouchStart(event)"\
        // ontouchmove="funcTouchMove(event)"\
        // onmouseover="funcMouseOver(event)"\
        // ontouchleave="funcTouchLeave(event)"\
      // ontouchstart="getPickGridBoxUI(this)"');
//       ontouchstart="mousedownSketchOn()"\
//       ontouchend="mousedownSketchOff()"');

//       divElement.addEventListener("mouseover", getPickGridBoxUI(this));

//       divElement.style.width=boxWidthHeight+"px";
//       divElement.style.height=boxWidthHeight+"px";

//       divElement.classList.add('box'+i);

      document.querySelector('div.box'+i).style.width=boxWidthHeight+"px";
      document.querySelector('div.box'+i).style.height=boxWidthHeight+"px";
//       document.querySelector('div.box'+i).addEventListener("mouseover", getPickGridBoxUI(this));

    }
  }
//--------------------------------------------------------------
let touchObj =null;
function funcTouchStart(event) {
  touchObj = event.changedTouches[0];
  touchObj.target.style.backgroundColor =       selectedColour;
  event.preventDefault();
}

function funcTouchMove(event) {
  touchObj = event.changedTouches[0];
  touchObj.target.style.backgroundColor =  selectedColour;
  if (touchObj.target.className == "box1"){
    touchObj.target.style.backgroundColor =  selectedColour;
  }
}

function funcTouchLeave(event) {
  touchObj = event.changedTouches[0];
  touchObj.target.style.backgroundColor =       selectedColour;
}

function funcTouchCancel(event) {
  touchObj = event.changedTouches[0];
  touchObj.target.style.backgroundColor =       selectedColour;
}



let toElement;
function funcMouseOver(event) {
  if( startDrawing == "on") {
    event.currentTarget.style.backgroundColor =selectedColour;
  }
}

let startDrawing = 'off';
function funcClick(event) {
  event.currentTarget.style.backgroundColor =selectedColour;

  if (startDrawing == 'off')
    startDrawing = 'on';
  else startDrawing = 'off';
}
