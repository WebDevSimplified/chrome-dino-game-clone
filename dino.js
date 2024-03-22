import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js"

const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100


export class Dino {
  element
  isJumping
   frame
   currentFrameTime
   yVelocity

  constructor(selector) {
    this.element = document.querySelector(selector)
  }
  setup() {
    this.isJumping = false
    this.frame = 0
    this.currentFrameTime = 0 
    setCustomProperty(this.element, "--bottom", 0)
    document.removeEventListener("keydown", this.onJump.bind(this))
    document.addEventListener("keydown", this.onJump.bind(this))
  }

  update(delta, speedScale) {
    this.handleRun(delta, speedScale)
    this.handleJump(delta)
  }

  getRect() {
    return this.element.getBoundingClientRect()
  }

  setLose() {
    this.element.src = "imgs/dino-lose.png"
  }

  handleRun(delta, speedScale) {
    if (this.isJumping) {
      this.element.src = `imgs/dino-stationary.png`
      return
    }

    if (this.currentFrameTime >= FRAME_TIME) {
      this.frame = (this.frame + 1) % DINO_FRAME_COUNT
      this.element.src = `imgs/dino-run-${this.frame}.png`
      this.currentFrameTime -= FRAME_TIME
    }
    this.currentFrameTime += delta * speedScale
  }

  handleJump(delta) {
    if (!this.isJumping) return

    incrementCustomProperty(this.element, "--bottom", this.yVelocity * delta)

    if (getCustomProperty(this.element, "--bottom") <= 0) {
      setCustomProperty(this.element, "--bottom", 0)
      this.isJumping = false
    }

    this.yVelocity -= GRAVITY * delta
  }

  onJump(e) {
    if (e.code !== "Space" || this.isJumping) return

    this.yVelocity = JUMP_SPEED
    this.isJumping = true
  }
} 