//상품목록 불러오기 ---------------------------------------------------------------
// 테스트용 버튼은 주석 처리함.
//document.querySelectorAll(".run")[0].addEventListener("click",function(){
var products;
var cards;
var sum;

// 카트 제품목록, 가격 합계 계산용 가격 및 수량, 영수증용 제품명 변수 선언
var cart = []; //수량
var amount = []; //금액
var value = []; //선택자 생성용
var productname = []; //상품명
var brand = []; //상호
var price = []; // 제품 가격
document.querySelectorAll('.cards')[0].innerHTML = '';

fetch('store.json')
	.then((res) => res.json())
	.then(function (data) {
		products = data.products;

		//상품 요소 동적 생성 ==============================================================================
		products.forEach((a, i) => {
			var templet = `<div class="card" id = "card${i}"draggable = "true" >
					<img src="${products[i].photo}" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title">${products[i].title}</h5>
						<p class="card-text">${products[i].brand}</p>
						<p class="card-price">${products[i].price}</p>
						<a href="#" class="btn btn-primary putin">담기</a>
					</div>
				</div>`;
			document.querySelectorAll('.cards')[0].insertAdjacentHTML('beforeend', templet);
			cart[i] = 0;
			amount[i] = 0;
			//드래그 & 드롭 이벤트 바인딩.
			// 동적 요소 생성시 이벤트 바인딩을 생성과 함께 해주어야 해서 추가함.
			//fetch한 데이터를 외부에서 정제해서 쓸 방법만 있었어도 좀더 최적화가 되었을텐데..
			document.querySelectorAll('.card')[i].addEventListener('dragstart', function (e) {
				e.dataTransfer.setData('text', i);
			});
			
			//담기 버튼 이벤트 생성 드래그앤 드롭과 동일 
			document.querySelectorAll('.putin')[i].addEventListener('click', function (e) {
							cart[i] += 1; //수량체크
			//장바구니용 카드 만들기
			var templet2 = `<div class="card" id = "card${i}"draggable = "false" >
					<img src="${products[i].photo}" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title">${products[i].title}</h5>
						<p class="card-text">${products[i].brand}</p>
						<p class="card-price">${products[i].price}</p>
						<input class = "cardEa" id = "carTd${i}"value ="${cart[i]}"></input>
					</div>
				</div>`;

			if (cart[i] <= 1) {
				document.querySelectorAll('.cart')[0].insertAdjacentHTML('beforeend', templet2);
				value[i] = document.querySelector(`#carTd${i}`); //쿼리 셀렉터 미리 선언
				amount[i] = cart[i] * products[i].price;
				productname[i] = products[i].title;
				brand[i] = products[i].brand;
				price[i] = products[i].price;
				//합계 불러오기

				sum = amount.reduce(function add(sum, currValue) {
					return sum + currValue;
				}, 0);
				document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;

				value[i].addEventListener('input', function () {
					//합계 불러오기
					sum = amount.reduce(function add(sum, currValue) {
						return sum + currValue;
					}, 0);
					document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;
					cart[i] = Number(value[i].value);
					amount[i] = cart[i] * products[i].price;
					productname[i] = products[i].title;
					brand[i] = products[i].brand;
					price[i] = products[i].price;
				}); //이벤트 리스너 미리 선언
			} else {
				value[i].value = cart[i];
				amount[i] = cart[i] * products[i].price;
				productname[i] = products[i].title;
				brand[i] = products[i].brand;
				price[i] = products[i].price;
				//합계 불러오기

				sum = amount.reduce(function add(sum, currValue) {
					return sum + currValue;
				}, 0);
				document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;
			}//else 끝 
			});
			
			
		});

	
	
	
		//드래그 앤 드롭 이벤트 ========================================================================
		document.querySelectorAll('.cart')[0].addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		document.querySelectorAll('.cart')[0].addEventListener('drop', function (e) {
			e.preventDefault();

			// 드래그한 이미지 생성

			var i = e.dataTransfer.getData('text');

			cart[i] += 1; //수량체크
			//장바구니용 카드 만들기
			var templet2 = `<div class="card" id = "card${i}"draggable = "false" >
					<img src="${products[i].photo}" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title">${products[i].title}</h5>
						<p class="card-text">${products[i].brand}</p>
						<p class="card-price">${products[i].price}</p>
						<input class = "cardEa" id = "carTd${i}"value ="${cart[i]}"></input>
					</div>
				</div>`;

			if (cart[i] <= 1) {
				document.querySelectorAll('.cart')[0].insertAdjacentHTML('beforeend', templet2);
				value[i] = document.querySelector(`#carTd${i}`); //쿼리 셀렉터 미리 선언
				amount[i] = cart[i] * products[i].price;
				productname[i] = products[i].title;
				brand[i] = products[i].brand;
				price[i] = products[i].price;
				//합계 불러오기

				sum = amount.reduce(function add(sum, currValue) {
					return sum + currValue;
				}, 0);
				document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;

				value[i].addEventListener('input', function () {
					//합계 불러오기
					sum = amount.reduce(function add(sum, currValue) {
						return sum + currValue;
					}, 0);
					document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;
					cart[i] = Number(value[i].value);
					amount[i] = cart[i] * products[i].price;
					productname[i] = products[i].title;
					brand[i] = products[i].brand;
					price[i] = products[i].price;
				}); //이벤트 리스너 미리 선언
			} else {
				value[i].value = cart[i];
				amount[i] = cart[i] * products[i].price;
				productname[i] = products[i].title;
				brand[i] = products[i].brand;
				price[i] = products[i].price;
				//합계 불러오기

				sum = amount.reduce(function add(sum, currValue) {
					return sum + currValue;
				}, 0);
				document.querySelectorAll('.sum')[0].innerHTML = `합계 ${sum}`;
			}//else 끝 
			
		});
	});

//	});

//-------------------------------------------------------------------------------

/*

document.querySelectorAll('.filter')[0].addEventListener('input', function () {
    document.querySelectorAll('.cards')[0].innerHTML = '';
    var keyword = document.querySelectorAll('.filter')[0].value;
    fetch('store.json')
        .then((res) => res.json())
        .then(function (data) {
            products = data.products;
            products.forEach((a, i) => {
                if (products[i].title.includes(keyword) || products[i].brand.includes(keyword) )
                    var templet = `<div class="card">
                        <img src="${products[i].photo}" class="card-img-top " alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">${products[i].title}</h5>
                            <p class="card-text">${products[i].brand}</p>
                            <p class="card-price">${products[i].price}</p>
                            <a href="#" class="btn btn-primary">담기</a>
                        </div>
                    </div>`;

                document.querySelectorAll('.cards')[0].insertAdjacentHTML('beforeend', templet);
            });
        });
});

*/

// 텍스트 색상 변환 함수 선언
function coloring(word, text, re_text) {
	let regexAllCase = new RegExp(word, 'gi');
	text = text.replace(regexAllCase, `${re_text}`);
	return text;
}

//검색 기능-------------------------------------------------------------------------------

// 단순 검색의 경우 HTML 조작을 통해 가능하나 색상 변경의 경우 잔 버그가 많아 일단 보류함.
document.querySelectorAll('.filter')[0].addEventListener('input', function () {
	// 검색 키워드 가져오기
	var keyword = document.querySelectorAll('.filter')[0].value;

	// 반복문 활용. 상품요소의 갯수만큼 반복. + 키워드가 있을경우 pass, 없을 경우 display none;
	var limit = document.querySelectorAll('.card').length;
	for (var i = 0; i < limit; i++) {
		var text =
			document.querySelectorAll('.card-title')[i].innerText +
			document.querySelectorAll('.card-text')[i].innerText;
		//console.log(text);

		//텍스트가 없거나 공백일 경우 제외함.
		if (text.includes(keyword) && !(keyword == '' || keyword.includes(' '))) {
			document.querySelectorAll('.card')[i].style.display = 'block';
			var text1 = document.querySelectorAll('.card-title')[i].innerHTML;
			var text2 = document.querySelectorAll('.card-text')[i].innerHTML;

			//색상 변경 로직 이미 변경된 경우 고려해, 초기화  먼저 진행 후, 변환 시도 =
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

			console.log(text1);
			console.log(text2);

			//document.querySelectorAll('.card-title')[i].innerHTML = text1;
			//document.querySelectorAll('.card-text')[i].innerHTML = text2;
		} else if (keyword == '') {
			var R = document.querySelectorAll('.card').length;

			for (var i = 0; i < R; i++) {
				document.querySelectorAll('.card')[i].style.display = 'block';
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
		} else {
			document.querySelectorAll('.card')[i].style.display = 'none';
		}
	}
	//공백 정제는 되지 않았음. 색상 변경 로직과 검색어가 제거 되었을 경우를 고려해야함.
});

//구매하기 버튼 액션
document.querySelectorAll('.buy')[0].addEventListener('click', function () {
	document.querySelectorAll('.black-bg')[0].classList.add('show1');
});
document.querySelectorAll('.close')[0].addEventListener('click', function () {
	document.querySelectorAll('.black-bg')[0].classList.remove('show1');
});

//이름과 연락처 받아오기
var name;
var telephone;
document.querySelector('#name').addEventListener('input', function () {
	name = document.querySelector('#name').value;
});
document.querySelector('#telephone').addEventListener('input', function () {
	telephone = document.querySelector('#telephone').value;
});

//구매완료 버튼 누를시 나오는 영수증
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

document.querySelector('#exit-final').addEventListener('click', function () {
	document.querySelectorAll('.final')[0].classList.remove('show2');
});