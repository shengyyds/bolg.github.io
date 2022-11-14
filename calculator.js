//获取元素
var keys = document.getElementById('keys');
var keys_tab = document.getElementById('keys_tab');
var keys_tab_td = keys_tab.getElementsByTagName('td');
// console.log(keys_tab_td);
// console.log(keys_tab_td.length);
var font = document.getElementById('font');
var show = document.getElementById('show');
var dis = document.getElementById('dis');
//正负号的获取
var minus_sign = document.getElementById('minus_sign');
var clear = document.getElementById('clear');
var clear_error = document.getElementById('clear_error');
//预存储的获取
var pre_storage = document.getElementById('pre_storage');
//等号的获取
var equals = document.getElementById('equals');


//定义标识符
//flag_result 代表是否点击了等于号，点击了就变成-1，每点击就是1；
var flag_result = 1;
//标识 接下来点击的数字键，是直接覆盖替换，还是拼接，-1 是拼接，1是替换
var flag_1 = -1;
//标识是否点击了运算符或者等号，点击了false,没点击是true
var flag_operator = true;

//为按键绑定属性
for (var i = 0; i < keys_tab_td.length; i++) {
    if (i != 4 && i != 0) {
        //给运算符键添加事件
        if (i == 3 || i == 8 || i == 12 || i == 16) {
            //给pre_storag加元素
            keys_tab_td[i].onclick = function () {
                console.log(this.innerHTML);
                if (flag_operator) {
                    //这是第一次点击运算符和点完等号之后的运算符，运行的结果
                    //这里添加一个判断，如果是点击等于之后的，再点击运算符，就将等于号删除
                    if (flag_result == -1) {
                        deletes(pre_storage);
                        flag_result = 1;
                    }
                    pre_storage.innerHTML = show.innerHTML + this.innerHTML;
                    flag_1 = 1;
                    flag_operator = false;
                    flag_result = 1;

                }
                else {
                    //这是点击第一次运算符后又一次点击运算符的运算：先将之前的计算了，将结果当成第二个运算表达式的第一个数值
                    var str = pre_storage.innerHTML + show.innerHTML;
                    var result = printFn(eval(str));
                    pre_storage.innerHTML = result + this.innerHTML;
                    show.innerHTML = result;
                    //给数字键一个标识，让其清空show.innerHTML
                    flag_1 = 1;

                }
            }
        }
        //给数字键添加事件
        if (i == 5 || i == 6 || i == 7 || i == 9 || i == 10 || i == 11 || i == 13 || i == 15 || i == 14 || i == 18 || i == 19) {
            keys_tab_td[i].onclick = function () {
                console.log(this.innerHTML);
                if (flag_1 == -1) {
                    show.innerHTML += this.innerHTML;
                }
                else {
                    //这里是判断点击等号后才执行的操作，else 是正常的操作
                    if (flag_result == -1) {
                        pre_storage.innerHTML = ""
                        show.innerHTML = this.innerHTML;
                        flag_1 = -1;
                        flag_result = 1;
                    }
                    else {
                        show.innerHTML = this.innerHTML;
                        flag_1 = -1;
                        flag_result = 1;
                    }
                }
            }
        }
    }
}

//负号的添加与删除
minus_sign.onclick = function () {
    var str = show.innerHTML;
    flag_result = -1;
    flag_1 = -1;
    // 分割字符串为单字符数组
    var arr = str.split("");
    if (arr[0] != '-') {
        show.innerHTML = "-" + show.innerHTML;
    } else {
        if (show.innerHTML == "-") {
            show.innerHTML = "";
        } else {
            show.innerHTML = Number(str) * (-1);
            // console.log(typeof show.innerHTML);
        }

    }
}
//删除负号的函数：
function minus_signs() {
    //设置替换空间
    var ti = "";
    var str = show.innerHTML;
    // 分割字符串为单字符数组
    var arr = str.split("");
    for (var i = 1; i < arr.length; i++) {
        ti += arr[i];
    }
    show.innerHTML = ti;
}

//C 键的作用：全部清零
//绑定事件：
clear.onclick = function () {
    clears();
}
function clears() {
    show.innerHTML = "";
    pre_storage.innerHTML = "";
}

//绑定 CE 键的事件；纠正当前的错误
clear_error.onclick = function () {
    clear_errors();
}
function clear_errors() {
    show.innerHTML = "";
}


//绑定 = 键的事件：将show里的innerHTML赋值到pre_storage里面，将showinnerHTML里面的存结果
equals.onclick = function () {
    //展示表达式
    equalss();
    //计算表达式，并展示计算结果
    result();
    //从这里标记一个值，用于判断下一步点的是数字还是运算符，要是点的是数字，就清空pre_storage,并把show的数值替换为点击的数字
    //若是点的运算符，则将result 赋值给pre_storage,并把运算符写上去
    flag_result = -1;
    flag_operator = true;
    flag_1 = 1;
}
function equalss() {
    pre_storage.innerHTML = pre_storage.innerHTML + show.innerHTML + "=";
}

//计算结果 result
//思想：识别pre_storage 中的字符串，将 = 之前的字符串转换为表达式，并转换为 Number 并计算
//便捷做法：eval()方法
function result() {
    //删除最后一个等于号
    deletes(pre_storage);
    var str = pre_storage.innerHTML;
    // console.log(typeof str)
    // console.log("'" + str + "'");
    console.log(printFn(eval(str)));
    var result = printFn(eval(str));
    show.innerHTML = result;
    pre_storage.innerHTML += "=";

}

//精度函数
function printFn(value) {
    const precision = 14;
    // value = math.format(value, precision);
    return Number(Math.floor(value * 10000000000000) / 10000000000000);
}


//将输入的数据删除一位...删除键
function deletes(replace) {
    //设置替换空间
    var ti = "";
    var str = replace.innerHTML;
    // 分割字符串为单字符数组
    var arr = str.split("");
    for (var i = 0; i < arr.length - 1; i++) {
        ti += arr[i];
    }
    replace.innerHTML = ti;
}


//给删除键绑定事件
font.onclick = function () {
    if (flag_result == 1)
        //当不按 = 号时一位一位删除
        deletes(show);
    // console.log(1);
    else {
        //当按了 = 后，在按删除键，就直接将 innerHTML = "";
        pre_storage.innerHTML = ""
    }

}
