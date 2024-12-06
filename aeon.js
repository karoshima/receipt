const getMatrix = () => {
   
    const meisai = Array.from(document.getElementsByClassName("m-mtphistorypanel_historyitem"))
    .map(item => {
        const span = item.getElementsByTagName("span");
        return new SheetLine(
            item.getElementsByClassName("m-mtphistorypanel_historydate")[0].textContent,
            span[0].textContent,
            "マルエツカード利用",
            0,
            span[1].textContent,
            cardsettlement
        ).print();
    });

    const seikyuElem = document.getElementsByClassName("m-mtpusagepanel_infomation")[0];
    const date = seikyuElem.getElementsByClassName("m-mtpusagepanel_infomation_paymentdate")[0].textContent;
    const price = seikyuElem.getElementsByClassName("a-textprice-large")[0].textContent;
    meisai.unshift(
        new SheetLine(
            date,
            "請求に移行",
            "マルエツカード利用",
            price,
            0,
            cardsettlement
        ).print(),
        new SheetLine(
            date,
            "請求",
            "マルエツカード請求",
            0,
            price,
            cardsettlement
        ).print()
    );

    return meisai.reverse().join("\n");
}
