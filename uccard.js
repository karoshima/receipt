const getMatrix = () => {
    const seikyuuinfo = document.getElementsByClassName("seikyuuinfo");
    if (seikyuuinfo.length > 0) {
        // 銀行請求額
        console.log(seikyuuinfo[0]);
        const line = new SheetLine();
        line.setDate(seikyuuinfo[0].textContent.replace(/.*\n.*(\d\d\d\d年.*日).*/, "$1"));
        line.setTitle("富士通トラベランスカード");
        let claim = document.getElementsByClassName("bankClaimAmount-div-01")[0].textContent;
        if (!claim.includes("円")) {
            claim = document.getElementsByClassName("claimAmount-div-01")[0].getElementsByClassName("claimAmount-div-02")[0].textContent
        }
        line.setClaim(claim);
        return line.print();
    } else {
        // 最近のカード利用
        const trs = Array.from(document.getElementsByClassName("txt-s")[0].getElementsByTagName("tr"));
        trs.shift();
        trs.shift();
        return trs.map(tr => {
            const line = new SheetLine();
            tds = tr.getElementsByTagName("td");
            line.setDate(tds[0].textContent);
            line.setTitle(tds[2].textContent);
            line.setOutgo(tds[3].textContent);
            line.setCard("富士通トラベランスカード");
            return line.print();
        }).reverse().join("\n");
    }
};
