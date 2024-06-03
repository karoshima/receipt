const getMatrix = () => {
    const date1field = document.getElementsByClassName("usageStatus-body__title");
    if (date1field.length > 0) {
        // 請求額ページ
        const line = new SheetLine();
        line.setDate(document.getElementsByClassName("usageStatus-body__title")[0].getElementsByTagName("span")[0].textContent);
        line.setTitle("旧PARCOカード");
        line.setClaim(document.getElementsByClassName("usageStatus-body__numberResult")[0].getElementsByTagName("span")[0].textContent);
        return line.print();
    } else {
        // 利用一覧
        return Array.from(document.getElementsByClassName("used-record"))
            .map((tr) => {
                const line = new SheetLine();
                line.setDate(tr.getElementsByClassName("read-item-date")[0].textContent);
                line.setTitle(tr.childNodes[0].childNodes[0].textContent);
                line.setOutgo(tr.getElementsByClassName("read-item-amount")[0].textContent)
                line.setCard("旧PARCOカード");
                return line.print();
            }).join("\n");
    }
}
