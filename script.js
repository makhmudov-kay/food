/* const users = {
    name: "Вася",
    surname: "Васильев",
    get fullName() {
        return `${this.name} ${this.surname}`
    },
    set fullName(value) {
        let arr = value.split(" ");
        this.name = arr[0];
        this.surname = arr[1];
    }
}
console.log(users.fullName);
users.fullName = "Петя Петров"
console.log(users); */


// создаём объект с продукцией
const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}

// -------создаём объект ингредиентов
const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    }
}


// --------подключаемся к кнопкам + и -
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
// console.log(btnPlusOrMinus);
//перебираем кнопки и навешиваем событию функцию
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    // элемент.closest() - возвращает одного родителя по указанному селектору
    const parent = element.closest(".main__product") // подключаемся к секции
    // элемент.hasAttribute("name") - возвращает true если атрибут есть
    // элемент.setAttribute("name","value") - добавляет атрибут со значением
    // элемент.removeAttribute("name") - удаляет атрибут со значением
    // элемент.getAttribute("name") - возвращает значение атрибута
    const parentId = parent.getAttribute("id"); // получим значение атрибута id
    const elementData = element.getAttribute("data-symbol") // получаем знак кнопки + или -

    if (elementData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    const out = parent.querySelector(".main__product-num");
    const price = parent.querySelector(".main__product-price span");
    const kcall = parent.querySelector(".main__product-kcall span");
    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

// анимированное лого
const number = document.querySelector('.header__timer-extra');

function numLogo(){
    number.innerHTML++
    if (number.innerHTML < 51) {
        setTimeout(() => {numLogo()}, 100);
    } else if (number.innerHTML < 61) {
        setTimeout(() => {numLogo()}, 150);
    } else if (number.innerHTML < 71) {
        setTimeout(() => {numLogo()}, 190);
    } else if (number.innerHTML < 81) {
        setTimeout(() => {numLogo()}, 210);
    } else if (number.innerHTML < 91) {
        setTimeout(() => {numLogo()}, 250);
    } else if (number.innerHTML < 100) {
        setTimeout(() => {numLogo()}, 300);
    }
}  
numLogo()

// --------- подключаемся к чекбоксам ингридиентов
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
// перебираем массив чекбоксов
for (let i = 0; i < checkExtraProduct.length; i++) {
    // для каждого чекбокса создаём событие
    checkExtraProduct[i].addEventListener("click", function () {
        addExtraProduct(this)
    })
}
// функция работы чекбокса
function addExtraProduct(element) {
    const parent = element.closest(".main__product"); // подключаемся к секции
    const parentId = parent.getAttribute("id"); // получим значение атрибута id
    const elAtr = element.getAttribute("data-extra");
    product[parentId][elAtr] = element.checked
    // console.dir(element);
    if (product[parentId][elAtr] === true) {
        product[parentId].price += extraProduct[elAtr].price
        product[parentId].kcall += extraProduct[elAtr].kcall
    } else {
        product[parentId].price -= extraProduct[elAtr].price
        product[parentId].kcall -= extraProduct[elAtr].kcall
    }

    const price = parent.querySelector(".main__product-price span");
    const kcall = parent.querySelector(".main__product-kcall span");
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

//--- вывод общей стоимости товаров
// подключение к кнопке "Заказать"
const addCart = document.querySelector('.addCart');
// подключение к модальному окну
const receipt =document.querySelector('.receipt');
// подключение к чеку
const receiptWindow = document.querySelector('.receipt__window');
// подключение к описанию чека
const receiptOut = document.querySelector('.receipt__window-out');
// подключение к кнопке чека
const receiptBtn = document.querySelector('.receipt__window-btn');
// вывод общей стоимости
let totalName ="";
let totalPrice = 0;
let totalKcall = 0;
let arrayProduct = [];

/* // ссылка на объект
let a = {name: "Вася"};
let b = a;
console.log(a);
console.log(b);
b.name = "Петя"
console.log(a);
console.log(b); */

addCart.addEventListener("click", function () {
    for (const key in product) {
        // po - один объект продукта
        const po = product[key]
        // проверяем количество выбранного продукта
        if (po.amount > 0) {
            // в массив добавляем выбранный продукт
            arrayProduct.push(po)
            for (const infoKey in po) {
                if (po[infoKey] === true) {
                    // \n - перенос на следующую строку
                    // добавляем название ингредиента
                    po.name += "\n" + extraProduct[infoKey].name
                }
            }
        }
        po.price = po.Summ
        po.kcall = po.Kcall
    }

    // перебераем выбранные товары
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += `\n ${el.name} \n`
    }

    receiptOut.innerHTML = `Вы купили: \n${totalName} \nКаллорийность: ${totalKcall} \nСтоимость покупки: ${totalPrice} сум`
    receipt.style.display = "flex"
    setTimeout(() => {
        receipt.style.opacity = 1;
        receiptWindow.style.top = 0;
    }, 100);
    document.body.style.overflow = "hidden"
    console.dir(document);
})

// Увеличение картинки при двойном нажатии на неё

const cardImg = document.querySelectorAll('.main__product-info');
const fullScreenImg = document.querySelector('.view');
const closeImg = document.querySelector('.view__close');

for (let i = 0; i < cardImg.length; i++) {
    cardImg[i].addEventListener("dblclick", function () {
        getImg(this)
    })
}

function getImg(img) {
    fullScreenImg.classList.add("active");
    const productImg = img.querySelector(".main__product-img");
    const parentSrc = productImg.getAttribute("src");
    const viewImg = fullScreenImg.querySelector("img");
    viewImg.setAttribute("src", parentSrc)
}

closeImg.addEventListener("click", function () {
    fullScreenImg.classList.remove("active")
})

