//write examples and Quizs.. 








// 0. JS essentials. 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//0-1. 다음 중 변수 이름 지정 방법이 잘못된 것은? 

//1
var very_important = "very_important";
//2
var important_999 = "important_999";
//3
var important! = "important!";
//4
var VeRY_Imp_orTant = "VeRY_Imp_orTant";

const answer0_1 = "The answer is 3. 변수명은 숫자로 시작할수 없고, 공백, 기호, 마침표가 들어갈 수 없음.="


//0-2. 다음 중 원시 자료형이 아닌 것은 ?

//1. symbol

//2. boolean

//3. null

//4. Object 

const answer0_2 = "The answer is 4. Object 는 객체 자료형, symbol : ES2016에서 추가됨."

//0-3. 다음중 객체를 정의하는 올바른 방법은? 

//1
const car1: {color : "red"};
//2
const car2 = {color = "red"}; 
//3
const car3 = {color : "red"};
//4
const car4: {color = "red"}


const answer0_3 = "The answer is 3."

//0-4. 다음 코드의 올바른 출력은 무엇인가?  

const obj1 = {a: 1};
const obj2 = {a: 1};

console.log(obj1 === obj2);
//1. true

//2. undefined

//3. false

//4. null


const answer0_4 = "The answer is 3. 객체는 각각 별개로 인식된다. 따라서 완전 항등 연산자에서는 다른 것으로 판단됨."


//0-5. 다음 코드의 올바른 출력은 무엇인가?  
const fruitBasket = ["apple","banana","orange"];
fruitBasket.unshift('melon');
console.log(fruitBasket);


//1. ["apple","banana","orange","melon"];

//2. ["melon"]

//3. ["apple","banana","orange","pear","melon"];

//4. ["melon","apple","banana","orange"];


const answer0_5 = "The answer is 4. arr.unshift : 배열의 시작에 추가 , arr.push : 배열의 마지막에 추가"


/***************************************************************************************************************************************************************************************/













//1. var, let, const
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//1_1. 다음 코드의 올바른 출력은?   
var greeting = "Hello";

greeting = "Farewell"; 

console.log(greeting);
for(var i = 0; i < 2; i++){
    var greeting ="Good moring";
}

console.log(greeting);
//1. Hello

//2. Good morning

//3. FarelWell



const answer1_1 = "The answer is 2. var의 경우 스코프는 함수안에만 존재하기 때문에 Farewell => Good mornig 으로 재할당한다."


//1-2. 다음 코드의 올바른 출력은?  
let value = 1; 

if(true) { 
    let value = 2; 
    console.log(value);
}

value = 3; 

//1. 1

//2. 2

//3. 3

const answer1_2 = "The answer is 2. let의 경우 스코프는 괄호를 기준으로 설정됨. 따라서 if문 안과 밖의 value는 서로 다른 변수임."

//1-3. 다음 코드의 올바른 출력은?  
let x = 100;

if(x > 50){
    let x = 10 ;
}
console.log(x);

//1. 10

//2. 100

//3. 50

const answer1_3 = "The answer is 2."

//1-4. 다음 코드의 올바른 출력은?  
console.log(constant);
 
const constant = 1;
//1. undefined

//2. ReferenceError

//3. 1

const answer1_4 = "The answer is 2. let과 const는 정의하기 전에 접근할 수 없다. (var는 정의 전에 접근 가능 하나 값X) "

/***************************************************************************************************************************************************************************************/



//2. Arrow Function

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//2-1. 다음 중 화살표 함수를 문법에 맞게 활용한 예는?
let arr = [1,2,3];

//1
let func = arr.map(n -> n +1);
//2
let func = arr.map(n => n +1);
//3
let func = arr.map(n ~> n +1);

const answer2_1 = "The answer is 2."



//2-2. 다음 코드의 올바른 출력은?
const person ={
    age: 10,
    grow: ()=> {
        this.age++;
    },
};
person.grow();

console.log(person.age);


//1. 10 

//2. 11

//3. undefined

const answer2_2 = "The answer is 2."



//2-3. 화살표 함수 문법을 사용해서 다음 코드를 리팩터링하자.

//Before 
function(arg) {
    console.log(arg);
}

//After 
arg => console.log(arg); 
(arg) => {
    console.log(arg);
}


/***************************************************************************************************************************************************************************************/






//3. function default arguments. 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*3-1. 다음 작업을 수행하는 코드를 작성해보자. 

다음코드에서 arg1 과 arg2를 변경하여 첫 번째는 tax를 나타내고 두 번째는 tip의 값을 나타내게 만들어보자. 

tax에는 기본값 0.1을 지정하고 tip에는 기본값 0.05를 지정하자.*/

function calculatePrice(total, arg1, arg2){
    return total + (total * tax) + (total * tip);
}
calculatePrice(10);

//anwer 
function caculatePrice(total, tax = 0.1, tip = 0.05){
    return total + (total * tax) + (total * tip);
}
calculatePrice(10);



//3-2. 다음 코드의 올바른 출력은? 
var b = 3; 
function multiply(a, b = 2) {
    return a * b;
}
console.log(multiply(5));


//1. 2

//2. 5

//3. 10

//4. 15

const answer3_2 = "The answer is 3."


/***************************************************************************************************************************************************************************************/


//4. Templet Literals
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


/*4-1. 다음 작업을 수행하는 코드를 작성하자. 

템플릿 리터럴을 활용하여 다양한 변수를 결합하고 원하는 출력을 얻도록 코드를 구현해보자.*/

//-------------------------------------------------------------------------
let a = "Hello,";
let b = "is";
let c = "my";
let d = "name";
let e = "Tom";

//예상 결과를 얻기 위해 다음 코드를 수정해보자.

//Before
let result1 = '';

//After
let result2 = `${a}${c}${d}${b}${e}`;

console.log(result2)
//예상 결과 : Hello, my name is Tom

//4-2. 템플릿 리터럴을 사용하여 다음 코드를 리팩터링 하자.
let a1 = "1";
let b1 = "2";
let c1 = "plus";
let d1 = "3";
let e1 = "equals";

//다음 코드에 템플릿 리터럴을 사용해보자. 

//Before
let result3 = a1 + " " + c1 + " " + b1 + " " + e1 + " " + d1;

//After
let result4 = `${a1} ${c1} ${b1} ${e1} ${d1}`;

console.log(result4);



//4-3. 템플릿 리터럴을 사용하여 다음 코드를 리팩터링 하자.

//다음 코드에 템플릿 리터럴을 사용해보자. 

//Before
let str1 = 'this is  a very long text\n' + 
'a very long text';

//After
let str2 = `this is  a very long text
a very long text`;

console.log(str);

    
/***************************************************************************************************************************************************************************************/


//5. String Methods 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//5-1. 다음 코드의 올바른 출력은? 
const code1 = "ABCDEFGHI";

code.startsWith("DEF",3);

//1. true

//2. false

const answer5_1 = "The answer is 1." 

//5-2. 다음 코드의 올바른 출력은? 
const code2 = "ABCDEF";
code.endswith(def);

//1. true

//2. false

const answer5_2 = "The answer is 2. endswith, startsWith 는 대소문자를 구분함." 

//5-3 원하는 값을 출력하도록 코드의 구현을 완성하자. 
let str = "Na"
let bat = "BatMan"

//answer
let batman = `${str.repeat(8)} ${bat}`;
console.log(batman);
// 예상 결과: NaNaNaNaNaNaNaNa Batman


/***************************************************************************************************************************************************************************************/







//6. Destructuring
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/*6-1. 다음 작업을 수행하는 코드를 작성하자. 

디스트럭처링을 사용하여 두 변수의 값을 교체하자. */
let hungry = "yes";
let full = "no";

//answer
[hungry,full] = [full, hungry];

console.log(hungry);

console.log(full);

/*6-2 다음 작업을 수행하는 코드를 작성하자.

한 줄의 코드로 다음 배열의 각 값을 저장하는 변수를 선언하자. */
let arr2 = ["one","two","three"];
let[one,two,three] = arr2;

console.log(one);

console.log(two);

console.log(three);

/***************************************************************************************************************************************************************************************/




//7. Loop
//7-1. ES6에 새로 도입된 루프는 무엇인가?

//1. while

//2. for of

//3. for in 

const answer7_1 = "The answer is 2."

//7-2. 다음 코드의 올바른 출력은?
let people = ["Tom","Jerry","Mickey"];

for (let person of people) {
    console.log(person);
}

//1. Tom Jerry

//2. Tom 

//3. Tom Jerry Mickey 

//4. Mickey

const answer7_2 = "The answer is 3."

/***************************************************************************************************************************************************************************************/

//8. Array Methods 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


/*8-1. 다음 작업을 수행하는 코드를 작성하자. 

다음과 같은 코드에서, 문자열의 각 문자가 배열의 각 원소가 되도록 새 배열을 생성하자.*/

const apple = "Apple";

//answer
const myArr = Array.from(apple);
console.log(myArr);
//기대 출력: ["A","p","p","l","e"]


//8-2. 다음 코드의 올바른 출력은?
const array3 = [1,2,3,4,5];
let found = array3.find(e => e >3)

console.log(found);
//1. 3

//2. 5

//3. 4,5

//4. 4

const answer8_2 = "The answer is 3."

//8-3. 다음 코드의 올바른 출력은?
const array4 = [1,2,3,4,5,6,1,2,3,1];
let arraySome = array4.some(e => e >2);

console.log(arraySome);


//1. 2

//2. false 

//3. 3

//4. true

const answer8_3 = "The answer is 4."


//8-4. 다음 코드의 올바른 출력은?
Array.from([1,2,3],x => x*x);
//1. [1,2,3]

//2. [1,4,9]

//3. [1,3,5]


const answer8_4 = "The answer is 2. Array.from method는 두번째 인자에 함수를 할당할수 있다. "


/***************************************************************************************************************************************************************************************/






//9. spread operator & rest parameter
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//9-1. 배열의 값을 확장하기 위한 스프레드의 올바른 문법은? 

//1. [.]

//2. (...)

//3. [...]

//4. {...}

const answer9_1 = "The answer is 3. "

/* 9-2. 다음 작업을 수행하는 코드를 작성하자. 
veggie와 meat가 주어졌을 때, 다음을 포함하는 menu라는 새 배열을 생성하자. 
- veggie의 모든 값
- 'pasta' 값을 가지는 새 문자열
-  meat의 모든 값   */

const veggie = ["tomato", "cucumber", "beans"];
const meat = ["pork", "beef", "chicken"];

//answer
const menu = [...veggie, "pasta", ...meat]

/*9-3. 다음 작업을 수행하는 코드를 작성하자. 

다음과 같이 배열 runners가 주어졌을 때, 처음 2개 이후의 모든 값을 포함하는 losers라는 새 배열을 생성하자.   */

const runners = ["Tom","paul", "Mark", "Luke"];

const [first, second, ...losers];
console.log(losers);


//9-4. 다음 코드의 올바른 출력은? 
let arr5 = [1,2,3,4];

let arr6 = arr; 

arr6.push(5);
console.log(arr5);

//1. [1,2,3,4]

//2. [1,2,4,5]

//3. [1,2,3,4,5]

//4. "1,2,3,4,5"

const answer9_4 = "The answer is 3. "


/***************************************************************************************************************************************************************************************/


//10. Object Literal Upgrades
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//10-1. 다음 코드를 더 간결하게 리팩터링 하자.

const animal1 = {
    name: name,
    age: age,
    breed: breed,
};
//============================= After

const animal2 = {
    name,
    age,
    breed,
}


//10-2. 다음 코드의 올바른 출력은? 
const name = "myname";
const person1 = {
    [name]: "Alberto",
};
console.log(person1.myname);

//1. name

//2. "Alberto"

//3. myname 

//4. "name"

const answer10_2 = "The answer is 2."

//10-3. 다음 코드의 올바른 출력은? 
const name2 = "myname";
const age = 27; 
const favoriteColor = "Green";
const person2 = {
    name2,
    age, 
    color,
};
console.log(person2.color);

//1. "Green"

//2. color

//3. color is not defined 

//4. faviruteColor

const answer10_3 = "The answer is 3."


/***************************************************************************************************************************************************************************************/




//11. Symbol
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Samples
const office = {
    [Symbol("Tom")]: "CEO",
    [Symbol("Mark")]: "CTO",
    [Symbol("Mark")]: "CIO",
}

const symbols = Object.getOwnPropertySymbols(office);
const value1 = symbols.map(symbol => office[symbol]);


//11-1. 심벌이란?

//1. 원시인

//2. 속성

//3. 원시 자료형

//4. 함수의 일종

const answer11_1 = "The answer is 3."

//11-2. 심벌의 주요 특징은? 

//1. 값을 다시 할당하려고 하면 오류가 발생한다.

//2. for 루프 내에서 작동하지 않는다.

//3. 고유성을 지닌다. 

//4. 정수가 아닌 문자열만 담을 수 있다. 

const answer11_2 = "The answer is 3."


//11-3. 다음 코드의 올바른 출력은? 
const friends = {
    "Tom": "biff",
    "Jim": "brother",
    "Tom": "cousin",
};

for (friend in friends) { 
    console.log(friend);
}

//1. Jim Tom

//2. Error

//3. Tom Jim Tom 

//4. Tom Jim

const answer11_3 = "The answer is 4."

//11-4. 다음 코드의 올바른 출력은? 
const family = {
    [Symbol("Tom")]: "father",
    [Symbol("Jane")]: "mother",
    [Symbol("Tom")]: "brother",
}

const sybols = Object.getOwnPropertySymbols(family);
console.log(symbols);

//1. Symbol(Tom) Symbol(Jane) Symbol(Tom)

//2. Symbol(Tom) Symbol(Jane) 

//3. undefined

//4. Symbol(Jane) Symbol(Tom)

const answer11_4 = "The answer is 1."

/***************************************************************************************************************************************************************************************/



//12. Class
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//12-1. 클래스란? 

//1. 새로운 원시 자료형

//2. 프로토타입 상속을 수행하기 위한 문법적 설탕

//3. 새로운 유형의 배열

const answer12_1 = "The answer is 2."

//12-2. 클래스를 선언하는 옳은 방법은? 

//1.
const person = class Person{...};
//2.
const person = new class Person {...};
//3.
class Person {...};

const answer12_2 = "The answer is 3."

//12-3. 정적 메서드란?

//1. 변경할 수 없는 메서드

//2. 클래스의 모든 인스턴스에서 접근할 수 있는 메서드

//3. 클래스 자체로 접근할 수 있는 메서드

const answer12_3 = "The answer is 3."

//12-4. 다음 코드의 올바른 출력은? 

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}
class Adults extends Person {
    constructor(work) {
        this.work = work;
    }
}

const my = new Adults('software developer');
console.log(my.work);


//1. "softeware dveloper"

//2. 'Error: age is not defined'

//3. ReferenceError: Must call super cons   tructor in derived class before accessing 'this'

const answer12_4 = "The answer is 3."

/*12-5 다음작업을 수행하는 코드를 작성하자. 

다음과 같이 클래스가 주어졌을 때 해당 클래스를 상속하여 work라는 새 속성을 가지는 새로운 Adult 클래스를 만들자.     */

//기존 클래스
class Person1 {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    greet() { 
        console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old`);
    }
}

//Person을 상속받아 새로운 속성을 추가하여 클래스를 만들자.

class Adults1 extends Person1 {
    constructor(name,age,work){
        super(name,age);
        this.work = work;
    }
}

const me = new Adults1('Alberto', 27, 'software developer');
console.log(me.work);

/***************************************************************************************************************************************************************************************/

//13. Promise 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//13-1. 프로미스란? 

//1. 새로운 원시 자료형

//2. 비동기 작업의 최종 성공 또는 실패를 나타내는 객체 

//3. 새로운 유형의 루프

const answer13_1 = "The answer is 2."

/* 13-2. 다음 작업을 수행하는 코드를 작성하자. 

즉시 성공 처리되어 콘솔에 무언가를 출력하는 간단한 프로미스를 작성하라. */
const myPromise = Promise.resolve().then(function(value){console.log("value")}) 

//13-3. 다음 프로미스 메서드 중 존재하지 않는 것은? 

//1. Promise.race() 

//2. Promise.some()

//3. Promise.all()

//4. Promise.reject()

const answer13_2 = "The answer is 2."


//13-4. 다음 코드의 올바른 출력은? 

function myPromise(){
    return new Promise((resolve,reject) => {
        reject();
    });
}

myPromise()
    .then(() => {
        console.log('1');
    })
    .then(() => { 
        console.log('2');
    })
    .catch(() => {
        console.log('3');
    })
    .then(() => {
        console.log('4');
    })


//1. 1, 2, 3, 4 

//2. 3, 4, 1, 2

//3. 3, 4

//4. 4

const answer13_4 = "The answer is 3. 판정 : 실패 - 실패 - 성공(catch) - 성공(promise chaining) "
  

/***************************************************************************************************************************************************************************************/

//14. Generator
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//14-1. 제네레이터 함수의 올바른 문법은? 

//1. generator function() {...}

//2. new generator() {...}

//3. function*() {...}

const answer14_1 = "The answer is 3."

//14-2. 제네레이터의 주요 특징은 무엇인가?

//1. 실행을 멈출 수 없다.

//2. 다른 함수들을 생성할 수 있다. 

//3. 덮어 쓰는 것이 불가능하다. 

//4. 실행을 멈추거나 재시작할 수 있다. 

const answer14_2 = "The answer is 4."

//14-3. 다음 코드의 올바른 출력은? 

function* fruitList() { 
    yield 'Banana';
    yield 'Apple';
    yield 'Pomelo';
    yield 'Mangosteen'; 
    yield 'Orange';
}

const fruits1 = fruitList();
fruits1.next();
fruits1.next();
fruits1.next();

//1. {value: "Banana", done: false}

//2. {value: "Pomelo", done: true}

//3. {value: "Mangosteen", done: false }

//4. {value: "Pomelo", done: false}

const answer14_3 = "The answer is 4."


//14-4. 다음 코드의 올바른 출력은? 

function* fruitList() {
    yield 'Banana';
    yield 'Apple';
    yield 'Orange';
}

const fruits2 = fruitList(); 
fruits2.return();

//1. {value: "Banana", done: true}

//2. {value: undefined, done: false}

//3. {value: "Banana", done: false}

//4. {value: undefined, done: true}


const answer14_4 = "The answer is 4."

/***************************************************************************************************************************************************************************************/




//15. 프록시 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//15-1 프록시의 용도는?

//1. 고유한 값 저장

//2. 기본 작업에 사용자 지정 동작 정의

//3. 다른 함수가 접근할 수 없는 값 만들기 

const answer15_1 = "The answer is 2."


//15-2. 프록시는 몇 개의 매개변수를 받는가? 

//1. 1 

//2. 2

//3. 3

//4. 4 

const answer15_2 = "The answer is 2."

//15-3. 다음 중 올바른 것은? 

//1. 프록시의 target 매개변수는 배열이어야 한다. 

//2. 프록시의 target 매개변수는 배열이 아니어야 한다. 

//3. 프록시의 target 매개변수는 다른 프록시가 될 수 있다.  

//4. 프록시의 target 매개변수는 다른 프록시가 될 수 없다.  

const answer15_3 = "The answer is 3. 프록시의 target 매개변수는 객체, 함수, 다른 프록시 등 무엇이는 가능하다. "

/***************************************************************************************************************************************************************************************/





//16. Set, WeakSet, Map, WeakMap
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//16-1. 다음 중 존재하지 않는 것은? 

//1. Set

//2. WeakSet

//3. StrongSet

//4. WeakMap

const answer16_1 = "The answer is 3."

//16-2. 다음 정의 중 올바른 것은? 

//1. Set는 객체만 저장할 수 있다. 

//2. WeakSet은 객체만 저장할 수 있다. 

//3. WeakSet은 덮어 쓸 수 있다.

//4. Set 와 WeakSet 모두 객체만 저장할 수 있다. 

const answer16_2 = "The answer is 2."



//16-3. 다음 정의 중 올바른 것은? 

//1. Map은 키만 저장한다.

//2. Set는 키와 값을 모두 저장하고 Map은 값만 저장한다. 

//3. Map은 키와 값을 모두 저장하고 Set는 값만 저장한다. 

//4. Map과 Set 모두 값만 저장한다. 

const answer16_3 = "The answer is 3."

/***************************************************************************************************************************************************************************************/







//17. ES2016
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//17-1. ES2016에 도입된 새로운 배열 메서드는?

//1. Array.prototype.contains()

//2. Array.prototype.has() 

//3. Array.prototype.includes()

//4. Array.protype.find()

const answer17_1 = "The answer is 3."


//17-2. 다음 코드의 올바른 출력은? 
let array11 = [1, 3, 5, 7, 9, 11];

array11.includes(5,4);


//1. 4

//2. true

//3. 5

//4. false

const answer17_2 = "The answer is 4."

/*17-3. 다음 작업을 수행하는 코드를 작성해보자. 

새로운 지수 연산자를 활용하여 다음 코드를 리팩터링 하자 */

var math1 =Math.pow(Math.pow(2,2),2);
//16

//Answer
var math2 = 2**2**2;


/***************************************************************************************************************************************************************************************/


//18.StringPadding, Object.entries(), Object.values etc 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//18-1. 다음 코드의 올바른 출력은?

"hello".padStart(6);

//1. " hello"

//2. "hello "

//3. " hello "

//4. "hello"

const answer18_1 = "The answer is 1."

/*18-2. 다음 작업을 수행한느 코드를 작성하자.  

padStart를 사용하여 다음 세 문자열을 모두 오른쪽으로 정렬해보자. */
const strings = ["short","medium length","very long string"];

//기대 출력
//              short
//      medium length
//   very long string

//answer codes. 4 samples.

// option 1. const longestString = strings.map(str => str.length).sort()[0];

//option 2. const longestString = strings.sort((a,b) => b.length - a.length).map(str => str.length)[0];

const longestString = strings.sort(str => str.length*-1).map(str => str.length)[0];

strings.forEach(str => console.log(str.padStart(longestString)));



//18-3. 다음중 ES2016에 추가되지 않은 것은? 

//1. Object.entries()

//2. Object.keys()

//3. Object.values()


const answer18_3 = "The answer is 2."

//18-4. 다음 코드의 올바른 출력은? 

const buffer1 = new SharedArrayBufferArrayBuffer(16);
const unit81 = new Uint8Array(buffer)
uint81[0] = 10 ;

console.log(Atomics.add(uint81,0,5));

//1. 0

//2. 10

//3. 15

//4. 5

const answer18_4 = "The answer is 3."



//18-5. 다음 코드의 올바른 출력은? 

const buffer2 = new SharedArrayBufferArrayBuffer(16);
const unit82 = new Uint8Array(buffer)

uint82[0] = 10 ;

Atomics.sub(unit82,0,6);

console.log(Atomics.load(uint82,0));

//1. 0

//2. 10

//3. 6

//4. 4

const answer18_5 = "The answer is 3."


/***************************************************************************************************************************************************************************************/




//19. async, await 
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
