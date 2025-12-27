const DATABANK_NAME = "allData" 
const nameField = document.getElementById("name");
const latoesField = document.getElementById("latoes");
const litersField = document.getElementById("liters");

function typeNum(key, fieldId){
    const pricePerField = document.getElementById(fieldId)
    pricePerField.value = pricePerField.value + key
}

function erase(fieldId){
    const pricePerField = document.getElementById(fieldId);
    pricePerField.value = pricePerField.value.slice(0, -1)
}

function readDatabase(){
    return JSON.parse(localStorage.getItem(DATABANK_NAME)) || [];
}

function saveData(list) {
    localStorage.setItem(data, JSON.stringify(list));
}

function addName(){

    const nameTyped = nameField.value

    if(nameTyped ===""){
        nameTyped = "Nome não inserido"
    }

    const list = readDatabase()

    list.push({
        names: nameTyped,
        pricePer: 0,
        latoes: 0,
        liters: 0
    });

    saveData(list)
}

function getNumber(event, fieldId, valueInArray){
    const field = document.getElementById(fieldId).value;
    if (isNaN(field)||field ==""){
        event.preventDefault();
        alert("Digite um valor numérico!");
        return
    }
    const numberTyped = parseFloat(field)

    const list = readDatabase()

    const lastPerson = list[list.length - 1];

    lastPerson[valueInArray] = numberTyped

    saveData(list)
}

function finalResults(){
    if (!corpoTabela){return};
    const fullList = readDatabase();
    const tableBody = document.getElementById("results-table");
    const calculatedList = fullList.map(function(name) {
        const pricePer = name.pricePer || 0
        const latoes = name.latoes || 0
        const liters = name.liters || 0

        costCalculated = pricePer/60 * (latoes * 60 + liters)
    return {
        name: panhador.name,
        finalCost: costCalculated
    };
});
    calculatedList.forEach(function(item){
        tableBody.innerHTML += `
        <tr>
            <td>${item.nome}</td>
            <td>${item.finalCost.toFixed(2)}</td>
        <tr>
        `;
    });
}
