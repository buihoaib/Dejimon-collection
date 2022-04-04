"use strict";
class DejimonServices {
    constructor() {
        this.dejimons = [];
    }
    add(dejimon) {
        dejimon.id = DejimonServices.currentID;
        DejimonServices.currentID++;
        this.dejimons.push(dejimon);
    }
    delete(id) {
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
    fetchDataFromStorage(dejimons) {
        this.dejimons = dejimons;
    }
}
DejimonServices.currentID = 0;
