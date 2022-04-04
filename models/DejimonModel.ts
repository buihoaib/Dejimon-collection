abstract class Dejimon {
  id?: number;
  name: string;
  height: number;
  weight: number;
  constructor(name: string, height: number, weight: number) {
    this.name = name;
    this.height = height;
    this.weight = weight;
  }
}

class Yorkshire extends Dejimon {
  waterPower: number;
  icePower: number;
  overallPower: number;
  type: string;
  constructor(
    name: string,
    height: number,
    weight: number,
    waterPower: number,
    icePower: number
  ) {
    super(name, height, weight);
    this.waterPower = waterPower;
    this.icePower = icePower;
    this.overallPower = parseFloat(
      (
        (this.height + this.weight + this.waterPower + this.icePower) /
        4
      ).toFixed(2)
    );
    this.type = "Yorkshire";
  }
}

class Lean extends Dejimon {
  firePower: number;
  charmPower: number;
  type: string;
  overallPower: number;
  constructor(
    name: string,
    height: number,
    weight: number,
    firePower: number,
    charmPower: number
  ) {
    super(name, height, weight);
    this.firePower = firePower;
    this.charmPower = charmPower;
    this.overallPower = parseFloat(
      (
        (this.height + this.weight + this.firePower + this.charmPower) /
        4
      ).toFixed(2)
    );
    this.type = "Lean";
  }
}

class Potbelly extends Dejimon {
  electricPower: number;
  type: string;
  overallPower: number;
  constructor(
    name: string,
    height: number,
    weight: number,
    electricPower: number
  ) {
    super(name, height, weight);
    this.electricPower = electricPower;
    this.overallPower = parseFloat(
      ((this.height + this.weight + this.electricPower) / 3).toFixed(2)
    );
    this.type = "Potbelly";
  }
}
