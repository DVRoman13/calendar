
let add = (a,b)=> a+b

console.log(add(3,212))

let date = new Date();


let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear()

console.log(month)

Date.prototype.daysInMonth = function () {
  return new Date(year, month+1, 0).getDate();
}

console.log(date.daysInMonth(year, month ,0))


var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  weekday: 'long',
};

date.toLocaleString('ru', options)

console.log(date.toLocaleString('ru', options))


let t = new Date(2020, 2, 0);
let dayStart = new Date(year, month, 1).getDay()
console.log(dayStart)