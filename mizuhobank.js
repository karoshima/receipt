const getBalance = (table) => {
    const tr = table.querySelectorAll("tr");
    return Number(tr[tr.length-2].cells[1].textContent.replace(/[^0-9]/g, ''));
}

const getTable = (table, balance) => {
    const tr = Array.from(table.querySelectorAll("tr"));
    tr.shift();
    let data = [];

    for (let i = tr.length - 1;  i >= 0;  i--) {
        const line = new SheetLine(
            tr[i].cells[0].textContent,
            tr[i].cells[3].textContent,
            "みずほ",
            tr[i].cells[2].textContent,
            tr[i].cells[1].textContent,
            balance
        );
        balance -= line.delta;
        if (line.title === "セゾン") {
            data.unshift(new SheetLine(
                tr[i].cells[0].textContent,
                "返済",
                "旧PARCO請求",
                -line.delta, 0,
                cardsettlement
            ).print());
        }
        if (line.title === "ＵＣ") {
            data.unshift(new SheetLine(
                tr[i].cells[0].textContent,
                "返済",
                "トラベランス請求",
                -line.delta, 0,
                cardsettlement
            ).print());
        }
        if (line.title === "ミツイスミトモカ－ド　（カ") {
            data.unshift(new SheetLine(
                tr[i].cells[0].textContent,
                "返済",
                "Ａｍａｚｏｎ請求",
                -line.delta, 0,
                cardsettlement
            ).print());
        }
        if (line.title === "イオンフイナンシヤルサ－ビス") {
            data.unshift(new SheetLine(
                tr[i].cells[0].textContent,
                "返済",
                "マルエツカード請求",
                -line.delta, 0,
                cardsettlement
            ).print());
        }
        if (line.title === "イオンフイナンシヤルサ－ビス") {
            data.unshift(new SheetLine(
                tr[i].cells[0].textContent,
                "返済",
                "マルエツカード請求",
                -line.delta, 0,
                cardsettlement
            ).print());
        }
        if (line.title === "ビユ－カ－ド") {
            data.unshift(new SheetLine(
                tr[i].cells[0].textContent,
                "返済",
                "ビック請求",
                -line.delta, 0,
                cardsettlement
            ).print());
        }
        data.unshift(line.print());
    }
    return data;
}

const getMatrix = () => {
    const tables = document.getElementsByTagName("table");
    const balance = getBalance(tables[tables.length-2]);
    return getTable(tables[tables.length-1], balance).join("\n");
}
