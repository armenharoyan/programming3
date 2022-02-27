let LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }

    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (newCell && this.multiply >= 12) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 1;

                var newGrass = new Grass(newX, newY, 1);
                grassArr.push(newGrass);
                this.multiply = 0;
            }
        }

    }
}