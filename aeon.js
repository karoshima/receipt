const getMatrix = () => {
    const seikyuElem = document.getElementsByClassName("m-mtpusagepanel_infomation")[0];
    const seikyuLine = new SheetLine();
    seikyuLine.setDate(seikyuElem.getElementsByClassName("m-mtpusagepanel_infomation_paymentdate")[0].textContent);
    seikyuLine.setTitle("AEON");
    seikyuLine.setClaim(seikyuElem.getElementsByClassName("a-textprice-large")[0].textContent);
    const seikyuStr = seikyuLine.print();
    
    const meisaiStr = Array.from(document.getElementsByClassName("m-mtphistorypanel_historyitem"))
    .map(item => {
        const meisai = new SheetLine();
        meisai.setDate(item.getElementsByClassName("m-mtphistorypanel_historydate")[0].textContent);
        const span = item.getElementsByTagName("span");
        meisai.setTitle(span[0].textContent);
        meisai.setOutgo(span[1].textContent);
        meisai.setCard("AEON");
        return meisai.print();
    }).reverse().join("\n");

    return seikyuStr + "\n" + meisaiStr;
}
