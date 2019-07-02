let fn = ()=> {

let date = new Date();


let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear()

console.log(month)

Date.prototype.daysInMonth = function () {
  return new Date(year, month, 0).getDate();
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
}


function calendarCreate () {
  let date = new Date();
  let calendar = {}

  calendar.monthName = [
    'Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  calendar.day = date.getDate();
  calendar.month = date.getMonth();
  calendar.year = date.getFullYear();

  calendar.drawCalendar = function(year, month, days) {
    let calendarBox = document.querySelector('.calendar__body');
    let title = document.querySelector('.calendar__date');
    title.innerHTML = `${calendar.monthName[month]} ${year}`;
    let lastDay = new Date(year, month, 0).getDate();
    let dayStart = new Date(year, month, 1).getDay()
    
    for(let i = 0; i < lastDay; i++) {
      let div = document.createElement('div')
      calendarBox.appendChild(div);
    }


   
   




  }

  calendar.drawCalendar(calendar.year, calendar.month, calendar.day )
}

calendarCreate()