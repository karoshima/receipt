const toNumber = (str) => {
    return Number(str.replace(/[^0-9]/g,""));
}

const getBalance = (table) => {
    const tr = table.querySelectorAll("tr");
    return toNumber(tr[tr.length-2].cells[1].textContent);
}

const getTable = (table, balance) => {
    const tr = Array.from(table.querySelectorAll("tr"));
    tr.shift();
    let data = [];
    for (let i = 0;  i < tr.length;  i++) {
        data.push(tr[i].cells[0].textContent+"\t"+toNumber(tr[i].cells[1].textContent)+"\t"+toNumber(tr[i].cells[2].textContent)+"\t"+tr[i].cells[3].textContent);
    }
    for (let i = tr.length - 1;  i >= 0;  i--) {
        data[i] += "\t" + balance;
        balance += toNumber(tr[i].cells[1].textContent) - toNumber(tr[i].cells[2].textContent);
    }
    return data.join("\n");
}

const showMatrix = () => {
    const tables = document.getElementsByTagName("table");
    const balance = getBalance(tables[tables.length-2]);
    const data = getTable(tables[tables.length-1], balance);
    navigator.clipboard.writeText(data).then(() => console.log("ok")).catch((e) => console.error(e));
    alert(data);
}

addEventListener("keydown", (key) => {
    key.stopPropagation();
    if (key.key === "v") showMatrix();
})
