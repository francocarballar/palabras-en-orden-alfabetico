const body = document.body
const header = document.querySelector('.header')
const main = document.querySelector('.main')
const footer = document.querySelector('.footer')
const toggleDarkMode = document.querySelector('.toggle-dark-mode')
const input = document.getElementById('input__words')
const buttonAdd = document.getElementById('button__add')
const buttonRemove = document.querySelector('.section__remove-words button')
const abcWords = document.querySelector('.section__abc-words')
const ol = document.getElementById('ol')
let liChild = document.querySelectorAll('#ol li')
const words = []

let headerHeight = header.offsetHeight
let footerHeight = footer.offsetHeight
main.style.height = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
window.onresize = () => {
  headerHeight = header.offsetHeight
  footerHeight = footer.offsetHeight
  main.style.height = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`
}

const savedWords = localStorage.getItem('words')
let myWords = JSON.parse(savedWords)

function addWord () {
  if (input.value !== '') {
    liChild = document.querySelectorAll('#ol li')
    liChild.forEach(node => {
      ol.removeChild(node)
    })
    const word = input.value.toLowerCase()
    if (myWords !== null) {
      myWords.push(word)
      myWords.sort()
    } else {
      words.push(word)
      words.sort()
      myWords = words
    }
    localStorage.setItem('words', JSON.stringify(myWords))
    myWords.map(word => {
      let li = document.createElement('li')
      li.innerHTML = word
      ol.appendChild(li)
    })
    input.value = ''
  }
}

window.addEventListener('storage', addWord)

document.onkeyup = function (event) {
  let tecla = event.keyCode
  if (tecla === 13) {
    addWord()
  }
  if (tecla === 32) {
    input.disabled = true
  } else {
    input.disabled = false
  }
}

if (myWords !== null) {
  myWords.map(word => {
    let li = document.createElement('li')
    li.innerHTML = word
    ol.appendChild(li)
  })
}

const abcWordsHeight = abcWords.offsetHeight
let olHeight = ol.offsetHeight
if (olHeight > abcWordsHeight) {
  abcWords.style.overflowY = 'scroll'
}
if (olHeight > 0) {
  buttonRemove.style.display = 'flex'
}
input.onchange = () => {
  olHeight = ol.offsetHeight
  if (olHeight > abcWordsHeight) {
    abcWords.style.overflowY = 'scroll'
  }
  if (olHeight > 0) {
    buttonRemove.style.display = 'flex'
  }
}

// Eliminar todas las palabras

buttonRemove.onclick = () => {
  liChild = document.querySelectorAll('#ol li')
  liChild.forEach(node => {
    ol.removeChild(node)
  })
  localStorage.removeItem('words')
  buttonRemove.style.display = 'none'
}

// Modo oscuro

if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  body.classList.add('dark')
} else {
  body.classList.remove('dark')
}

toggleDarkMode.addEventListener('click', e => {
  body.classList.toggle('dark')
  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'true')
  } else if (!body.classList.contains('dark')) {
    localStorage.setItem('theme', 'false')
  }
})
if (localStorage.getItem('theme') === 'true') {
  body.classList.add('dark')
} else if (localStorage.getItem('theme') === 'false') {
  body.classList.remove('dark')
}
