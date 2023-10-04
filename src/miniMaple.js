class MiniMaple{
    constructor(polynom,diff_variable){
        this._polynom = polynom;
        this._diff_variable = diff_variable;
    }
    diff(){
        if(this._polynom == undefined || this._polynom.replaceAll(' ','').length == 0)
            return "non";
        if (this._diff_variable == undefined || this._diff_variable.replaceAll(' ','').length != 1)
            return "Ошибка. Переменная, по которой дифференцируем, должна быть записана одной буквой.";
        let mononoms = this.GetArrayMononoms();
        let res = "";
        for( let i = 0; i < mononoms.length; i++){
            let coef = parseFloat(mononoms[i]);
            let deg = parseFloat(mononoms[i].split('').reverse().join('')).toString().split('').reverse().join('');
            if(mononoms[i][mononoms[i].length - deg.length -1] == '-')
                deg = '-' + deg;
            let variable = mononoms[i].match(/[a-zA-Zа-яА-Я]/g);
            if(variable == null){
                if(mononoms[i] != coef)
                        return "Ошибка. Некорректно задан многочлен: свободный член должен быть числом.";
            }
            else if(variable.length > 1)
                return "Ошибка. Одночлен должен содержать максимум одну переменную.";
            else if(variable == this._diff_variable){
                if(!isNaN(coef) && !isNaN(deg)){
                    if(mononoms[i] != coef + '*' + variable + '^' + deg)
                        return "Ошибка. Некорректно задан многочлен : одночлен с явными коэффициентом и степенью не соответствует шаблону.";
                    else{
                        if (res != '' && parseFloat(coef)*parseFloat(deg) > 0 )
                            res += ' + ';
                        res += parseFloat(`${parseFloat(coef)*parseFloat(deg)}`) == 1 ? '' : `${parseFloat(coef)*parseFloat(deg) == -1 ? "- " : parseFloat(coef)*parseFloat(deg) + '*'}`;
                        if(deg - 1 == 1)
                            res += variable + ' ';
                        else
                            res += variable + '^' + `${parseFloat(deg - 1) > 0 ? parseFloat(deg - 1) : '(' + parseFloat(deg - 1) + ') '}`;
                    }
                }
                else if (!isNaN(coef)){
                    if(mononoms[i] != coef + '*' + variable)
                        return "Ошибка. Некорректно задан многочлен : одночлен с явным коэффициентом не соответствует шаблону";
                    else if (coef > 0){
                        if (res == '')
                            res += coef + ' ';
                        else res += '+ ' + coef + ' ';
                    }
                    else{
                        if (res == '')
                            res += '-' + parseFloat(-1*coef) + ' ';
                        else res += '- ' + parseFloat(-1*coef) + ' ';
                    }
                }
                else if (!isNaN(deg)){
                    if(mononoms[i][0] == '-' && mononoms[i] == '-' + variable + '^' + deg){
                        if (res != '' && parseFloat(deg) < 0)
                            res += ' + ';
                        res += parseFloat(`${-1*parseFloat(deg)}`) == 1 ? '' : `${-1*parseFloat(deg) == -1 ? "- " : -1*parseFloat(deg) + '*'}`;
                        if(deg - 1 == 1)
                            res += variable + ' ';
                        else
                            res += variable + '^' + `${parseFloat(deg - 1) > 0 ? parseFloat(deg - 1) : '(' + parseFloat(deg - 1) + ') '}`;
                    }
                    else if(mononoms[i] == variable + '^' + deg)
                    {
                        if (res != '' && parseFloat(deg) > 0)
                            res += ' + ';
                        res += parseFloat(`${parseFloat(deg)}`) == 1 ? '' : `${parseFloat(deg) == -1 ? "- " : parseFloat(deg) + '*'}`;
                        if(deg - 1 == 1)
                            res += variable + ' ';
                        else
                            res += variable + '^' + `${parseFloat(deg - 1) > 0 ? parseFloat(deg - 1) : '(' + parseFloat(deg - 1) + ') '}`;
                    }
                    else return "Ошибка. Некорректно задан многочлен: одночлен с явной степенью не соответствует шаблону.";
                }
                else{
                    if(mononoms[i] == variable)
                    {
                        if(res != '')
                            res += '+ 1 ';
                        else
                            res += '1 ';
                    }
                    else if(mononoms[i] == '-' + variable)
                    {
                        if(res != '')
                            res += '- 1 ';
                        else
                            res += '-1 ';
                    }
                    else return "Ошибка. Некорректно задан многочлен: одночлен с неявными коэффициентом и степенью не соответствует шаблону.";
                }
            }
        }
        if(res=="")
            return "0";
        return res.trim();
    }

    /*Получение массива одночленов многочлена*/
    GetArrayMononoms(){
        this._polynom = this._polynom.replaceAll(' ','');
        this._polynom = this._polynom.replaceAll("-","+-");
        if(this._polynom[0] == '+')
            this._polynom = this._polynom.substring(1);
        let arr = this._polynom.split('+');
        for (let i = 0; i < arr.length; i++){
            if(arr[i][arr[i].length-1]=='^')
            {
                let first = arr[i];
                let second = arr[i+1];
                arr.splice(i,i+1);
                arr.splice(i,0,first+second);
            }
        }
        return arr;
    }
}

export {MiniMaple}
