const getTable = () => {
    const table = Array.from(document.getElementsByClassName("t1 mb-0")[0].children);
    table.shift();
    let data = [];

    table.forEach(div => {
        const line = new SheetLine(
            div.getElementsByClassName("txt-date")[0].textContent,
            div.getElementsByClassName("txt-ellipsis")[0].textContent,
            "みずほ",
            div.getElementsByClassName("t1-2")[0].textContent,
            0,
            div.getElementsByClassName("t1-3")[0].textContent,
        );
        if (line.title === "セゾン") {
            data.unshift(new SheetLine(
                line.date,
                "返済",
                "旧PARCO請求",
                0,
                line.delta,
                cardsettlement
            ).print());
        }
        if (line.title === "ＵＣ") {
            data.unshift(new SheetLine(
                line.date,
                "返済",
                "トラベランス請求",
                0,
                line.delta,
                cardsettlement
            ).print());
        }
        if (line.title === "ミツイスミトモカ－ド　（カ") {
            data.unshift(new SheetLine(
                line.date,
                "返済",
                "Ａｍａｚｏｎ請求",
                0,
                line.delta,
                cardsettlement
            ).print());
        }
        if (line.title === "イオンフイナンシヤルサ－ビス") {
            data.unshift(new SheetLine(
                line.date,
                "返済",
                "マルエツカード請求",
                0,
                line.delta,
                cardsettlement
            ).print());
        }
        if (line.title === "ビユ－カ－ド") {
            data.unshift(new SheetLine(
                line.date,
                "返済",
                "ビック請求",
                0,
                line.delta,
                cardsettlement
            ).print());
        }
        data.unshift(line.print());
    });
    return data;
}

const getMatrix = () => {
    return getTable().join("\n");
}
