/* ===========================================================================
	Name : sample.js
	Content : Drag & Drop Event Wep Page Source Logics...
	GenDate : 
	GenUser: chanios127
	EditDate : 23-07-13
	EditUser : chanios127
	Version : 1.2
=========================================================================== */

//품목정보 리스트 생성 
class ProductList extends Array {       //클래스를 이용해 명세 정의 
    constructor(...products){
        super(...products)
    }
    amountSum() {
        let sum = this.reduce(function add(sum, currValue) {
            return sum + currValue.amount;
        }, 0);
        document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;
    }
    add(product){
        this.push(product);
    }
}
let cart = new ProductList();       //장바구니 리스트 정의 


//품목정보 명세 및 메소드 생성
class ProductInfo  {
    //constructor
    constructor(title, brand, price) {
        this.title = title;
        this.brand = brand;
        this.qty = 1;
        this.price = price;
        this.amount = 0;
        this.inputBox = null; 
    }

    //method 
    amountCalc() {
        this.amount = this.inputBox.value * this.price;   //calc
    }
    setValues(index) {
        value[index].value = cartQty[index];
    }
    setInputBoxValue() {
        this.inputBox.value = this.qty; // qty 값과 this.value 값을 동일하게?? 
    }
    
    set Qty(Qty) {
        this.qty = Qty;
    }

    set InputBox(obj){
        this.inputBox = obj;
    }

}

//상품 요소 동적 생성 함수  ==============================================================================END---
function genCardEvent(index, mode = "cards") {
    let btntext;
    let cardCSSClass; 
    let dragFg;
    let templet;
    //카드 템플릿 
    if (mode == "cards" ){
        btntext = `<a href="#" class="btn btn-primary putin">담기</a>`
        cardCSSClass = `product-card`
        dragFg = true
    }
    else if(mode == "cart"){
        btntext = `<input class = "cardEa" id = "carTd${index}"value = ""></input>`
        cardCSSClass = `cart-card`
        dragFg = false
    }
    

    templet= `<div class="card ${cardCSSClass}" id = "card${index}" draggable = "${dragFg}" >
    <img src="${products[index].photo}" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title">${products[index].title}</h5>
        <p class="card-text">${products[index].brand}</p>
        <p class="card-price">${products[index].price}</p>
        ${btntext}
    </div>
    </div>`;
    

    if (mode == "cards" ){
        document.querySelectorAll(`.${mode}`)[0].insertAdjacentHTML('beforeend', templet);	
		
		//이벤트 바인딩 ====================================================================================
		
		//담기 버튼
		document.querySelectorAll('.putin')[index].addEventListener('click', function (e) {
            genCardEvent(index,"cart")
        }); 


		//드래그 & 드롭 이벤트 (카드)
		document.querySelectorAll('.card')[index].addEventListener('dragstart', function (e) {
			e.dataTransfer.setData('text', index);
		});
	

    }
    else if(mode == "cart"){
        
        if (typeof cart[index] == 'undefined') { //장바구니에 없으면
            document.querySelectorAll(`.${mode}`)[0].insertAdjacentHTML('beforeend', templet);
            cart[index] = new ProductInfo(products[index].title, products[index].brand, products[index].price)
            cart[index].InputBox = document.querySelector(`#carTd${index}`);
			cart[index].inputBox.qty = 1;    //쿼리 셀렉터 미리 선언 세터 호출 방법? 
            cart[index].inputBox.value = cart[index].inputBox.qty;
            cart[index].amountCalc();
            cart.amountSum();

            cart[index].inputBox.addEventListener('input', function () {
				cart[index].inputBox.qty = Number(cart[index].inputBox.value);
				cart[index].amountCalc();
				cart.amountSum();
            }); //이벤트 리스너 미리 선언
        }
        // 이미 생성된 경우 ---------------------------------------------------------------	
        else {
            cart[index].inputBox.qty += 1;
			cart[index].inputBox.value = cart[index].inputBox.qty;
            //amountcalc
            cart[index].amountCalc();
            //Sum Amount
            cart.amountSum();
        }//else 끝 

    }
}
//상품 요소 동적 생성 ==============================================================================




/* 데이터 불러오기 ================================================================================*/
document.querySelectorAll('.cards')[0].innerHTML = ''; // 생성전 초기화
//fetch API는 실제로 Online 요청을 할 때에만 불러올 수 있기 때문에 로컬 Json File을 불러올수 있도록 재설정. 
// fetch('../store.json')
// 	.then((res) => res.json())
// 	.then(function (data) {
// 		products = data.products;
//}); 
//Store.json 파일에서 데이터를 가져온다.
let testData = JSON.parse(JSON.stringify(Store));
const products = testData.products


//드래그 & 드롭 이벤트 (장바구니)-----------------------
document.querySelectorAll('.cart')[0].addEventListener('dragover', function (e) {
	e.preventDefault();
});

document.querySelectorAll('.cart')[0].addEventListener('drop', function (e) {
	e.preventDefault();
	let index = e.dataTransfer.getData('text');
	genCardEvent(index,"cart");
});


//불러온 상품목록 기반으로 카드 생성
products.forEach((a, i) => {
	genCardEvent(i);
});


// 텍스트 색상 변환 함수 선언=========================================================================
function coloring(word, text, re_text) {
	let regexAllCase = new RegExp(word, 'gi');
	text = text.replace(regexAllCase, `${re_text}`);
	return text;
}
// 텍스트 색상 변환 함수 선언=========================================================================END---




//검색 기능=============================================================================================
document.querySelectorAll('.filter')[0].addEventListener('input', function () {
	// 검색 키워드 가져오기
	var keyword = document.querySelectorAll('.filter')[0].value;

	// 반복문 활용. 상품요소의 갯수만큼 반복. + 키워드가 있을경우 pass, 없을 경우 display none;
	var limit = document.querySelectorAll('.product-card').length;
	for (let i = 0; i < limit; i++) {
		//검색할 문자열 선언
		var text = document.querySelectorAll('.card-title')[i].innerText +
					document.querySelectorAll('.card-text')[i].innerText;
	
		//텍스트가 없거나 공백일 경우 제외함.
		if (text.includes(keyword) && !(keyword == '' || keyword.includes(' '))) {
			document.querySelectorAll('.product-card')[i].style.display = 'block';
			var text1 = document.querySelectorAll('.card-title')[i].innerHTML;
			var text2 = document.querySelectorAll('.card-text')[i].innerHTML;

			//색상 변경 로직 이미 변경된 경우 고려해, 초기화  먼저 진행 후, 변환 시도
			//변경로직이 replace를 사용할 경우
			//자꾸 깨지기 때문에 원하는 키워드를 찾아 재생성하는 방식으로 전환해야 할듯함.

			//우선 초기화를 시도함.
			text1 = coloring(`<span style="background : yellow">`, text1, '');
			text1 = coloring(`<span`, text1, '');
			text1 = coloring(`style="background : yellow">`, text1, '');
			text1 = coloring(`</span>`, text1, '');

			text2 = coloring(`<span style="background : yellow">`, text2, '');
			text2 = coloring(`style="background : yellow">`, text2, '');
			text2 = coloring(`style="background : yellow">`, text2, '');
			text2 = coloring(`</span>`, text2, '');
			document.querySelectorAll('.card-title')[i].innerHTML = text1;
			document.querySelectorAll('.card-text')[i].innerHTML = text2;

			//최종 변경
			text1 = coloring(keyword, text1, `<span style="background : yellow">${keyword}</span>`);
			text2 = coloring(keyword, text2, `<span style="background : yellow">${keyword}</span>`);

			document.querySelectorAll('.card-title')[i].innerHTML = text1;
			document.querySelectorAll('.card-text')[i].innerHTML = text2;

		} 
		//키워드가 입력되지 않은 경우 색상 제거 로직------------------------------------------------------
		else if (keyword == '') {
			var R = document.querySelectorAll('.product-card').length;

			for (let i = 0; i < R; i++) {
				document.querySelectorAll('.product-card')[i].style.display = 'block';
				var text1 = document.querySelectorAll('.card-title')[i].innerHTML;
				var text2 = document.querySelectorAll('.card-text')[i].innerHTML;

				text1 = coloring(`<span style="background : yellow">`, text1, '');
				text1 = coloring(`<span`, text1, '');
				text1 = coloring(`style="background : yellow">`, text1, '');
				text1 = coloring(`</span>`, text1, '');

				text2 = coloring(`<span style="background : yellow">`, text2, '');
				text2 = coloring(`style="background : yellow">`, text2, '');
				text2 = coloring(`style="background : yellow">`, text2, '');
				text2 = coloring(`</span>`, text2, '');
				document.querySelectorAll('.card-title')[i].innerHTML = text1;
				document.querySelectorAll('.card-text')[i].innerHTML = text2;
			}
			return;
		} 
		//검색어에 포함되지 않을 경우 display : none; 처리----------------------------------------
		else {
			document.querySelectorAll('.product-card')[i].style.display = 'none';
		}
	}
	//공백 정제는 되지 않았음. 색상 변경 로직과 검색어가 제거 되었을 경우를 고려해야함. 23-02-20 해결된 것으로 보임 
});
//검색 기능=============================================================================================END---




//구매하기 버튼 액션=================================================================================
document.querySelectorAll('.buy')[0].addEventListener('click', function () {
	document.querySelectorAll('.black-bg')[0].classList.add('show1');
});
document.querySelectorAll('.close')[0].addEventListener('click', function () {
	document.querySelectorAll('.black-bg')[0].classList.remove('show1');
});


//이름과 연락처 받아오기====================================================================================
var name;
var telephone;
document.querySelector('#name').addEventListener('input', function () {
	name = document.querySelector('#name').value;
});
document.querySelector('#telephone').addEventListener('input', function () {
	telephone = document.querySelector('#telephone').value;
});


//구매완료 버튼 누를시 나오는 영수증=====================================================================
document.querySelectorAll('.submit')[0].addEventListener('click', function () {
	document.querySelectorAll('.final')[0].classList.add('show2');
	var canvas = document.querySelectorAll('.canvas')[0];
	var c = canvas.getContext('2d');
	//var date = date();
	c.font = '35px';
	c.fillText('영수증', 30, 20);
	c.font = '23px';
	var px = 0;
	cart.forEach((a, i) => {
		//시작 위치
		px += 40;
	if (cart[i] > 0) {
			//내용물 생성
			c.fillText(`${productname[i]}`, 30, px);
			px += 25;
			c.fillText(`${brand[i]}`, 30, px);
			px += 25;
			c.fillText(`가격 : ${price[i]}`, 30, px);
			px += 25;
			c.fillText(`수량 : ${a}`, 30, px);
			px += 25;
			c.fillText(`합계 : ${a * price[i]}`, 30, px);
		} else {
			//넘어감.
		}
	});
	px += 30;
	c.font = '35px';
	c.fillText(`총 합계 : ${sum}`, 30, px);
});



// 영수증 닫기 버튼===========================================================================================
document.querySelector('#exit-final').addEventListener('click', function () {
	document.querySelectorAll('.final')[0].classList.remove('show2');
});