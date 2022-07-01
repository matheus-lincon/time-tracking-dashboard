/* GET JSON DATA */

async function getDashBoardData() {
  return await fetch('./data.json').then((res) => res.json())
}
let dashboardData = getDashBoardData()

/* EVENT LISTENERS */

let reports = document.querySelectorAll('.report')
let reportStatus = 'weekly' // standart status

window.onload = () => {
  updateDashBoard(reportStatus)
}

reports.forEach((report) => {
  report.addEventListener('click', () => {
    if (report.classList.contains('active')) return

    for (let i = 0; i < reports.length; i++) {
      reports[i].classList.remove('active')
    }

    report.classList.toggle('active')
    reportStatus = report.innerText.toLowerCase()

    updateDashBoard(reportStatus)
  })
})

function updateDashBoard(status) {
  let cardHours = document.querySelectorAll('.card .hours')
  let cardLastWeek = document.querySelectorAll('.card .last-week-hours')

  dashboardData.then((data) => {
    data.forEach((e, index) => {
      if (status === 'daily') {
        cardHours[index].innerText = `${e.timeframes.daily.current}hrs`
        cardLastWeek[index].innerText = `${e.timeframes.daily.current}hrs`
      } else if (status === 'weekly') {
        cardHours[index].innerText = `${e.timeframes.weekly.current}hrs`
        cardLastWeek[index].innerText = `${e.timeframes.weekly.current}hrs`
      } else {
        cardHours[index].innerText = `${e.timeframes.monthly.current}hrs`
        cardLastWeek[index].innerText = `${e.timeframes.monthly.current}hrs`
      }
    })
  })
}
