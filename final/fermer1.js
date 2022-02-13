class Fermer1 extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.multiply = 0
    }

    grEatRespawn() {
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        var emptyCells1 = this.chooseCell(1)
        var newCell1 = emptyCells1[Math.floor(Math.random() * emptyCells1.length)]
        if (newCell && grassEaterArr.length < 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var grEat = new GrassEater(newX, newY, 1);
            grassEaterArr.push(grEat);

        }
        if (newCell1 && grassEaterArr.length < 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var grEat = new GrassEater(newX, newY, 2);
            grassEaterArr.push(grEat);

        }
    }
}
