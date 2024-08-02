const getMatrix = () => {
    const seikyuuinfo = document.getElementsByClassName("seikyuuinfo");
    if (seikyuuinfo.length > 0) {
        // 銀行請求額
        const date = seikyuuinfo[0].textContent.replace(/.*\n.*(\d\d\d\d年.*日).*/, "$1");
        let price = document.getElementsByClassName("bankClaimAmount-div-01")[0].textContent;
        if (!price.includes("円")) {
            price = document.getElementsByClassName("claimAmount-div-01")[0].getElementsByClassName("claimAmount-div-02")[0].textContent
        }
        return [
            new SheetLine(
                date,
                "請求に移行",
                "トラベランス利用",
                price,
                0,
                cardsettlement
            ).print(),
            new SheetLine(
                date,
                "請求",
                "トラベランス請求",
                0,
                price,
                cardsettlement
            ).print()
        ].join("\n");
    } else {
        // 最近のカード利用
        const trs = Array.from(document.getElementsByClassName("txt-s")[0].getElementsByTagName("tr"));
        trs.shift();
        trs.shift();
        return trs.map(tr => {
            const tds = tr.getElementsByTagName("td");
            return new SheetLine(
                tds[0].textContent,
                tds[2].textContent,
                "トラベランス利用",
                0,
                tds[3].textContent,
                cardsettlement
            ).print();
        }).reverse().join("\n");
    }
};
