const getMatrix = () => {
    const payment = document.getElementById("payment");
    if (payment) {
        const date = payment.querySelectorAll("span")[0].textContent;
        const price = payment.querySelectorAll("td")[0].textContent;
    
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
    } else {
        return Array.from(document.getElementById("DivDetailInfo").getElementsByTagName("tr"))
        .map(tr => {
            const td = tr.getElementsByTagName("td");
            if (td.length == 0) { return undefined; }
            return new SheetLine(
                td[0].textContent.trim().replace(/\n +/, "/"),
                td[2].textContent.trim(),
                "ビック利用",
                0,
                td[3].textContent.match(/\((.+)\)/)[1],
                cardsettlement
            );
        }).map(line => line ? line.print()+"\n" : "").join("");
    }
}
