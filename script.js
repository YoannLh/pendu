import dico from './dico.js'

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '-',
  "'",
  ' ',
]

const containerWord = document.getElementById('word')
const count = document.getElementById('count')
const reset = document.getElementById('reset')

const indexAleatoire = Math.floor(Math.random() * dico.length)
let word = dico[indexAleatoire]

let splittedWord = word.split('')
let displayedSplittedWord = []

let totalOfTurns = word.length + 5

init()

function init() {
  for (const letter of splittedWord) {
    displayedSplittedWord.push(' _ ')
  }
  count.textContent = `Il vous reste ${totalOfTurns} tentatives.`
  displayLetters()
  displayAllAlphabeticLetters()
  resetAll()
}

function displayLetters() {
  for (const char of displayedSplittedWord) {
    let newDiv = document.createElement('p')
    newDiv.textContent = char
    containerWord.appendChild(newDiv)
  }
}

function displayAllAlphabeticLetters() {
  for (const letter of alphabet) {
    let newDiv = document.createElement('div')
    newDiv.textContent = letter
    newDiv.addEventListener('click', () => {
      newDiv.style.color = 'red'
      newDiv.style.borderColor = 'red'
      clickAndfindLetterInWord(letter)
    })
    document.getElementById('letters').appendChild(newDiv)
  }
}

function clickAndfindLetterInWord(letter) {
  for (const char of splittedWord) {
    if (char === letter) {
      displayFoundLetters(letter)
    }
  }
  countTurns()
}

function displayFoundLetters(letter) {
  containerWord.innerHTML = ''
  let i = splittedWord.indexOf(letter)
  displayedSplittedWord[i] = letter
  splittedWord[i] = '+'
  displayLetters()
  checkIfWordIsFound()
}

function countTurns() {
  totalOfTurns--
  if (totalOfTurns < 0) return
  if (totalOfTurns === 0) {
    displayNotFoundLettersIfTurnIsOver()
    count.style.color = 'red'
  }
  count.textContent = `Il vous reste ${totalOfTurns} ${
    totalOfTurns === 1 ? 'tentative' : 'tentatives'
  }.`
}

function checkIfWordIsFound() {
  if (!displayedSplittedWord.includes(' _ ')) {
    containerWord.style.color = 'green'
    count.textContent = ''
  }
}

function displayNotFoundLettersIfTurnIsOver() {
  if (totalOfTurns === 0) {
    containerWord.innerHTML = ''
    for (const char of word) {
      let newDiv = document.createElement('p')
      newDiv.textContent = char
      if (!displayedSplittedWord.includes(char)) {
        newDiv.style.color = 'red'
      }
      containerWord.appendChild(newDiv)
    }
  }
}

function resetAll() {
  reset.addEventListener('click', () => {
    location.reload()
  })
}
