const PREV = '=INDIRECT(ADDRESS(ROW()-1,COLUMN()))';

class SheetLine {

    date;     // 日付
    flag;     // 請求精算フラグ、あるいはカード利用明細確認フラグ
    title;    // 取引内容
    income;   // 入金
    outgo;    // 出金
    claim;    // 請求
    mizuho;   // みずほ貯蓄額
    yucho;    // ゆうちょ貯蓄額
    card;     // カード名義

    // 口座
    // 入力: 日付, 取引内容, 入金, 出金, 貯蓄額
    // 作成: 日付, 取引内容, 入金, 出金, 貯蓄額

    // カード請求
    // 入力: 日付, 請求金額, 口座
    // 作成: 日付, フラグ, 請求, 口座
    //    - フラグは、"日付#請求金額" と同一の文字列が "日付#出金" にあれば「済」、まだなら「未」

    // カード利用明細
    // 入力: 日付, 取引内容, 利用金額, カード名
    // 作成: 日付, 取引内容, 利用金額, フラグ, カード名
    //    - 確認フラグは、js 内では空欄。あとで支払い確認で手入力してもらう。

    // 上記をベースに、以下を出力する
    print = () => {
        console.log(this);
        return [
            this.date,                               // $A: 日付
            this.title,                              // $B: 取引内容
            (this.income == 0) ? "" : this.income,   // $C: 入金
            (this.outgo == 0) ? "" : this.outgo,     // $D: 出金
            (this.claim == 0) ? "" : this.claim,     // $E: 請求
            (this.mizuho == 0) ? "" : this.mizuho,   // $F: みずほ貯蓄額
            (this.yucho == 0) ? "" : this.yucho,     // $G: ゆうちょ貯蓄額
            this.card,                               // $H: カード名
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
    setIncome = (val) => {
        this.income = Number(val.replace(/[^0-9]/g, ''));
    }
    setOutgo = (val) => {
        this.outgo = Number(val.replace(/[^0-9]/g, ''));
    }
    setClaim = (val) => {
        this.claim = Number(val.replace(/[^0-9]/g, ''));
    }
    setMizuho = (val) => {
        this.mizuho = val;
    }
    setYucho = (val) => {
        this.yucho = Number(val.replace(/[^0-9]/g,''));
    }
    setCard = (val) => {
        this.card = val;
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
