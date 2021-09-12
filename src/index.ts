const startBtn: HTMLButtonElement = document.querySelector('.play-again-btn')

const startGameByPressEnter = (ev: KeyboardEvent): void => {
  if (ev.key === 'Enter') startGame()
}

const insertGameStartEventListeners = (): void => {
  startBtn.addEventListener('click', startGame)
  document.addEventListener('keydown', startGameByPressEnter)
}

const startGame = (): void => {
  startBtn.removeEventListener('click', startGame)
  document.removeEventListener('keydown', startGameByPressEnter)

  const field: HTMLDivElement = document.querySelector('.field'),
    result: HTMLHeadingElement = document.querySelector('.result'),
    score: HTMLDivElement = document.querySelector('.score')

  let currentShooterIndex: number = 217,
    width: number = 15,
    direction: number = 1,
    invadersId: number,
    movingRight: boolean = true,
    results: any = 0,
    invadersMovingTime: number = 350,
    explosionDisplayTime: number = 100,
    laserMovingTime: number = 50

  result.innerHTML = ''
  score.innerHTML = '0'

  const removedInvadersArr: number[] = []

  for (let i = 0; i < 225; i++) {
    const elemSection: HTMLElement = document.createElement('div')
    elemSection.classList.add('section')

    field.appendChild(elemSection)
  }

  const sections: NodeListOf<Element> = document.querySelectorAll('.section'),
    sectionsArr: Element[] = Array.from(sections),
    invaders: number[] = []

  for (let i = 0; i <= 39; i++) {
    if (i <= 9 || (i >= 15 && i <= 24) || i >= 30) {
      invaders.push(i)
    }
  }

  const displayInvaders = (): void => {
    for (let i = 0; i < invaders.length; i++) {
      if (!removedInvadersArr.includes(i)) {
        if (sectionsArr[invaders[i]] === undefined) {
          return
        } else {
          sectionsArr[invaders[i]].classList.add('invader')
        }
      }
    }
  }

  const removeInvaders = (): void => {
    invaders.forEach(i => {
      sectionsArr[i].classList.remove('invader')
    })
  }

  sections[currentShooterIndex].classList.add('shooter')

  const moveShooter = (ev: KeyboardEvent): void => {
    sections[currentShooterIndex].classList.remove('shooter')

    if (ev.key === 'ArrowLeft') {
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
    }

    if (ev.key === 'ArrowRight') {
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
    }

    sections[currentShooterIndex].classList.add('shooter')
  }

  document.addEventListener('keydown', moveShooter)

  const removeShootingEventListeners = (): void => {
    document.removeEventListener('keydown', moveShooter)
    document.removeEventListener('keydown', shoot)
  }

  const removeSections = (): void => {
    field.innerHTML = ''
  }

  const moveInvaders = (): void => {
    const leftEdge: boolean = invaders[0] % width === 0
    const rightEdge: boolean = invaders[invaders.length - 1] % width === width - 1

    removeInvaders()

    if (rightEdge && movingRight) {
      for (let i = 0; i < invaders.length; i++) {
        invaders[i] += width + 1
        direction = -1

        movingRight = false
      }
    }

    if (leftEdge && !movingRight) {
      for (let i = 0; i < invaders.length; i++) {
        invaders[i] += width - 1
        direction = 1

        movingRight = true
      }
    }

    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += direction
    }

    displayInvaders()

    if (sections[currentShooterIndex].classList.contains('invader')
      && sections[currentShooterIndex].classList.contains('shooter')
    ) {
      clearInterval(invadersId)

      result.innerHTML = 'Game over'

      removeSections()
      removeShootingEventListeners()
      insertGameStartEventListeners()
    }

    for (let i = 0; i < invaders.length; i++) {
      if (invaders[i] > sections.length) {
        clearInterval(invadersId)

        result.innerHTML = 'Game over'

        removeSections()
        removeShootingEventListeners()
        insertGameStartEventListeners()
      }
    }

    if (removedInvadersArr.length === invaders.length) {
      clearInterval(invadersId)

      result.innerHTML = 'You win'

      removeSections()
      removeShootingEventListeners()
      insertGameStartEventListeners()
    }
  }

  invadersId = setInterval(moveInvaders, invadersMovingTime)

  const shoot = (ev: KeyboardEvent): void => {
    let laserId: number
    let currentLaserIndex: number = currentShooterIndex

    const moveLaser = (): void => {
      if (sections[currentLaserIndex] === undefined) {
        return
      } else {
        sections[currentLaserIndex].classList.remove('laser')
      }

      currentLaserIndex -= width

      if (sections[currentLaserIndex] === undefined) {
        return
      } else {
        sections[currentLaserIndex].classList.add('laser')
      }

      if (sections[currentLaserIndex].classList.contains('invader')) {
        sections[currentLaserIndex].classList.remove('laser')
        sections[currentLaserIndex].classList.remove('invader')
        sections[currentLaserIndex].classList.add('explosion')

        setTimeout(() => sections[currentLaserIndex].classList.remove('explosion'), explosionDisplayTime)

        clearInterval(laserId)

        const removedInvader: number = invaders.indexOf(currentLaserIndex)

        removedInvadersArr.push(removedInvader)

        results++

        score.textContent = results
      }
    }

    if (ev.key === 'ArrowUp') laserId = setInterval(moveLaser, laserMovingTime)
  }

  document.addEventListener('keydown', shoot)
}

insertGameStartEventListeners()
