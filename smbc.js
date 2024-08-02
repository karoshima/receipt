const getMatrix = () => {
    const payData = document.getElementById("vp_alcor_view_Switch_0");
    if (payData) {
        const td = Array.from(payData.getElementsByTagName("tbody"))
                    .filter(tb => getComputedStyle(tb).display !== "none")[1]
                    .getElementsByTagName("td");
        const date = td[0].textContent;
        const price = td[1].textContent;
        return [
            new SheetLine(
                date,
                "請求に移行",
                "Ａｍａｚｏｎ利用",
                price,
                0,
                cardsettlement
            ).print(),
            new SheetLine(
                date,
                "請求",
                "Ａｍａｚｏｎ請求",
                0,
                price,
                cardsettlement
            ).print()
        ].join("\n");
    }
    return Array.from(document.getElementById("meisaiTable").getElementsByTagName("tr"))
    .map(tr => {
        tds = tr.getElementsByTagName("td");
        if (tds.length > 3) {
            return new SheetLine(
                "20"+tds[0].textContent.trim(),
                tds[1].textContent,
                "Ａｍａｚｏｎ利用",
                0,
                tds[17].textContent,
                cardsettlement
            ).print();
        }
    }).join("\n");
}
