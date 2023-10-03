import { MiniMaple } from "./miniMaple";

document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('diff_polynom').onclick = diffPolynom;
}

function diffPolynom(){
    let polynom = document.getElementById('polynom_input').value;
    let diff_variable = document.getElementById('diff_variable_input').value;
    let my_minimaple = new MiniMaple(polynom,diff_variable);
    let res = my_minimaple.diff();
    document.getElementById('result_output').innerHTML = res;
}
