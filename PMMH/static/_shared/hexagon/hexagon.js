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

let selectedTroop;

window.addEventListener('load',function() {

    // TODO cpu optimization for large map
    /**
    * 4,0
    * 4,1
    * 4,2
    * goes first right-bottom and then left-bottom
    **/
	let selectable = [ // must be half of map
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
	let mapMatrix = [
        [2,3,3,2,3,3,2,2,2,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,2,2,2,2,2,2,2,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [3,3,3,3,2,2,2,2,2,2,2,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,2,2,2,2,2,2,6,2,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [2,3,1,3,2,2,2,2,2,2,2,2,2,15,15,15,15,15,15,15,15,15,2,2,2,2,2,2,2,2,2,2,2,8,17,17,17,17,17,19,17,17,17,17,17,17,17,17],
        [2,3,3,3,2,2,2,2,5,2,2,2,2,15,14,15,15,15,15,15,15,10,2,2,2,2,2,2,2,2,2,2,2,8,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [3,3,3,3,3,2,2,5,5,15,15,2,2,15,15,15,15,15,15,15,15,15,2,6,2,2,2,2,2,4,8,2,17,8,8,17,17,17,17,17,17,17,17,18,17,17,19,17],
        [3,3,2,2,3,2,2,5,5,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,2,2,2,2,8,8,8,17,17,8,8,17,17,17,17,17,17,17,17,17,17,17,17],
        [2,2,2,2,2,2,2,5,5,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,15,15,2,2,2,8,8,8,17,17,17,8,17,17,21,21,17,17,17,17,17,17,17,17],
        [2,2,2,2,5,2,5,5,2,9,15,15,15,15,15,15,15,15,15,15,15,15,2,2,15,15,15,2,2,8,8,8,17,17,17,17,17,17,21,21,17,17,17,17,17,17,17,17],
        [2,2,3,2,5,6,5,5,2,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,15,15,15,2,2,2,8,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [2,2,3,5,5,5,5,5,2,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,15,15,15,2,2,2,2,17,8,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [3,2,5,5,5,5,5,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,8,8,8,16,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [2,2,2,2,5,5,2,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,2,8,8,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [3,2,2,2,5,2,2,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,8,8,17,17,17,17,17,17,17,17,17,17,17,19,17,17],
        [2,2,2,2,2,2,2,2,2,2,15,2,15,15,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,2,2,2,2,17,17,17,17,17,17,15,17,17,17,17,17,17,17,17],
        [2,2,2,2,2,2,2,2,2,2,2,2,15,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,2,17,17,17,17,17,17,15,15,15,17,16,17,17,17,17,17],
        [3,3,3,3,2,2,2,2,2,2,2,2,5,2,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,2,17,17,19,17,17,17,15,15,15,17,17,17,17,17,17,17],
        [3,3,3,3,3,2,2,2,7,3,3,3,5,2,2,2,2,2,15,15,15,15,15,15,15,15,15,15,15,15,15,2,17,17,17,17,17,17,17,15,17,17,17,17,17,17,17,17],
        [3,3,3,3,2,2,2,2,7,3,3,3,5,5,2,2,2,2,2,2,2,15,15,15,15,15,15,15,15,15,15,15,2,17,17,17,17,17,17,17,17,17,17,17,17,21,17,17],
        [3,3,3,3,2,2,2,2,7,5,2,3,6,5,5,5,2,2,2,2,2,15,15,15,15,15,15,2,15,15,15,15,2,17,17,17,17,17,17,17,17,17,17,17,21,21,17,17],
        [5,2,2,2,2,2,2,5,5,5,5,3,5,5,5,5,5,2,2,2,2,15,15,15,15,15,15,2,15,15,15,15,2,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [2,2,2,2,5,5,5,5,2,2,2,3,5,5,5,5,5,5,2,2,2,15,15,15,15,2,2,2,2,15,15,2,2,17,17,17,17,17,17,17,17,20,20,20,17,17,20,20],
        [2,2,2,2,5,5,5,5,2,4,2,3,3,5,5,5,5,5,2,2,2,2,2,2,2,2,2,2,2,15,15,2,17,17,17,17,17,17,17,17,17,20,20,20,20,20,17,17],
        [2,2,2,5,5,5,5,4,4,4,2,3,3,7,5,5,2,2,2,2,2,2,2,2,2,2,2,6,2,15,15,2,2,2,17,17,17,17,17,17,17,20,20,20,17,17,17,17],
        [5,5,5,5,5,5,2,4,4,4,2,2,3,3,3,2,2,2,2,2,2,2,2,2,8,8,2,2,5,2,2,2,2,2,2,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [5,2,2,5,5,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,8,8,8,2,2,5,5,5,5,5,2,2,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [2,2,2,2,5,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,2,2,2,8,8,8,2,5,5,5,5,5,5,5,5,17,17,17,17,17,17,17,17,17,17,17,17,17],
        [5,5,5,5,5,5,2,2,2,2,2,2,2,2,15,15,15,15,2,2,2,6,2,8,8,8,2,5,5,5,5,3,5,5,5,5,17,17,17,17,17,17,17,17,17,17,17,17],
        [5,5,5,5,5,5,2,2,7,2,2,2,2,15,15,15,15,15,2,8,2,2,2,8,8,8,12,5,5,5,3,3,5,5,5,5,5,17,17,17,17,17,17,17,17,17,17,17],
        [5,5,5,5,5,5,2,15,15,15,15,15,15,15,15,15,15,15,2,2,2,2,2,12,8,12,12,3,3,3,3,3,3,5,5,5,5,17,19,17,17,17,17,17,17,17,17,17],
        [3,3,3,2,2,2,15,15,15,15,15,15,15,15,15,15,4,4,2,2,2,2,2,12,12,12,12,3,13,3,3,3,3,3,3,3,3,17,17,8,17,17,17,17,17,17,17,17],
        [3,3,7,7,2,2,15,2,2,15,15,15,15,15,15,15,2,2,2,2,2,2,2,12,12,12,12,13,13,13,13,13,13,13,3,3,3,13,13,8,17,17,17,17,17,17,17,17],
        [5,5,7,7,2,15,15,4,4,15,15,15,2,2,2,15,2,2,2,2,2,2,2,12,12,12,12,13,13,13,13,13,13,13,13,13,3,13,13,8,8,17,17,17,17,17,17,17],
        [2,2,2,2,2,15,15,2,4,4,8,2,2,2,2,2,2,2,2,2,2,2,4,12,12,12,12,13,13,13,13,12,12,12,12,12,3,13,13,8,8,17,17,17,17,17,17,17],
        [2,2,2,2,2,15,15,2,2,4,8,2,4,4,2,2,2,2,4,2,2,2,4,12,12,12,12,12,13,13,13,12,12,12,12,12,12,13,13,8,8,17,17,17,17,17,17,17],
        [2,2,2,2,2,2,2,2,2,2,8,8,2,4,4,2,2,2,2,2,2,2,4,12,12,12,12,12,12,8,13,12,12,12,12,12,12,13,13,8,8,17,17,17,17,17,17,17],
        [2,2,2,2,2,2,2,2,2,2,8,8,2,2,2,4,2,2,2,2,2,2,2,8,8,12,12,12,12,8,13,12,12,12,12,12,13,13,13,8,8,17,17,17,17,17,17,17],
        [2,2,2,2,2,2,2,2,2,2,8,8,8,2,2,4,2,2,2,2,2,4,2,8,8,12,12,12,8,8,8,12,12,12,12,12,12,12,12,8,8,17,17,16,17,17,17,17],
        [2,2,7,2,2,2,2,2,2,2,8,8,8,8,2,2,2,2,4,2,2,4,4,8,8,8,12,13,8,8,8,8,12,12,12,12,12,12,12,8,8,8,17,17,17,17,17,17],
        [7,7,7,7,2,2,2,2,2,2,2,8,8,8,8,2,2,2,2,4,2,4,4,8,12,12,12,13,8,8,8,8,12,12,12,13,13,12,12,8,8,8,8,17,17,17,17,17],
        [7,7,7,7,7,2,3,2,2,2,2,2,8,8,8,8,6,8,8,4,2,12,12,12,12,13,12,13,8,8,8,8,13,13,8,13,13,13,12,22,8,8,8,17,17,17,17,17],
        [7,2,2,2,2,2,7,2,2,2,2,2,2,8,8,8,2,8,8,8,2,12,12,12,13,13,12,13,8,8,8,12,13,13,8,13,13,13,12,13,13,8,8,17,17,17,17,17],
        [2,2,2,2,3,7,2,3,3,2,2,2,4,2,8,8,8,8,8,8,8,13,13,13,13,13,12,12,12,8,8,12,12,12,8,8,13,13,12,13,13,8,8,17,17,17,17,17],
        [2,2,2,2,3,2,3,3,3,2,2,2,4,2,2,8,8,8,8,8,12,13,13,13,13,13,12,8,12,12,12,12,12,12,8,8,13,13,12,13,13,8,8,17,17,17,17,17],
        [2,2,2,2,2,2,3,2,3,2,2,2,2,2,2,12,8,8,8,12,12,13,13,13,13,12,12,8,12,12,12,12,12,12,8,8,13,13,12,13,13,8,8,17,17,17,17,17],
        [2,2,2,6,2,2,3,3,3,23,2,2,2,2,2,12,12,12,12,12,12,13,13,13,13,12,12,22,8,12,12,12,12,12,12,12,12,13,12,13,13,8,8,17,17,17,17,17],
        [15,2,2,2,2,2,3,23,23,23,23,23,2,2,2,12,12,12,12,12,13,13,13,13,13,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,8,8,17,17,17,17,17],
        [15,23,23,23,23,23,23,23,23,23,23,23,23,23,23,12,12,12,12,12,13,12,12,12,12,12,12,12,12,12,12,12,11,12,12,12,12,13,12,12,8,8,8,17,17,17,17,17],
        [14,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,12,22,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,12,8,8,8,17,20,20,17,17]
    ];

	//mapMatrix = mapMatrix[0].map((col, i) => mapMatrix.map(row => row[i]));


	/*let mapMatrix = [ // must be half of map
	  [0,0,0,0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,1,0,0,0,0,1,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];*/

	let game = new Phaser.Game(1250, 830, Phaser.CANVAS, "map", {preload: onPreload, create: onCreate}, true);

	let columns = [Math.ceil(GRID_SIZE_Y/2),Math.floor(GRID_SIZE_Y/2)];
	let moveIndex;
    let sectorWidth = HEX_WIDTH/4*3;
    let sectorHeight = HEX_HEIGHT;
    let gradient = (HEX_WIDTH/4)/(HEX_HEIGHT/2);
    let hexagonGroup;
    let hexagonArray = [];

    let clickableSpriteGroup = [];

    let selectedNeighbors = [];

    function onPreload() {

        game.load.image("2", "../../../static/media/map/fantasyhextiles_v3.png");
        game.load.image("1", "../../../static/media/map/castle.png");
        game.load.image("6", "../../../static/media/map/city_green.png");
        game.load.image("7", "../../../static/media/map/green_treasure.png");
        game.load.image("5", "../../../static/media/map/green_woods.png");
        game.load.image("4", "../../../static/media/map/rocky_green.png");
        game.load.image("3", "../../../static/media/map/marsh.png");
        game.load.image("8", "../../../static/media/map/mountion_green.png");
        game.load.image("9", "../../../static/media/map/port.png");
        game.load.image("10", "../../../static/media/map/port_inverse.png");
        game.load.image("11", "../../../static/media/map/snow_castle.png");
        game.load.image("12", "../../../static/media/map/snow_flat.png");
        game.load.image("13", "../../../static/media/map/snow_wood.png");
        game.load.image("14", "../../../static/media/map/lighthouse.png");
        game.load.image("15", "../../../static/media/map/sea.png");
        game.load.image("16", "../../../static/media/map/sand_city.png");
        game.load.image("17", "../../../static/media/map/sand_flat.png");
        game.load.image("18", "../../../static/media/map/sand_castle.png");
        game.load.image("19", "../../../static/media/map/sand_hut.png");
        game.load.image("20", "../../../static/media/map/sand_mountain.png");
        game.load.image("21", "../../../static/media/map/sand_oasis.png");
        game.load.image("22", "../../../static/media/map/snow_city.png");
        game.load.image("23", "../../../static/media/map/snow_sea.png");
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
                    let hexagon = game.add.sprite(hexagonX,hexagonY,mapMatrix[i][j]);
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
                 if(selectable[i][j] > 0){
                     let troop = game.add.sprite(coorX,coorY,"troop");
                     troop.data = selectable[i][j];
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
        document.getElementById('characterDetail').disabled = false;
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
            console.log("invalid click!");
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
