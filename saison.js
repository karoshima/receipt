const getMatrix = () => {
    // 旧PARCO? ラゾーナ？
    let card = document.getElementsByClassName("login_card_name");
    if (card.length === 0) {
        card = document.getElementsByClassName("select-card-area");
    }
    const cardName = card[0].innerText;
    console.log(cardName);
    var riyou, seikyu;
    if (cardName.includes("ＳＡＩＳＯＮ　ＧＯＬＤ　Ｐｒｅｍｉｕｍ（旧ＰＡ）")) {
        riyou = "旧PARCO利用";
        seikyu = "旧PARCO請求";
    }
    else if (cardName.includes("ラゾーナ川崎プラザカード")) {
        riyou = "ラゾーナ利用";
        seikyu = "ラゾーナ請求;"
    } else {
        riyou = `Unknown card Usage "${cardName}"`;
        seikyu = `Unknown card Billing "${cardName}"`;
    }
    const date1field = document.getElementsByClassName("usageStatus-body__title");
    if (date1field.length > 0) {
        // 請求額ページ
        const date = document.getElementsByClassName("usageStatus-body__title")[0].getElementsByTagName("span")[0].textContent;
        const price = document.getElementsByClassName("usageStatus-body__numberResult")[0].getElementsByTagName("span")[0].textContent;
        return [
            new SheetLine(
                date,
                "請求に移行",
                riyou,
                price,
                0,
                cardsettlement
            ).print(),
            new SheetLine(
                date,
                "請求",
                seikyu,
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
                    riyou,
                    0,
                    tr.getElementsByClassName("read-item-amount")[0].textContent,
                    cardsettlement
                ).print();
            }).reverse().join("\n");
    }
}
