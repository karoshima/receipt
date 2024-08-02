const date = (ymmdd) => {
    const ymd = ymmdd.replace(/[^0-9\-]/g, "").split("-")
    const yyyy = parseInt(ymd[0]) + 2018;
    return `${yyyy}-${ymd[1]}-${ymd[2]}`;
}

const getMatrix = () => {
    const trs = Array.from(document.querySelectorAll("table tr"));
    trs.shift();
    return trs.map((tr) => {
        return new SheetLine(
            date(tr.cells[0].textContent),
            tr.cells[3].textContent,
            "郵貯",
            tr.cells[1].textContent,
            tr.cells[2].textContent,
            tr.cells[4].textContent
        ).print();
    }).join("\n");
}
