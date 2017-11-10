var algo;

var data;

function setup(){
  createCanvas(640, 480);
  frameRate(10);
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
    ccell = data["cells"][data["current"][0]][data["current"][1]]; // Set current cell
    direction = floor(random(4)); // Choose random direction
    if(ccell[0] == false && ccell[1] == false && ccell[2] == false && ccell[3] == false){
      console.log("Back");
      data["current"] = data["backtracker"].pop()
    }else{
      while(!ccell[direction]){ // keep chosing until aval
        direction = floor(random(4)); //random direction
      }

      next = data["current"].slice()
      if(direction == 0){next[1] -= 1}else
      if(direction == 1){next[0] += 1}else
      if(direction == 2){next[1] += 1}else
      if(direction == 3){next[0] -= 1}
      if(isvalid(next)){
        if(data["visited"].includes(data["cells"][next[0]][next[1]])){
          if((isvalid([data["current"][0] + 1,data["current"][1]   ]) ? data["visited"].includes(data["cells"][data["current"][0] + 1][data["current"][1]   ]) : true)
          && (isvalid([data["current"][0] - 1,data["current"][1]   ]) ? data["visited"].includes(data["cells"][data["current"][0] - 1][data["current"][1]   ]) : true)
          && (isvalid([data["current"][0]    ,data["current"][1] + 1]) ? data["visited"].includes(data["cells"][data["current"][0]   ][data["current"][1] + 1]): true)
          && (isvalid([data["current"][0]    ,data["current"][1] - 1]) ? data["visited"].includes(data["cells"][data["current"][0]   ][data["current"][1] - 1]): true)){
          // if(data["visited"].includes(data["cells"][data["current"] + 1][data["curent"]    ]
          // && data["visited"].includes(data["cells"][data["current"] - 1][data["curent"]    ]
          // && data["visited"].includes(data["cells"][data["current"]    ][data["curent"] + 1]
          // && data["visited"].includes(data["cells"][data["current"]    ][data["curent"] - 1]){
            console.log("Back It Up");
            data["current"] = data["backtracker"].pop();
          }
        }else{
          ccell[direction] = false; // clear the wall in that direction
          data["backtracker"].push(data["current"])
          data["cells"][next[0]][next[1]][(direction+2)%4] = false
          data["current"] = next;
          data["visited"].push(data["cells"][data["current"][0]][data["current"][1]])
          console.log("Next");
        }
      }else{
        ccell[direction] = false; // clear the wall in that direction
      }
    }
    noStroke();
    fill(255, 0, 0, 128)
    for(let b = 0; b < data["backtracker"].length; b++){
      drawcell(data["backtracker"][b][0], data["backtracker"][b][1])

    }
    fill(255)
    drawcell(data["current"][0], data["current"][1])
    stroke(255);
    for(let i = 0; i < data["cells"].length; i++){
      for(let j = 0; j < data["cells"][i].length; j++){
        drawlines(i, j, data["cells"][i][j]);
      }
    }

    if(data["visited"].length == data["cells"].length * data["cells"][0].length){
      noLoop()
    }
  }

}

function isvalid(cell){
  return cell[0] >= 0 && cell[0] < data["cells"].length && cell[1] >= 0 && cell[1] < data["cells"][0].length
}

function drawcell(i, j){
  rect(data["w"]*i, data["h"]*j, data["w"], data["h"]);
}

function drawlines(i, j, c){
  c[0] ? line(data["w"]*i, data["h"]*j,data["w"]*(i+1), data["h"]*j) : null // Top
  c[1] ? line(data["w"]*(i+1), data["h"]*j,data["w"]*(i+1), data["h"]*(j+1)) : null// Right
  c[2] ? line(data["w"]*(i+1), data["h"]*(j+1),data["w"]*i, data["h"]*(j+1)) : null//Down
  c[3] ? line(data["w"]*i, data["h"]*(j+1),data["w"]*i, data["h"]*j) : null // Left
}
