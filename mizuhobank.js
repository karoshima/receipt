const getBalance = (table) => {
    const tr = table.querySelectorAll("tr");
    return Number(tr[tr.length-2].cells[1].textContent.replace(/[^0-9]/g, ''));
}

const getTable = (table, balance) => {
    const tr = Array.from(table.querySelectorAll("tr"));
    tr.shift();
    let data = [];
    for (let i = 0;  i < tr.length;  i++) {
        const line = new SheetLine();
        line.setDate(tr[i].cells[0].textContent);
        line.setOutgo(tr[i].cells[1].textContent);
        line.setIncome(tr[i].cells[2].textContent);
        line.setTitle(tr[i].cells[3].textContent.replace());
        data.push(line);
    }
    for (let i = tr.length - 1;  i >= 0;  i--) {
        data[i].setMizuho(balance);
        balance += data[i].outgo - data[i].income;
    }
    return data;
}

const getMatrix = () => {
    const tables = document.getElementsByTagName("table");
    const balance = getBalance(tables[tables.length-2]);
    return getTable(tables[tables.length-1], balance)
        .map((x) => x.print()).join("\n");
}
