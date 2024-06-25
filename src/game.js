export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    activePiece = {
        x:0,
        y:0,
        blocks: [
            [0,1,0],
            [1,1,1],
            [0,0,0],
        ],
        rotationIndex: 0,
        rotations: [
            [
                [0,1,0],
                [1,1,1],
                [0,0,0],
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0],
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,1,0],
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0],
            ],
        ],
   }

   movePieceRight() {
    this.activePiece.x += 1;
    if (this.hasCollision()) {
        this.activePiece.x -= 1;
        this.lockPiece();
    }
   }

   movePieceLeft() {
    this.activePiece.x -= 1;
    if (this.hasCollision()) {
        this.activePiece.x += 1;
        this.lockPiece();
    }
   }
   
   movePieceDown() {
    this.activePiece.y += 1;
    if (this.hasCollision()) {
        this.activePiece.y -= 1;
        this.lockPiece();
    }
   }

   rotatePiece() {
    const activePiece = this.activePiece;

    if (activePiece.rotationIndex === 3) {
        activePiece.rotationIndex = 0;
    } else {
        activePiece.rotationIndex += 1;
    }
    activePiece.blocks = activePiece.rotations[activePiece.rotationIndex];
    return activePiece.blocks;
   }

   hasCollision() {
    const playfield = this.playfield;
    const {y: pieceY, x: pieceX, blocks} = this.activePiece;

    for(let y = 0; y < blocks.length; y++) {
        for (let x = 0; x < blocks[y].length; x++) {
            if(
                blocks[y][x] &&
                ((playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined)
                || playfield[pieceY + y][pieceX + x])
            )
            {
                return true;
            }
        }
    }
    return false;
   }

   lockPiece() {
    const {y: pieceY, x: pieceX, blocks} = this.activePiece;
    const playfield = this.playfield;

    for(let y = 0; y < blocks.length; y++) {
        for (let x = 0; x < blocks[y].length; x++) {
            if (blocks[y][x]){
                playfield[pieceY + y][pieceX + x] = blocks[y][x];        
            }
        }
    }
   }
}