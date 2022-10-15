const toggle = document.querySelector('.navbar--toggle');
const navRight = document.querySelector('.navbar--ul--right');
toggle.addEventListener('click', () => {
   
  navRight.classList.toggle('toggleNav');
})