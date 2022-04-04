namespace Dejimons.Service {
  export interface Services {
    add(dejimon: Dejimon): void;
    delete(id: number): void;
    showAll(): Dejimon[];
    fetchDataFromStorage(dejimons: Dejimon[]): void;
  }
}

class DejimonServices implements Dejimons.Service.Services {
  dejimons: Dejimon[];
  static currentID = 0;
  constructor() {
    this.dejimons = [];
  }
  add(dejimon: Dejimon) {
    dejimon.id = DejimonServices.currentID;
    DejimonServices.currentID++;
    this.dejimons.push(dejimon);
  }
  delete(id: number) {
    for (let i = 0; i < this.dejimons.length; i++) {
      if (this.dejimons[i].id == id) {
        this.dejimons.splice(i, 1);
        break;
      }
    }
  }
  showAll() {
    return this.dejimons;
  }
  fetchDataFromStorage(dejimons: Dejimon[]) {
    this.dejimons = dejimons;
  }
}
