const getMatrix = () => {
    const payData = document.getElementById("vp_alcor_view_Switch_0");
    if (payData) {
        const payLine = new SheetLine();
        Array.from(payData.getElementsByTagName("tbody"))
        .filter(tb => getComputedStyle(tb).display !== "none")
        .forEach(tb => {
            const tds = tb.getElementsByTagName("td");
            if (tds.length > 1) {
                payLine.setDate(tds[0].textContent);
                payLine.setClaim(tds[1].textContent);
                payLine.setTitle("SMBC/Amazon");
            }
        });

        const meisaiData = document.getElementById("meisaiTable");
        const meisaiLines = Array.from(meisaiData.getElementsByTagName("tr"))
        .filter(tr => tr.textContent.includes("/"))
        .map(tr => {
            const tds = tr.getElementsByTagName("td");
            if (tds.length < 10) {
                return;
            }
            const line = new SheetLine();
            line.setDate("20"+tds[1].textContent);
            line.setTitle(tds[2].textContent);
            line.setOutgo(tds[7].textContent);
            line.setCard("SMBC/Amazon");
            return line.print();
        }).join("\n");
        return payLine.print() + "\n\n" + meisaiLines;
    }
    return Array.from(document.getElementById("meisaiTable").getElementsByTagName("tr"))
    .map(tr => {
        console.log(tr);
        tds = tr.getElementsByTagName("td");
        if (tds.length > 3) {
            const line = new SheetLine();
            line.setDate("20"+tds[0].textContent.trim());
            line.setTitle(tds[1].textContent);
            line.setOutgo(tds[17].textContent);
            line.setCard("SMBC/Amazon");
            return line.print();
        }
    }).join("\n");
}
