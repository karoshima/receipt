const date = (ymmdd) => {
    const ymd = ymmdd.replace(/[^0-9\-]/g, "").split("-")
    const yyyy = parseInt(ymd[0]) + 2018;
    return `${yyyy}-${ymd[1]}-${ymd[2]}`;
}

const getMatrix = () => {
    const trs = Array.from(document.querySelectorAll("table tr"));
    trs.shift();
    return trs.map((tr) => {
        const line = new SheetLine();
        line.setDate(date(tr.cells[0].textContent));
        line.setIncome(tr.cells[1].textContent);
        line.setOutgo(tr.cells[2].textContent);
        line.setTitle(tr.cells[3].textContent);
        line.setYucho(tr.cells[4].textContent);
        return line.print();
    }).join("\n");
}
