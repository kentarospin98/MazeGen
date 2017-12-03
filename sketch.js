var algo;

var data;

function setup(){
  createCanvas(640, 480);
  algo = prompt("Which algo do you choose?");

  // Recursive Backtracker
  if(algo == 1){
    data = {};
    data["w"] = data["h"] = 40
    data["cells"] = []
    for(let i = 0; i < 640/data["w"]; i++){
      let row = [];
      for(let j = 0; j < 480/data["h"]; j++){
        row.push([true, true, true, true]) // [Top, Right, Down, Left]
      }
      data["cells"].push(row)
    }
    data["backtracker"] = [];
    data["visited"] = [];
    data["current"] = [0, 0];
  }

}

function draw(){
  background(0);
  fill(128);
  stroke(255);
  if(algo == 1){
    ccell = data["cells"][data["current"][0]][data["current"][1]];
    direction = floor(random(4));
    while(!ccell[direction]){
      direction = floor(random(4));
    }

    ccell[direction] = false;

    //if()

    for(let i = 0; i < data["cells"].length; i++){
      for(let j = 0; j < data["cells"][i].length; j++){
        //rect(data["w"]*i, data["h"]*j, data["w"], data["h"]);
        line(data["w"]*i, data["h"]*j,data["w"]*(i+1), data["h"]*j) // Top
        line(data["w"]*(i+1), data["h"]*j,data["w"]*(i+1), data["h"]*(j+1)) // Right
        line(data["w"]*(i+1), data["h"]*(j+1),data["w"]*i, data["h"]*(j+1)) //Down
        line(data["w"]*i, data["h"]*(j+1),data["w"]*i, data["h"]*j) // Left
      }
    }
  }

}

function drawlines(i, j, c){
  c[0] ? line(data["w"]*i, data["h"]*j,data["w"]*(i+1), data["h"]*j) : null // Top
  c[1] ? line(data["w"]*(i+1), data["h"]*j,data["w"]*(i+1), data["h"]*(j+1)) : null// Right
  c[2] ? line(data["w"]*(i+1), data["h"]*(j+1),data["w"]*i, data["h"]*(j+1)) : null//Down
  c[3] ? line(data["w"]*i, data["h"]*(j+1),data["w"]*i, data["h"]*j) : null // Left
}
