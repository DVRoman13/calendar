function calendarCreate() {
  let date = new Date;
  let calendar = {}
  let calendarBox = document.querySelector('.calendar__body');
  let title = document.querySelector('.calendar__date');

  calendar.year = date.getFullYear();
  calendar.month = date.getMonth();
  calendar.day = date.getDay()

  calendar.monthName = [
    'Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];



  calendar.quickAdd = function() {
    let btnAdd = document.querySelector('#quick-add')

    btnAdd.addEventListener('click', function(){
      let data = document.querySelector('#data-input').value;
      data = data.split(' ');
      let newArr = []
      if(data[0] > 0 && data[0] <=31 && data[1] > 0 && data[1] <=12 && data[2].length == 4 ) {
      
        newArr.push(data[0])
        newArr.push(data[1])
        newArr.push(data[2])
        console.log(newArr)
      } else {
        alert("Введите дату в формате - 8 8 2018")
        return
      }

      $.magnificPopup.open({
        items: {
          src: '.msgBox'
        },
        callbacks: {
          beforeOpen: function() {
        let dayWr = document.getElementById('msgDate');
        dayWr.setAttribute('year', data[2]);
        dayWr.setAttribute('month', data[1]-1);
        dayWr.setAttribute('day', data[0]);
          },
          beforeClose: function() {
            window.location.reload()
          }
        }
      })
    })
    

  }

  calendar.quickAdd()


  calendar.getDataFromStorege = function (localStorage, year, month, days) {
    function noteDays() {
      let obj = []
      for (let key in localStorage) {
        if (key.includes('GMT')) {
          let saveNotes = JSON.parse(localStorage[key]);
          obj.push(saveNotes)
        }
      }
      return obj
    }

    let saveDate = noteDays()
    for (let i = 0; i < saveDate.length; i++) {
      let j = new Date(saveDate[i].date)
      if (j.getMonth() == month && j.getFullYear() == year) {
        let a = j.getDate()
        for (let i = 0; i < 3; i++) {
          let p = document.createElement('p');
          p.classList.add(`msg${i+1}`)
          days[a - 1].appendChild(p)
        }
        days[a - 1].children[1].innerText = saveDate[i].msg.titleMsg
        days[a - 1].children[2].innerText = saveDate[i].msg.people
        days[a - 1].children[3].innerText = saveDate[i].msg.textMass
        days[a - 1].classList.add('picked');
      }}
  }

  calendar.addNote = function () {
    let days = calendarBox.getElementsByTagName("div");
    let cancel = document.getElementById('cancelMsg');
    let addMsg = document.getElementById('addMsg');
    let titleMsg = document.getElementById('msgTitle');
    let people = document.getElementById('msgPeople');
    let textMass = document.getElementById('msgText');
   
    
    for (let i = 0; i < days.length; i++) {
      days[i].addEventListener('click', function () {
        if (this.classList.contains('empty') || this.children.length < 1) return
        let dayWr = document.getElementById('msgDate');
        let noteday = new Date(title.getAttribute('data-year'), title.getAttribute("data-month"), this.getAttribute("day"));
        dayWr.setAttribute('year', noteday.getFullYear());
        dayWr.setAttribute('month', noteday.getMonth());
        dayWr.setAttribute('day', this.getAttribute("day"));
        let inputs = []
        inputs.push(titleMsg);
        inputs.push(people);
        inputs.push(textMass);
        
        
        let arr = []
        if(this.children.length > 1) {
          arr.push(this.getElementsByClassName('msg1')[0].innerText);
          arr.push(this.getElementsByClassName('msg2')[0].innerText);
          arr.push(this.getElementsByClassName('msg3')[0].innerText);
        }
        
        for(let i = 0; i < inputs.length; i++) {
          if(arr[i] == undefined) {
            inputs[i].value = ''
            console.log('1')
          } else {
            inputs[i].value = arr[i]
            console.log('2')
          }
         
        }
        $.magnificPopup.open({
          items: {
            src: '.msgBox'
          },
          callbacks: {
            beforeClose: function () {
              for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = ''
              }
            },
          }
        });
      });
    }
        cancel.addEventListener('click', function () {
          $.magnificPopup.close()
          massege = null
        })

        addMsg.addEventListener('click', function (e) {
          let dayWr = document.getElementById('msgDate');
          let noteday = new Date(dayWr.getAttribute('year'), dayWr.getAttribute("month"), dayWr.getAttribute("day"))
          let titleMsg = document.getElementById('msgTitle');
          let people = document.getElementById('msgPeople');
          let textMass = document.getElementById('msgText');
        
          if (titleMsg.value == null || titleMsg.value.length == 0) {
            titleMsg.nextElementSibling.classList.add('show')
            setTimeout(() => {
              titleMsg.nextElementSibling.classList.remove('show')
            }, 1000)
          } else {
            let massege = {}
            massege.titleMsg = titleMsg.value
            massege.people = people.value
            massege.textMass = textMass.value
            data = {
              date: noteday,
              msg: massege,
            }
           localStorage.setItem(noteday, JSON.stringify(data))
           calendar.getDataFromStorege(localStorage, dayWr.getAttribute('year'), dayWr.getAttribute("month"), calendarBox.getElementsByClassName('days'))
          $.magnificPopup.close()
          }
        })
  }

  calendar.drawCalendar = function (calendarBox, year, month) {
    let days = document.createDocumentFragment();

    title.setAttribute('data-month', month);
    title.setAttribute('data-year', year);
    title.innerHTML = `${calendar.monthName[month]} ${year}`;
    let d = new Date(year, month)

    for (let i = 0; i < getDay(d); i++) {
      days.appendChild(document.createElement('div'))
    }

    while (d.getMonth() == month) {
      let div = document.createElement('div');
      div.innerHTML = `<span>${d.getDate()}</span>`
      div.setAttribute('day', d.getDate())
      div.classList.add('days');
      days.appendChild(div)
      d.setDate(d.getDate() + 1);
    }

    if (getDay(d) != 0) {
      for (var i = getDay(d); i < 7; i++) {
        let div = document.createElement('div');
        div.classList.add('empty')
        days.appendChild(div)
      }
    }

    function getDay(date) {
      let day = date.getDay();
      if (day == 0) {
        day = 7;
      }
      return day - 1;
    }

    calendarBox.appendChild(days)
    if (calendar.month + 1 == d.getMonth()) {
      let today = calendar.day
      console.log(today - 1)
      calendarBox.children[today - 1].classList.add('bg')
    }
    calendar.getDataFromStorege(localStorage, year, month, calendarBox.getElementsByClassName('days'))
  
  }
  calendar.drawCalendar(calendarBox, calendar.year, calendar.month)
  calendar.addNote()


  prev.onclick = () => {
    calendarBox.innerHTML = ''
    let month = title.getAttribute('data-month');
    month--
    let year = title.getAttribute('data-year');
    if (month == -1) {
      year--
      month = 11
    }
    calendar.drawCalendar(calendarBox, year, month);
    calendar.addNote()
  }

  next.onclick = () => {
    calendarBox.innerHTML = ''
    let month = title.getAttribute('data-month');
    month++
    let year = title.getAttribute('data-year');
    if (month == 12) {
      year++
      month = 0
    }
    calendar.drawCalendar(calendarBox, year, month);
    calendar.addNote()
    // localStorage.clear()
  }
}
calendarCreate()