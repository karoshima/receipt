const getMatrix = () => {
    const date = document.getElementById("payment").querySelectorAll("span")[0].textContent;
    const price = document.getElementById("payment").querySelectorAll("td")[0].textContent;

    return Array.from(document.querySelectorAll("*[id*='_trUseInfoListDetail']"))
    .map( tr => 
        new SheetLine(
            tr.cells[0].textContent.trim().replace(/[ \t\n]+/,'/'),
            tr.cells[2].textContent,
            "ビック利用",
            0,
            tr.cells[4].textContent,
            cardsettlement
        )
    ).concat(
        new SheetLine(
            date,
            "請求に移行",
            "ビック利用",
            price,
            0,
            cardsettlement
        ),
        new SheetLine(
            date,
            "請求",
            "ビック請求",
            0,
            price,
            cardsettlement
        )
    ).map(line => line.print()).join("\n");
}
