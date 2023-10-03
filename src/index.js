import { MiniMaple } from "./miniMaple";

document.addEventListener('DOMContentLoaded',setup)

function setup() {
    document.getElementById('diff_polynom').onclick = diffPolynom;
}

function diffPolynom(){
    let polynom = document.getElementById('polynom_input');
    let diff_variable = document.getElementById('diff_variable_input');
    const my_minimaple = new MiniMaple('4*x^3 - x^-2','-x');
    let mon = my_minimaple.GetArrayMononoms();
    document.getElementById('result_output').innerHTML = mon[1];
    
    //parseFloat('-x^-2'.split('').reverse().join('')).toString().split('').reverse().join('');
}