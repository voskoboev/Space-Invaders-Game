
const field: HTMLElement = document.querySelector('.field'),
  result: HTMLElement = document.querySelector('.result')

let currentShooterIndex: number = 202,
  width: number = 15,
  direction: number = 1,
  invadersId: number,
  goingRight: boolean = true

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

const draw: Function = (): void => {
  invaders.forEach(i => {
    sectionsArr[i].classList.add('invader')
  })

  // for (let i = 0; i < invaders.length; i++) {
  //   sectionsArr[invaders[i]].classList.add('specific')
  // }
}

draw()

const remove: Function = (): void => {
  invaders.forEach(i => {
    sectionsArr[i].classList.remove('invader')
  })

  // for (let i = 0; i < invaders.length; i++) {
  //   sectionsArr[invaders[i]].classList.remove('specific')
  // }
}

sections[currentShooterIndex].classList.add('shooter')

const moveShooter = (ev: KeyboardEvent): void => { // сделать типы для этой функции
  sections[currentShooterIndex].classList.remove('shooter')

  switch (ev.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
      break
    case 'ArrowRight':
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
      break
  }

  sections[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

const moveInvaders = () => {
  const leftEdge: boolean = invaders[0] % width === 0
  const rightEdge: boolean = invaders[invaders.length - 1] % width === width - 1

  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width + 1
      direction = -1

      goingRight = false
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += width - 1
      direction = 1

      goingRight = true
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    invaders[i] += direction
  }

  draw()

  if (sections[currentShooterIndex].classList.contains('invader') // заменить переменной
    && sections[currentShooterIndex].classList.contains('shooter')
  ) {
    clearInterval(invadersId)
    result.innerHTML = 'game over'
  }

  for (let i =0; i < invaders.length; i++) {
    if (invaders[i] > sections.length) {
      
    }
  }
}

invadersId = setInterval(moveInvaders, 20)
