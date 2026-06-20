const IconMenu = document.getElementById('iconMenu')
const CntMenu = document.getElementById('cntMenu')

const OptionsMenu = document.querySelectorAll('.optionMenu');

const sections = document.querySelectorAll('.fade-up')

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible')
  });
}, { threshold: 0.3 })

sections.forEach(sec => observer.observe(sec))

IconMenu.addEventListener('click', () => {
  IconMenu.classList.add('hiddenIcon')
  IconMenu.classList.remove('visibleIcon')
  
  CntMenu.classList.add('visibleMenu')
  CntMenu.classList.remove('hiddenMenu')
})

OptionsMenu

OptionsMenu.forEach(function (opcion) {
  opcion.addEventListener('click', function (event) {

    IconMenu.classList.remove('hiddenIcon')
    IconMenu.classList.add('visibleIcon')
    
    CntMenu.classList.remove('visibleMenu')
    CntMenu.classList.add('hiddenMenu')

  });


});
