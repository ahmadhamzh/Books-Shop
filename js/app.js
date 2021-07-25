'use strict'
let gloArr = [];

function Book(name, price) {
    this.bookName = name;
    this.bookPrice = parseInt(price);
    this.bookPages = this.random();
    gloArr.push(this)

}

Book.prototype.random = function () {
    return Math.floor(Math.random() * (500 - 1 + 1)) + 1;
}

let bookNameInbut = document.getElementById('name');
let bookPriceInbut = document.getElementById('price');
let form = document.getElementById('form');
let table = document.getElementById('table');
form.addEventListener('submit',handelSubmit);
let totalPrice = document.getElementById('total')

function handelSubmit(event) {
    event.preventDefault();
    new Book(bookNameInbut.value,bookPriceInbut.value);
    form.reset();
    table.textContent = '';
    renderHead();
    Book.prototype.render();
    total()
    localStorage.setItem('book',JSON.stringify(gloArr));
    console.log(gloArr);
    
}
console.log(gloArr);

function renderHead() {
    let headRaw = document.createElement('tr');
    table.appendChild(headRaw);
    let bookNameHead = document.createElement('th');
    headRaw.appendChild(bookNameHead);
    bookNameHead.textContent = 'Book Name';
    let bookPagesHead = document.createElement('th');
    headRaw.appendChild(bookPagesHead);
    bookPagesHead.textContent = 'Book Pages';
    let bookPriceHead = document.createElement('th');
    headRaw.appendChild(bookPriceHead);
    bookPriceHead.textContent = 'Price';

    
}
renderHead();

Book.prototype.render = function () {
    for (let i = 0; i < gloArr.length; i++) {
    
        let newRaw = document.createElement('tr');
        table.appendChild(newRaw);
        let newBookName = document.createElement('td');
        newRaw.appendChild(newBookName);
        newBookName.textContent = gloArr[i].bookName
        let newBookPages = document.createElement('td');
        newRaw.appendChild(newBookPages);
        newBookPages.textContent = gloArr[i].bookPages;
        let newBookPrice = document.createElement('td');
        newRaw.appendChild(newBookPrice);
        newBookPrice.textContent = gloArr[i].bookPrice;       
        
        
    }
    
}

function getFromLs() {
    let data = localStorage.getItem('book')
    let parseData = JSON.parse(data);
    if (parseData) {
        for (let i = 0; i < parseData.length; i++) {
            gloArr.push(parseData[i]);
            
        }
        
    }
    
}

function total() {
    let priceSum = 0;
    for (let i = 0; i < gloArr.length; i++) {
        priceSum += gloArr[i].bookPrice
        
    }
    console.log(priceSum);

    totalPrice.textContent = 'Total : '+priceSum
}

getFromLs();
Book.prototype.render();
total()
