"use strict";
var Type;
(function (Type) {
    Type[Type["Yorkshire"] = 0] = "Yorkshire";
    Type[Type["Lean"] = 1] = "Lean";
    Type[Type["Potbelly"] = 2] = "Potbelly";
    Type[Type["null"] = 3] = "null";
})(Type || (Type = {}));
var dejimonType = Type.null;
var ds = new DejimonServices();
var collection = [];
window.onload = (event) => {
    // debug console
    console.log("page is fully loaded");
    if (localStorage.getItem("dejimonCollection") === null) {
        // if no previous values exist
        localStorage.dejimonCollection = JSON.stringify([]);
    }
    else {
        collection = JSON.parse(localStorage.dejimonCollection); // retrieve data
        ds.fetchDataFromStorage(collection);
        updateTable();
    }
};
function disableAddButton(flag) {
    document.getElementById("confirm-add").disabled = flag;
}
disableAddButton(true);
function onSelectChange() {
    // delete old abilities to prepare for new setup
    var container = document.getElementById("abilities-container");
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    var inputType = document.getElementById("inputType")
        .value;
    switch (inputType) {
        case "Yorkshire":
            dejimonType = 0;
            disableAddButton(false);
            addWaterAbility(container);
            addIceAbility(container);
            break;
        case "Lean":
            dejimonType = 1;
            disableAddButton(false);
            addFireAbility(container);
            addCharmAbility(container);
            break;
        case "Potbelly":
            dejimonType = 2;
            disableAddButton(false);
            addElectricAbility(container);
            break;
        default:
            dejimonType = 3;
            disableAddButton(true);
            return;
    }
}
// add dejimon to collection
document.getElementById("confirm-add").addEventListener("click", function () {
    let dejimon;
    let name = document.getElementById("inputName").value;
    let weight = parseInt(document.getElementById("inputWeight").value);
    let height = parseInt(document.getElementById("inputHeight").value);
    switch (dejimonType) {
        case 0:
            let waterPower = parseInt(document.getElementById("inputWater").value);
            let icePower = parseInt(document.getElementById("inputIce").value);
            dejimon = new Yorkshire(name, height, weight, waterPower, icePower);
            ds.add(dejimon);
            break;
        case 1:
            let firePower = parseInt(document.getElementById("inputFire").value);
            let charmPower = parseInt(document.getElementById("inputCharm").value);
            dejimon = new Lean(name, height, weight, firePower, charmPower);
            ds.add(dejimon);
            break;
        case 2:
            let electricPower = parseInt(document.getElementById("inputElectric").value);
            dejimon = new Potbelly(name, height, weight, electricPower);
            ds.add(dejimon);
            break;
        default:
            dejimon = null;
            console.log("No op");
    }
    // Add to local storage here
    if (dejimon != null) {
        collection = JSON.parse(localStorage.dejimonCollection); // retrieve data
        collection.push(dejimon); // push new item to array
        localStorage.dejimonCollection = JSON.stringify(collection); // add to storage
    }
    updateTable();
});
function updateTable() {
    let tableBody = document.getElementById("table-body");
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.lastChild);
    }
    let dejimonsList = ds.showAll();
    dejimonsList.forEach(addItemToTable);
}
function addItemToTable(item, index) {
    let tableBody = document.getElementById("table-body");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = item.name;
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    td2.innerText = item.type;
    tr.appendChild(td2);
    const td3 = document.createElement("td");
    const infoBtn = document.createElement("button");
    infoBtn.type = "button";
    infoBtn.class = "btn btn-link";
    infoBtn.id = "infoBtn";
    infoBtn.innerHTML = "more info";
    infoBtn.addEventListener("click", () => showModal(item));
    td3.appendChild(infoBtn);
    tr.appendChild(td3);
    const td4 = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerHTML = "delete";
    deleteBtn.addEventListener("click", () => deleteDejimon(item.id));
    td4.appendChild(deleteBtn);
    tr.appendChild(td4);
    tableBody.appendChild(tr);
}
function deleteDejimon(id) {
    ds.delete(id); //delete item based on item
    localStorage.dejimonCollection = JSON.stringify(ds.dejimons); // add to storage
    updateTable(); // update table after deletion
}
function showModal(item) {
    $("#name-modal").text(item.name);
    $("#type-modal").text(item.type);
    $("#height-modal").text(item.height + " hocks");
    $("#weight-modal").text(item.weight + " stones");
    switch (item.type) {
        case "Yorkshire":
            $("#abilities-modal").text("Water Ability: " + item.waterPower + ", Ice Ability: " + item.icePower);
            break;
        case "Lean":
            $("#abilities-modal").text("Fire Ability: " +
                item.firePower +
                ", Charm Ability: " +
                item.charmPower);
            break;
        case "Potbelly":
            $("#abilities-modal").text("Electric Ability: " + item.electricPower);
            break;
        default:
            $("#abilities-modal").text();
    }
    $("#overall-modal").text(item.overallPower);
    $("#myModal").modal();
}
// close add option
document.getElementById("cancel-add").addEventListener("click", function () {
    document.getElementById("open-add-option").className =
        "btn btn-primary collapsed";
    document.getElementById("add-table").className =
        "collapse d-grid m-3 p-2 border border-primary rounded justify-content-md-center collapse";
});
function addWaterAbility(container) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = "Water Ability";
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.name = "Water Ability";
    input.id = "inputWater";
    input.value = "5";
    input.min = "0";
    input.max = "100";
    td2.appendChild(input);
    tr.appendChild(td2);
    container.appendChild(tr);
}
function addIceAbility(container) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = "Ice Ability";
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.name = "Ice Ability";
    input.id = "inputIce";
    input.value = "5";
    input.min = "0";
    input.max = "100";
    td2.appendChild(input);
    tr.appendChild(td2);
    container.appendChild(tr);
}
function addFireAbility(container) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = "Fire Ability";
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.name = "Fire Ability";
    input.value = "5";
    input.id = "inputFire";
    input.min = "0";
    input.max = "100";
    td2.appendChild(input);
    tr.appendChild(td2);
    container.appendChild(tr);
}
function addCharmAbility(container) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = "Charm Ability";
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.name = "Charm Ability";
    input.id = "inputCharm";
    input.value = "5";
    input.min = "0";
    input.max = "100";
    td2.appendChild(input);
    tr.appendChild(td2);
    container.appendChild(tr);
}
function addElectricAbility(container) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = "Electric Ability";
    tr.appendChild(td1);
    const td2 = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.name = "Electric Ability";
    input.id = "inputElectric";
    input.value = "5";
    input.min = "0";
    input.max = "100";
    td2.appendChild(input);
    tr.appendChild(td2);
    container.appendChild(tr);
}
function validateInput(input, min, max) {
    if (input < min || input > max) {
        disableAddButton(true);
    }
    else {
        disableAddButton(false);
    }
}
