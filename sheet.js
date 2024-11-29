const toNum = (val) => {
    return (typeof(val) === "number") ? val : Number(val.replace(/[^0-9-]/g, ''));
}

const cardsettlement = '=SUMIF(INDIRECT(ADDRESS(1,COLUMN()-2)):INDIRECT(ADDRESS(ROW(),COLUMN()-2)),INDIRECT(ADDRESS(ROW(),COLUMN()-2)),INDIRECT(ADDRESS(1,COLUMN()-1)):INDIRECT(ADDRESS(ROW(),COLUMN()-1)))';

class SheetLine {
    date;     // 日付
    title;    // 取引内容
    purse;    // 口座
    delta;    // 入金(負値=出費)
    total;    // 残高

    constructor(date, title, purse, puls, minus, total) {
        this.setDate(date);
        this.setTitle(title);
        this.setPurse(purse);
        this.setDelta(puls, minus);
        this.setTotal(total);
    }

    print = () => {
        return [
            this.date,
            this.title,
            this.purse,
            this.delta,
            this.total
        ].join("\t");
    }

    setDate = (val) => {
        let match = val.match(/(\d\d\d\d)[年\-\./](\d\d?)[月\-\./](\d\d?)/);
        if (match) {
            match.shift();
            this.date = match.join("-");
            return;
        }
    }
    setTitle = (val) => {
        this.title = val.trim();
    }
    setPurse = (val) => {
        this.purse = val.trim();
    }
    setDelta = (plus, minus) => {
        this.delta = toNum(plus) - toNum(minus);
    }
    setTotal = (val) => {
        this.total = (typeof(val) === "number") ? val
                   : (val.at(0) === "=") ? val
                   : Number(val.replace(/[^0-9]/g, ''));
    }
}

addEventListener("keydown", (key) => {
    key.stopPropagation();
    if (key.key === "v") {
        const data = getMatrix();
        if (data !== "") {
            navigator.clipboard.writeText(data).then(() => console.log("ok")).catch((e) => console.error(e));
            alert(data);
        }
    }
})
