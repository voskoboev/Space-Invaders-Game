
const field: HTMLElement = document.querySelector('.field')

for (let i = 0; i < 225; i++) {
  const elemSection: HTMLElement = document.createElement('div')
  elemSection.classList.add('section')

  field.appendChild(elemSection)
  elemSection.textContent = `${i}`
}

const sections: NodeListOf<Element> = document.querySelectorAll('.section')
const sectionsArr: Element[] = Array.from(sections)

console.log(typeof sectionsArr[1]);


const invaders: number[] = []

for (let i = 0; i <= 39; i++) {
  if (i <= 9 || (i >= 15 && i <= 24) || i >= 30) {
    invaders.push(i)
  }
}

console.log(invaders);

invaders.forEach(i => {
  sectionsArr[i].classList.add('invader')
})

// for (let i = 0; i < invaders.length; i++) {
//   sectionsArr[invaders[i]].classList.add('specific')
// }



