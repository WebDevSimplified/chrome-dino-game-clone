import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000

export class Cactus {
  selector
  nextTime
  worldElem
  constructor(selector, worldElem) {
    this.worldElem = worldElem
    this.selector = selector
  }

  setup() {
    this.nextTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll(this.selector).forEach(cactus => {
      cactus.remove()
    })
  }

  update(delta, speedScale) {
    document.querySelectorAll(this.selector).forEach(cactus => {
      incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove()
      }
    })

    if (this.nextTime <= 0) {
      this.create()
      this.nextTime =
        this.randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    this.nextTime -= delta
  }

  getRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
      return cactus.getBoundingClientRect()
    })
  }

  create() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus") 
    setCustomProperty(cactus, "--left", 100)
    this.worldElem.append(cactus)
  }

  randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
} 