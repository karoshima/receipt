const getMatrix = () => {
    const date1field = document.getElementsByClassName("usageStatus-body__title");
    if (date1field.length > 0) {
        // 請求額ページ
        const date = document.getElementsByClassName("usageStatus-body__title")[0].getElementsByTagName("span")[0].textContent;
        const price = document.getElementsByClassName("usageStatus-body__numberResult")[0].getElementsByTagName("span")[0].textContent;
        return [
            new SheetLine(
                date,
                "請求に移行",
                "旧PARCO利用",
                price,
                0,
                cardsettlement
            ).print(),
            new SheetLine(
                date,
                "請求",
                "旧PARCO請求",
                0,
                price,
                cardsettlement
            ).print()
        ].join("\n");

    } else {
        // 利用一覧
        return Array.from(document.getElementsByClassName("used-record"))
            .map((tr) => {
                return new SheetLine(
                    tr.getElementsByClassName("read-item-date")[0].textContent,
                    tr.childNodes[0].childNodes[0].textContent,
                    "旧PARCO利用",
                    0,
                    tr.getElementsByClassName("read-item-amount")[0].textContent,
                    cardsettlement
                ).print();
            }).reverse().join("\n");
    }
}
