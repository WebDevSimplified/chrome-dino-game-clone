import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js"

const SPEED = 0.05

export class Ground {
  elements
  constructor(selector) {
    this.elements = document.querySelectorAll(selector)
  }
  setup() {
    setCustomProperty(this.elements[0], "--left", 0)
    setCustomProperty(this.elements[1], "--left", 300)
  }

  update(delta, speedScale) {
    this.elements.forEach(ground => {
      incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

      if (getCustomProperty(ground, "--left") <= -300) {
        incrementCustomProperty(ground, "--left", 600)
      }
    })
  }
}
