// NAVBAR

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarCloseBtns = document.querySelectorAll('#navbar-close')
const navbarLinks = document.querySelector('.links');
const body = document.body;

navbarToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('show');
  body.style.overflow = 'hidden';
});

navbarCloseBtns.forEach((navbarCloseBtn) => {
  navbarCloseBtn.addEventListener('click', () => {
    navbarLinks.classList.remove('show')
    body.style.overflow = 'auto'
  })
})

// LOGOUT TOGGLE
const profile = document.querySelector('.profile')
const logoutBtn = document.querySelector('.logout-button')

profile.addEventListener('click', (e) => {
  e.stopPropagation();
  logoutBtn.classList.toggle('show')
})

logoutBtn.addEventListener('click', () => {
  logoutBtn.classList.remove('show')
})

// MODAL
const modal = document.querySelector('.contact-modal')
const closeModal = document.querySelector('#close-modal')
const toggleModal = document.querySelectorAll('#toggle-modal')

toggleModal.forEach((toggleModal) => {
  toggleModal.addEventListener('click', () => {
    modal.classList.add('show')
    // body.style.overflow = 'hidden';
  })
})

closeModal.addEventListener('click', () => {
  modal.classList.remove('show')
  // body.style.overflow = 'auto'
})


// TIMER
const items = document.querySelectorAll('.deadline-format h3');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

let futureDate = new Date(2025, 2, 26, 10, 30, 0)

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// future time in ms
const futureTime = futureDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      item = `0${item}`
    }
    return item
  }

  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  });
}

let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()