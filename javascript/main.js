/* EVENT LISTENERS */

let reports = document.querySelectorAll('.report')
let reportStatus = 'weekly' // standart status

reports.forEach((report) => {
  report.addEventListener('click', () => {
    if (report.classList.contains('active')) return

    for (let i = 0; i < reports.length; i++) {
      reports[i].classList.remove('active')
    }

    report.classList.toggle('active')
    reportStatus = report.innerText.toLowerCase()

    fillDashBoard(reportStatus)
  })
})

/* --- */

function fillDashBoard(status) {
  fetch('../data.json')
    .then((response) => {
      return response.json()
    })
    .then((jasondata) => {
      let cardHours = document.querySelectorAll('.card .hours')
      let cardLastWeek = document.querySelectorAll('.card .last-week-hours')

      jasondata.forEach((e, index) => {
        if (status == 'daily') {
          cardHours[index].innerText = `${e.timeframes.daily.current}hrs`
          cardLastWeek[index].innerText = `${e.timeframes.daily.previous}hrs`
        } else if (status == 'weekly') {
          cardHours[index].innerText = `${e.timeframes.weekly.current}hrs`
          cardLastWeek[index].innerText = `${e.timeframes.weekly.previous}hrs`
        } else {
          cardHours[index].innerText = `${e.timeframes.monthly.current}hrs`
          cardLastWeek[index].innerText = `${e.timeframes.monthly.previous}hrs`
        }
      })
    })
}

fillDashBoard(reportStatus)
