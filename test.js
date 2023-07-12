var arr = []
for (var i = 0; i < 5; i++ ) {
    arr[i] = function(id) {
        return function() {
            return id;
        }
    }(i);
}

for (var index in arr) {
        console.log(arr[index]());
}


var tetris = [[0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],                      
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0],] 


              


function Person(name){
this.name = name; 
}
Person.prototype.name=null;
Person.prototype.introduce = function(){
    return 'My name is ' + this.name
}

function Programmer(name){
    this.name = name; 
}
Programmer.prototype = new Person();
Programmer.prototype.coding = function(){
    return "hello world";
}

var p1 = new Programmer('person1');
console.log(p1.introduce());
console.log(p1.coding());

/* 내장 객체들 모음 
Object 
Function
Array
String
Boolean
Number
Math
Date
RegExp

*/


var arr = new Array('seoul','nmew york','ladarkh','pusan','Tsukuba')
function getRandomValueFromArray(haystack){
    var index = Math.florr(haystack.length*Math.random());  //Math.random 함수를 활용해 배열의 크기 범위 내의 무작위 난수(정수)를 추출함.
    return haystack[index];
}

//배열 속성에 아예 추가시켜 버리기 ~ 
Array.prototype.rand = function() {
    var index = Math.floor(this.length*Math.random());
    return this[index];
}

var 표준내장객체 = {}
// 일반화
표준내장객체.prototype.func = function() {
    //add method in here 
    console.log('test');
}

// Object 객체의 Property는 모든 객체에 적용이 됨 ->  Array, function, String 등 다양한 객체 Format에 자동적으로 적용됨. 

//Primitive Types... 

//참조와 복제.. 


var a = 1 ; 
var b = a; 
b = 2 
console.log(a); // 1 원시 데이터형(Primitive Types는 복제 가능)

var a = {id : 1}
var b = a ; 
b.id = 2 
console.log(a.id) // 2 객체 (참조 데이터형)는 값을 참조하도록 되어 있음. (복제가 아님 )


var a = 1; 
function func(b){
    b = 2; 
}
func(a);
console.log(a);

var a = {id : 1};
function func(b){
    b = {id:2};
}
func(a);
console.log(a.id);


//함수 내부의 선언을 통해 신규 객체가 생김. 그러나 참조는 기존을 참조하게 돔. 



//Prototype은 객체의 원형 , 함수는 객체 생성자 함수 도 객체. 
//Prototype Property에 저장된 속성들은 생성자를 통해서 객체가 만들어질때 그 객체에 연결된다.

//when using new function ().....
//copy and past all properties of function's Prototype. 
// and can use Prototype chains.. 

// Ultra - Sub.Prototype - Super.Prototype - Ultra.Prototype 
//왜 test가 잘 안되는것 같냐...
