// Ilya Chmykh - Final Project
// Practicing using jquery when one of the core concepts was already used by javascript/when I knew how

//A page can't be manipulated safely until the document is ready. jQuery detects this state of readiness for you. Could be replaced by window.onload
$(document).ready(function() {
    runDraw();
});

function runDraw() {
    // get references to the canvas element as well as the 2D drawing context
    var canvasDraw = document.getElementById("canvasDraw");
    var context = canvasDraw.getContext("2d");
    // Create buttons for 3 colors 3 sizes, and reset (DOM element creation, deletion or modification)
    
    // create green button
    var greenBtn = document.createElement("BUTTON");
    greenBtn.appendChild(document.createTextNode("GREEN"));
    document.body.appendChild(greenBtn);
    // create red button
    var redBtn = document.createElement("BUTTON");
    redBtn.appendChild(document.createTextNode("RED"));
    document.body.appendChild(redBtn);
    // create blue button
    var blueBtn = document.createElement("BUTTON");
    blueBtn.appendChild(document.createTextNode("BLUE"));
    document.body.appendChild(blueBtn);
    // create default black button
    var blackBtn = document.createElement("BUTTON");
    blackBtn.appendChild(document.createTextNode("BLACK"));
    document.body.appendChild(blackBtn);
    
    // create clear button
    var clearBtn = document.createElement("BUTTON");
    clearBtn.appendChild(document.createTextNode("RESET"));
    document.body.appendChild(clearBtn);
    
    // create thin button
    var thinBtn = document.createElement("BUTTON");
    thinBtn.appendChild(document.createTextNode("THIN |"));
    document.body.appendChild(thinBtn);
    // create medium button
    var medBtn = document.createElement("BUTTON");
    medBtn.appendChild(document.createTextNode("MEDIUM ||"));
    document.body.appendChild(medBtn);
    // create large button
    var thickBtn = document.createElement("BUTTON");
    thickBtn.appendChild(document.createTextNode("THICK |||"));
    document.body.appendChild(thickBtn);
    
    // create input for canvas width 
    var inputWidth = document.createElement("input");
    document.body.appendChild(inputWidth);
    inputWidth.setAttribute("id", "inputWidth");
    inputWidth.placeholder="Width default is 1000";
    // create input for canvas length
    var inputHeight = document.createElement("input");
    document.body.appendChild(inputHeight);
    inputHeight.setAttribute("id", "inputHeight");
    inputHeight.placeholder="Height default is 600";
    // create submit canvas size change
    var submitBtn = document.createElement("BUTTON");
    submitBtn.appendChild(document.createTextNode("RESIZE CANVAS"));
    document.body.appendChild(submitBtn);

    // set default color to black and line thickness to 1 by default (14.1)
    context.strokeStyle = '#000000';
    context.lineWidth = 1;
    
    // use jquery to keep track of button clicks (subbing for an addEventListener for element type button) perform activity indicated by button name
    $(":button").click(function(event) {
        // Set colors between green/red/blue/black  
        if (event.target.textContent == "GREEN") {
            context.strokeStyle = '#008000';
        } else if (event.target.textContent == "RED") {
            context.strokeStyle = '#ff0000';
        } else if (event.target.textContent == "BLUE") {
            context.strokeStyle = '#0000ff';
        } else if (event.target.textContent == "BLACK") {
            context.strokeStyle = '#000000';
        }
        // clear canvas if user confirms
        else if (event.target.textContent == "RESET") {
            var confirmClear = confirm("Are you sure you want to erase your masterpiece?");
            // form validation
            if (confirmClear) {
                context.clearRect(0, 0, canvasDraw.width, canvasDraw.height);
            }
        }
        // set line width thin/medium/thick
        else if (event.target.textContent == "THIN |") {
            context.lineWidth = 1;
        } else if (event.target.textContent == "MEDIUM ||") {
            context.lineWidth = 5;
        } else if (event.target.textContent == "THICK |||") {
            context.lineWidth = 10;
        // resize canvas after validating user input 
        } else if (event.target.textContent == "RESIZE CANVAS"){
            var getWidth = document.getElementById("inputWidth").value;
            var getHeight = document.getElementById("inputHeight").value;
            if(isNaN(getWidth)||isNaN(getHeight)){
                   alert("Both Width and Height need to be a number");
            }
            else if(getWidth===''||getHeight===''){
                  alert("Both Width and Height need to be inputted to reformat");
            }
            else{
                  canvasDraw.height=getHeight;
                  canvasDraw.width=getWidth;
            }
            
        }
        
    })
    
    ;
    
    // Get mouse activity in canvas, act on mouse activity  (Capturing and handling events (beyond just a Do it! button)
    // mousedown event triggers coordinate dataa, and adding a handler to draw a line to wherever the mouse moves to, as well as what to do when user wants to stop drawing
    // Interchangeable for addEventListener for the canvasDraw element on mousedown
    $("#canvasDraw").mousedown(function(mouseEvent) {
        var position = getCoordinates(mouseEvent, canvasDraw);
        context.moveTo(position.X, position.Y);
        context.beginPath();
        // Interchangeable for addEventListener for the canvasDraw element on mousemove, mouseup, mouseout
        // on mouse move, call startDraw function
        $(this).mousemove(function(mouseEvent) {
            startDraw(mouseEvent, canvasDraw, context);
        });
        // when the mouse is no longer pressed, or is off the canvas element, call stopDraw function
        $(this).mouseup(function(mouseEvent) {
            stopDraw(mouseEvent, canvasDraw, context);
        });
        $(this).mouseout(function(mouseEvent) {
            stopDraw(mouseEvent, canvasDraw, context);
        });
    });
}

// draws a line to the x and y coordinates of the mouse event inside the specified element using the specified context
function startDraw(mouseEvent, canvasDraw, context) {
    var position = getCoordinates(mouseEvent, canvasDraw);
    context.lineTo(position.X, position.Y);
    context.stroke();
}

// return  position of the click inside the canvas in relation to the position on the page. This makes up for the canvas not starting at the top/left of the page.
function getCoordinates(mouseEvent, canvasDraw) {
    var x = mouseEvent.pageX - canvasDraw.offsetLeft;
    var y = mouseEvent.pageY - canvasDraw.offsetTop;
    return {
        X: x,
        Y: y
    };
}

// draws a line from the last coordiantes in the path to the end coordinates and unbinds any event handlers which might cause the user to continue drawing without necessary input
function stopDraw(mouseEvent, canvasDraw, context) {
    // draw the line to the finishing coordinates
    startDraw(mouseEvent, canvasDraw, context);
    // using jquery off, can be replaced by removeEventListener on these events
    $(canvasDraw).off("mousemove")
        .off("mouseup")
        .off("mouseout");
}