const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector("#incomes");
const expenses = document.querySelector("#expenses");
const total = document.querySelector("#total");

let items = [];

// Função da ação de adicionar uma tabela
btnNew.onclick = () =>{
    if (descItem.value === "" || amount.value ==="" || type.value === ""){
        return alert("Preencha todos os campos!!")
    }
    items.push({
        desc: descItem.value,
        amount:Math.abs(amount.value).toFixed(2),
        type: type.value,
    })
    
    setItensBD();
    loadItens();
    getTotals();

    descItem.value ="";
    amount.value ="";
}

// função responsável por deletar os itens da tabela
function deleteItem(index){
    items.splice(index, 1);
    setItensBD();
    loadItens();
    getTotals();

}

// função responsável pela adição da tabela
function insertItem (item, index){
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${
        item.type == "Entrada"
            ? '<i class ="bx bxs-chevron-up-circle"></i>'
            : '<i class ="bx bxs-chevron-down-circle"></i>'
    }</td>
    <td class="columnAction">
        <button onclick="deleteItem(${index})"><i class="bx bx-trash"></i></button>
    </td>
`;

    tbody.appendChild(tr);
}


// Responsável pelo Dashbord
function getTotals() {
    const amountIncomes = items
        .filter((item) => item.type.toLowerCase() === "entrada")
        .map((transaction) => Number(transaction.amount))
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);

    const amountExpenses = items
        .filter((item) => item.type.toLowerCase() === "saída")
        .map((transaction) => Number(transaction.amount))
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);
    const totalItems = (amountIncomes - amountExpenses).toFixed(2);

    incomes.innerHTML = amountIncomes;
    expenses.innerHTML = amountExpenses;
    total.innerHTML = totalItems;
}

//Recarregar a página
function loadItens (){
    items = getItensBD();
    tbody.innerHTML = " ";
    items.forEach((item, index) => {
        insertItem(item, index);
    });
}




const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () => localStorage.setItem("db_items", JSON.stringify(items));

window.onload = () => {
    loadItens();
    getTotals();
}



