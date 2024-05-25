const toNumber = (str) => {
    return Number(str.replace(/[^0-9]/g,""));
}

const date = (ymmdd) => {
    const ymd = ymmdd.replace(/[^0-9\-]/g, "").split("-")
    const yyyy = parseInt(ymd[0]) + 2018;
    return `${yyyy}.${ymd[1]}.${ymd[2]}`;
}

const showMatrix = () => {
    const tr = Array.from(document.querySelectorAll("table tr"));
    tr.shift();
    let data = [];
    for (let i = 0;  i < tr.length;  i++) {
        data.push(date(tr[i].cells[0].textContent)+"\t"+toNumber(tr[i].cells[1].textContent)+"\t"+toNumber(tr[i].cells[3].textContent)+"\t"+tr[i].cells[2].textContent.trim()+"\t\t\t"+toNumber(tr[i].cells[4].textContent));
    }
    const result = data.join("\n");
    navigator.clipboard.writeText(result).then(() => console.log("ok")).catch((e) => console.error(e));
    alert(result);
}

addEventListener("keydown", (key) => {
    key.stopPropagation();
    if (key.key === "v") showMatrix();
})
