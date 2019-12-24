const HEX_WIDTH = 32;
const HEX_HEIGHT = 31;
const GRID_SIZE_X = 48; // 48;
const GRID_SIZE_Y = 48; // 48;

/**
* 0,-2 - 0,-1 - 0,+1 - 0,+2 - +1,+1 - +1,-1
* 0,-2 - 0,-1 - 0,+1 - 0,+2 - -1,+1 - -1,-1
**/
const ODD_NEIGHBOURS = [[0,-2],[0,-1],[0,1],[0,2],[1,1],[1,-1]];
const EVEN_NEIGHBOURS = [[0,-2],[0,-1],[0,1],[0,2],[-1,1],[-1,-1]];

const BACKGROUND_HEX = '#FFFFFF';
const NORMAL_TILES = 0xFFFFFF;
const SELECTED_UNIT = 0xd3d3d3;

class Location2d {
    constructor(coordinateX,coordinateY) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
    }
    isEqual(location2d) {
        return this.coordinateY === location2d.coordinateY && this.coordinateX === location2d.coordinateX;
    }
}

window.addEventListener('load',function() {

    // TODO cpu optimization for large map
    /**
    * 4,0
    * 4,1
    * 4,2
    * goes first right-bottom and then left-bottom
    **/
	let mapMatrix = [ // must be half of map
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
	/*let mapMatrix = [ // must be half of map
	  [0,0,0,0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];*/

	let game = new Phaser.Game(1200, 850, Phaser.CANVAS, "map", {preload: onPreload, create: onCreate}, true);

	let columns = [Math.ceil(GRID_SIZE_Y/2),Math.floor(GRID_SIZE_Y/2)];
	let moveIndex;
    let sectorWidth = HEX_WIDTH/4*3;
    let sectorHeight = HEX_HEIGHT;
    let gradient = (HEX_WIDTH/4)/(HEX_HEIGHT/2);
    let hexagonGroup;
    let hexagonArray = [];

    let clickableSpriteGroup = [];

    let selectedTroop;
    let selectedNeighbors = [];

    function onPreload() {
        game.load.image("hexagon", "../../../static/media/map/fantasyhextiles_v3.png");
        game.load.image("selected", "../../../static/media/map/fantasyhextiles_v3.png");
        game.load.image("troop", "../../../static/media/soldiars/MapWithSoldiars (1) (1).png");
        game.input.mouse.capture = true;
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    }

    function onCreate() {
        hexagonGroup = game.add.group();
        game.stage.backgroundColor = BACKGROUND_HEX;
         for(let i = 0; i < GRID_SIZE_X/2; i ++){
              hexagonArray[i] = [];
            for(let j = 0; j < GRID_SIZE_Y; j ++){
                if(GRID_SIZE_X%2==0 || i+1<GRID_SIZE_X/2 || j%2==0){
                    let hexagonX = HEX_WIDTH*i*1.5+(HEX_WIDTH/4*3)*(j%2);
                    let hexagonY = HEX_HEIGHT*j/2;
                    let hexagon = game.add.sprite(hexagonX,hexagonY,"hexagon");
                    if(selectedTroop !== null){
                        console.log("not null");
                        hexagon.inputEnabled = true;
                        hexagon.events.onInputDown.add(moveTroop, this);
                    }else{
                        hexagon.inputEnabled = false;
                    }
                    hexagonGroup.add(hexagon);
                    hexagonArray[i][j]=hexagon;
                    // TODO added for text remove after
                    /*let hexagonText = game.add.text(hexagonX+HEX_WIDTH/4+5,hexagonY+5,i+","+j);
                    hexagonText.font = "arial";
                    hexagonText.fontSize = 9;
                    hexagonGroup.add(hexagonText);*/
                }
            }
        }
        placeTroops();
        hexagonGroup.y = (game.height-HEX_HEIGHT*Math.ceil(GRID_SIZE_Y/2))/2;
          if(GRID_SIZE_Y%2==0){
               hexagonGroup.y-=HEX_HEIGHT/4;
          }
        hexagonGroup.x = (game.width-Math.ceil(GRID_SIZE_X/2)*HEX_WIDTH-Math.floor(GRID_SIZE_X/2)*HEX_WIDTH/2)/2;
          if(GRID_SIZE_X%2==0){
               hexagonGroup.x-=HEX_WIDTH/8;
          }
          marker = game.add.sprite(0,0,"selected");
          marker.anchor.setTo(0.5);
          marker.visible=false;
          hexagonGroup.add(marker);
          moveIndex = game.input.addMoveCallback(checkHex, this);
    }

     function checkHex(){
          let candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
          let candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
          let deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
          let deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
          if(candidateX%2==0){
               if(deltaX<((HEX_WIDTH/4)-deltaY*gradient)){
                    candidateX--;
                    candidateY--;
               }
               if(deltaX<((-HEX_WIDTH/4)+deltaY*gradient)){
                    candidateX--;
               }
          }
          else{
               if(deltaY>=HEX_HEIGHT/2){
                    if(deltaX<(HEX_WIDTH/2-deltaY*gradient)){
                         candidateX--;
                    }
               }
               else{
                    if(deltaX<deltaY*gradient){
                         candidateX--;
                    }
                    else{
                         candidateY--;
                    }
               }
          }
          //placeMarker(candidateX,candidateY);
     }

     /*function placeMarker(posX,posY){
		if(posX<0 || posY<0 || posX>=GRID_SIZE_X || posY>columns[posX%2]-1){
			marker.visible=false;
		}
		else{
			marker.visible=true;
			marker.x = HEX_WIDTH/4*3*posX+HEX_WIDTH/2;
			marker.y = HEX_HEIGHT*posY;
			if(posX%2==0){
				marker.y += HEX_HEIGHT/2;
			}
			else{
				marker.y += HEX_HEIGHT;
			}
		}
	}*/

	function placeTroops(){
        for(let i = 0; i < GRID_SIZE_X/2; i ++){
             for(let j = 0; j < GRID_SIZE_Y; j ++){
                 let coorX = HEX_WIDTH*i*1.5+(HEX_WIDTH/4*3)*(j%2);
                 let coorY = HEX_HEIGHT*j/2;
                 if(mapMatrix[i][j] > 0){
                     let troop = game.add.sprite(coorX,coorY,"troop");
                     troop.inputEnabled = true;
                     troop.events.onInputDown.add(selectTroopListener, this);
                     hexagonArray[i][j].tint = SELECTED_UNIT;
                     hexagonGroup.add(troop);
                     clickableSpriteGroup.push(troop);
                 }
             }
        }
    }

    function selectTroopListener(troop, pointer) {
	    if(!pointer.leftButton.isDown) {
	        return;
        }
        selectedNeighbors.forEach(location => hexagonArray[location.coordinateX][location.coordinateY].tint = NORMAL_TILES);
        j = coorYToIndex(troop.y);
        i = coorXToIndex(troop.x, j);
        console.log(i + "," + j);
        selectedTroop = troop;
        selectedNeighbors = findNeighbors(i,j);
        selectedNeighbors.forEach(location => hexagonArray[location.coordinateX][location.coordinateY].tint = SELECTED_UNIT);
        hexagonArray[i][j].tint = SELECTED_UNIT;
    }

    function coorXToIndex(coorX, j){
        return ((coorX-((HEX_WIDTH/4*3)*(j%2)))/1.5)/HEX_WIDTH;
    }

    function coorYToIndex(coorY){
        return coorY/HEX_HEIGHT*2;
    }

    function moveTroop(sprite, pointer){
        if(pointer.rightButton﻿.isDown && selectedTroop != null) {
            oldJ = coorYToIndex(selectedTroop.y);
            oldI = coorXToIndex(selectedTroop.x, oldJ);
            console.log(oldI + "," + oldJ);
            j = coorYToIndex(sprite.y);
            i = coorXToIndex(sprite.x, j);
            console.log(i + "," + j);
            if(canMove(oldI,oldJ,i,j)) {
                let hexagonX = HEX_WIDTH*i*1.5+(HEX_WIDTH/4*3)*(j%2);
                let hexagonY = HEX_HEIGHT*j/2;
                selectedTroop.x = hexagonX;
                selectedTroop.y = hexagonY;
                selectedTroop = null;
                selectedNeighbors.forEach(location => hexagonArray[location.coordinateX][location.coordinateY].tint = NORMAL_TILES);
                hexagonArray[oldI][oldJ].tint = NORMAL_TILES;
                hexagonArray[i][j].tint = SELECTED_UNIT;
            }else {
                console.debug("cannot move!");
            }
        }else {
            console.log("dropped troop!");
            selectedTroop = null;
        }
    }

    function canMove(oldI, oldJ, newI, newJ){
        let neighborsCoordinates = findNeighbors(oldI, oldJ);
        neighborsCoordinates.push(new Location2d(oldI, oldJ));
        let result = false;
        neighborsCoordinates.forEach(coor => result = !result ? coor.isEqual(new Location2d(newI, newJ)): true);
        return result;
    }

    function findNeighbors(i, j){
        let neighbors = [];
        let candicateNeigbors;
        if(j % 2 !== 0){
            candicateNeigbors = ODD_NEIGHBOURS;
        } else {
            candicateNeigbors = EVEN_NEIGHBOURS;
        }
        candicateNeigbors
            .map(coor => neighbors.push(new Location2d(coor[0]+i,coor[1]+j)));
        neighbors = neighbors
             .filter(coor => checkBoundries(coor));
        return neighbors;
    }

    function checkBoundries(coor) {
        return coor.coordinateX >= 0 && coor.coordinateY >= 0 && coor.coordinateX < GRID_SIZE_X/2 && coor.coordinateY < GRID_SIZE_Y;
    }

});