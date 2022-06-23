const body = document.body
const theme = document.getElementById('theme')
const input = document.getElementById('input__words')
const buttonAdd = document.getElementById('button__add')
const ol = document.getElementById('ol')
let liChild = document.querySelectorAll('#ol li')
const words = []

function addWord () {
  liChild = document.querySelectorAll('#ol li')
  liChild.forEach(function (node) {
    ol.removeChild(node)
  })
  const word = input.value
  words.push(word)
  words.sort()
  words.forEach(function (word) {
    let li = document.createElement('li')
    li.innerHTML = word
    ol.appendChild(li)
  })
  input.value = ''
}

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

// Modo oscuro

theme.addEventListener('click', e => {
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
