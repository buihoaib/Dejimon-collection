"use strict";
class Dejimon {
    constructor(name, height, weight) {
        this.name = name;
        this.height = height;
        this.weight = weight;
    }
}
class Yorkshire extends Dejimon {
    constructor(name, height, weight, waterPower, icePower) {
        super(name, height, weight);
        this.waterPower = waterPower;
        this.icePower = icePower;
        this.overallPower = parseFloat(((this.height + this.weight + this.waterPower + this.icePower) /
            4).toFixed(2));
        this.type = "Yorkshire";
    }
}
class Lean extends Dejimon {
    constructor(name, height, weight, firePower, charmPower) {
        super(name, height, weight);
        this.firePower = firePower;
        this.charmPower = charmPower;
        this.overallPower = parseFloat(((this.height + this.weight + this.firePower + this.charmPower) /
            4).toFixed(2));
        this.type = "Lean";
    }
}
class Potbelly extends Dejimon {
    constructor(name, height, weight, electricPower) {
        super(name, height, weight);
        this.electricPower = electricPower;
        this.overallPower = parseFloat(((this.height + this.weight + this.electricPower) / 3).toFixed(2));
        this.type = "Potbelly";
    }
}
