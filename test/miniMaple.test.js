import {MiniMaple} from "../src/miniMaple";

/*test('it fails', () => {
    expect(false).toBeTruthy();
});*/

test('constructor of minimaple works successfully', () => {
    let miniMaple = new MiniMaple('-x^2 +x - 4','x');
    expect(miniMaple._polynom + ';' + miniMaple._diff_variable).toEqual('-x^2 +x - 4;x');
});

test('creation of array of mononoms of polynom works successfully', () => {
    let miniMaple = new MiniMaple('-x^2 +x - 4','x');
    let mononoms = miniMaple.GetArrayMononoms();
    expect(mononoms).toEqual(["-x^2","x","-4"]);
});

test('diff empty string returns non successfully', () => {
    let miniMaple = new MiniMaple('','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("non");
});

test('diff string with only spaces returns non successfully', () => {
    let miniMaple = new MiniMaple('     ','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("non");
});

test('diff undefined polynom returns non successfully', () => {
    let pol;
    let miniMaple = new MiniMaple(pol,'x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("non");
});

test('diff by empty diff_variable returns error successfully', () => {
    let miniMaple = new MiniMaple('-x^2 +x - 4',' ');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Переменная, по которой дифференцируем, должна быть записана одной буквой.");
});

test('diff by diff_variable with only spaces returns error successfully', () => {
    let miniMaple = new MiniMaple('-x^2 +x - 4','      ');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Переменная, по которой дифференцируем, должна быть записана одной буквой.");
});

test('diff by undefined diff_variable returns error successfully', () => {
    let variable;
    let miniMaple = new MiniMaple('-x^2 +x - 4',variable);
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Переменная, по которой дифференцируем, должна быть записана одной буквой.");
});

test('diff mononom with more than one variable returns error successfully', () => {
    let miniMaple = new MiniMaple('-x^2 +x*y*z - 4','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Одночлен должен содержать максимум одну переменную.");
});

test('diff mononom without variables but not only digits returns error successfully', () => {
    let miniMaple = new MiniMaple('-x^2 +x - 4^8%)','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Некорректно задан многочлен: свободный член должен быть числом.");
});

test('diff mononom with variables not equal diff_variable returns 0 successfully', () => {
    let miniMaple = new MiniMaple('-y^2 +y - 4','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("0");
});

test('diff mononom without variables returns 0 successfully', () => {
    let miniMaple = new MiniMaple('-453 + 254','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("0");
});

test('diff mononom x not on the beginning of polynom returns + 1 succesfully', () => {
    let miniMaple = new MiniMaple('3*x^2 +x -5','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("6*x + 1");
});

test('diff mononom x on the beginning of polynom returns 1 succesfully', () => {
    let miniMaple = new MiniMaple('+x - 5','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("1");
});

test('diff mononom -x not on the beginning of polynom returns - 1 succesfully', () => {
    let miniMaple = new MiniMaple('3*x^2 -x - 5','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("6*x - 1");
});

test('diff mononom -x on the beginning of polynom returns -1 succesfully', () => {
    let miniMaple = new MiniMaple('-x - 5','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-1");
});

test('diff uncorrect mononom with coef and deg returns error successfully', () => {
    let miniMaple = new MiniMaple('-2*x6)(^5','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Некорректно задан многочлен : одночлен с явными коэффициентом и степенью не соответствует шаблону.");
});

test('diff correct mononom with coef and deg works successfully', () => {
    let miniMaple = new MiniMaple('-2*x^3 +5*x^2 -7*x +1','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-6*x^2 + 10*x - 7");
});

test('diff uncorrect mononom with coef returns error successfully', () => {
    let miniMaple = new MiniMaple('-2*.x)(','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Некорректно задан многочлен : одночлен с явным коэффициентом не соответствует шаблону");
});

test('diff correct mononom with positive coef on the beginning of polynom works successfully', () => {
    let miniMaple = new MiniMaple('4*x','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("4");
});

test('diff correct mononom with negative coef on the beginning of polynom works successfully', () => {
    let miniMaple = new MiniMaple('-4*x','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-4");
});

test('diff correct mononom with positive coef not on the beginning of polynom works successfully', () => {
    let miniMaple = new MiniMaple('-5*x^2 + 4*x','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-10*x + 4");
});

test('diff correct mononom with negative coef not on the beginning of polynom works successfully', () => {
    let miniMaple = new MiniMaple('-5*x^2 - 4*x','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-10*x - 4");
});

test('diff uncorrect mononom returns error successfully', () => {
    let miniMaple = new MiniMaple('-*^x#','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Некорректно задан многочлен: одночлен с неявными коэффициентом и степенью не соответствует шаблону.");
});

test('diff correct mononom with negative deg not on the beginning of polynom works successfully', () => {
    let miniMaple = new MiniMaple('4*x^3 - x^-2','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("12*x^2 + 2*x^(-3)");
});

test('diff correct mononom with positive deg not on the beginning of polynom works successfully', () => {
    let miniMaple = new MiniMaple('4*x^3 + x^2','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("12*x^2 + 2*x");
});

test('diff correct mononom with deg not equal 2 works successfully', () => {
    let miniMaple = new MiniMaple('x^3','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("3*x^2");
});

test('diff uncorrect mononom with deg returns error successfully', () => {
    let miniMaple = new MiniMaple('x^(3 - 7','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("Ошибка. Некорректно задан многочлен: одночлен с явной степенью не соответствует шаблону.");
});

test('diff correct mononom with coef and deg that coef*deg = 1 works successfully', () => {
    let miniMaple = new MiniMaple('-2*x^3 +5*x^2 +x +1','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-6*x^2 + 10*x + 1");
});

test('diff correct mononom with coef and deg that coef*deg = -1 works successfully', () => {
    let miniMaple = new MiniMaple('-2*x^3 +5*x^2 -x +1','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-6*x^2 + 10*x - 1");
});

test('diff correct mononom with coef and negative deg that coef*deg != -1 and 1 works successfully', () => {
    let miniMaple = new MiniMaple('-2*x^3 +5*x^-2 + 2*x +1','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-6*x^2-10*x^(-3) + 2");
});

test('diff correct mononom with negative deg works successfully', () => {
    let miniMaple = new MiniMaple('-2*x^3 +x^-2 + 2*x +1','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-6*x^2-2*x^(-3) + 2");
});

test('diff correct mononom with positive deg works successfully', () => {
    let miniMaple = new MiniMaple('-x^3 + 2*x +1','x');
    let diff = miniMaple.diff();
    expect(diff).toEqual("-3*x^2+ 2");
});






