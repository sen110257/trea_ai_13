<template>
  <div class="particles-background" ref="containerRef">
    <canvas ref="canvasRef" class="particles-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { getRandomInt, getRandomFloat } from '../utils'

const props = defineProps({
  effects: { type: Array, default: () => [] }
})

const containerRef = ref(null)
const canvasRef = ref(null)
const ctx = ref(null)
const particles = ref([])
const animationId = ref(null)
const lastTime = ref(0)

class Particle {
  constructor(type, canvasWidth, canvasHeight) {
    this.type = type
    this.x = getRandomFloat(0, canvasWidth)
    this.y = getRandomFloat(-100, canvasHeight)
    this.size = getRandomFloat(2, 8)
    this.speedX = getRandomFloat(-0.5, 0.5)
    this.speedY = getRandomFloat(0.5, 2)
    this.rotation = getRandomFloat(0, Math.PI * 2)
    this.rotationSpeed = getRandomFloat(-0.02, 0.02)
    this.opacity = getRandomFloat(0.3, 1)
    this.opacitySpeed = getRandomFloat(-0.01, 0.01)
    this.life = 1
    this.maxLife = getRandomInt(200, 400)
    this.color = this.getColor()
    this.emoji = this.getEmoji()
  }

  getColor() {
    const colors = {
      sparkle: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9370DB'],
      fireworks: ['#FF0000', '#FFD700', '#00FF00', '#00BFFF', '#FF69B4', '#FF4500'],
      petals: ['#FFB6C1', '#FF69B4', '#FF1493', '#FFC0CB', '#FFF0F5'],
      hearts: ['#FF0000', '#FF69B4', '#FF1493', '#FFB6C1', '#DC143C'],
      confetti: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
      stars: ['#FFFFFF', '#FFFACD', '#E0FFFF', '#F0E68C', '#FFE4E1'],
      snow: ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#B0E0E6', '#ADD8E6']
    }
    const palette = colors[this.type] || colors.sparkle
    return palette[Math.floor(Math.random() * palette.length)]
  }

  getEmoji() {
    const emojis = {
      petals: ['🌸', '🌺', '🌷', '🌹', '💮'],
      hearts: ['❤️', '💕', '💗', '💖', '💝'],
      confetti: ['🎊', '🎉', '✨', '🌟', '💫'],
      snow: ['❄️', '🌨️', '💎', '✨']
    }
    const list = emojis[this.type]
    if (!list) return null
    return list[Math.floor(Math.random() * list.length)]
  }

  update(canvasWidth, canvasHeight) {
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed
    this.opacity += this.opacitySpeed
    this.life -= 1 / this.maxLife

    if (this.opacity <= 0.2 || this.opacity >= 1) {
      this.opacitySpeed *= -1
    }

    if (this.y > canvasHeight + 50 || this.x < -50 || this.x > canvasWidth + 50 || this.life <= 0) {
      this.reset(canvasWidth, canvasHeight)
    }
  }

  reset(canvasWidth, canvasHeight) {
    this.x = getRandomFloat(0, canvasWidth)
    this.y = getRandomFloat(-50, -10)
    this.life = 1
  }

  draw(context, type) {
    context.save()
    context.globalAlpha = this.opacity * this.life

    if (this.emoji && ['petals', 'hearts', 'confetti', 'snow'].includes(type)) {
      context.font = `${this.size * 4}px Arial`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.translate(this.x, this.y)
      context.rotate(this.rotation)
      context.fillText(this.emoji, 0, 0)
    } else if (type === 'fireworks') {
      this.drawFirework(context)
    } else {
      this.drawShape(context, type)
    }

    context.restore()
  }

  drawShape(context, type) {
    context.fillStyle = this.color
    context.translate(this.x, this.y)
    context.rotate(this.rotation)

    if (type === 'stars' || type === 'sparkle') {
      this.drawStar(context, 5, this.size, this.size / 2)
    } else if (type === 'hearts') {
      this.drawHeart(context)
    } else if (type === 'confetti') {
      context.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2)
    } else {
      context.beginPath()
      context.arc(0, 0, this.size, 0, Math.PI * 2)
      context.fill()
    }
  }

  drawStar(context, points, outerRadius, innerRadius) {
    context.beginPath()
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / points - Math.PI / 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      if (i === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }
    }
    context.closePath()
    context.fill()
  }

  drawHeart(context) {
    context.beginPath()
    const size = this.size
    context.moveTo(0, size * 0.3)
    context.bezierCurveTo(-size * 0.5, -size * 0.1, -size, size * 0.3, 0, size)
    context.bezierCurveTo(size, size * 0.3, size * 0.5, -size * 0.1, 0, size * 0.3)
    context.closePath()
    context.fill()
  }

  drawFirework(context) {
    const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(0.5, this.color + '80')
    gradient.addColorStop(1, 'transparent')
    
    context.fillStyle = gradient
    context.beginPath()
    context.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
    context.fill()

    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8 + this.rotation
      const distance = this.size * 2
      const sparkX = this.x + Math.cos(angle) * distance
      const sparkY = this.y + Math.sin(angle) * distance
      
      context.fillStyle = this.color
      context.beginPath()
      context.arc(sparkX, sparkY, this.size * 0.3, 0, Math.PI * 2)
      context.fill()
    }
  }
}

const initCanvas = () => {
  if (!containerRef.value || !canvasRef.value) return
  
  const container = containerRef.value
  const canvas = canvasRef.value
  
  canvas.width = container.offsetWidth
  canvas.height = container.offsetHeight
  
  ctx.value = canvas.getContext('2d')
}

const createParticles = () => {
  if (!props.effects || props.effects.length === 0 || props.effects.includes('none')) {
    particles.value = []
    return
  }

  const canvas = canvasRef.value
  if (!canvas) return

  const particleCount = 30
  particles.value = []

  props.effects.forEach(effectType => {
    if (effectType !== 'none') {
      for (let i = 0; i < particleCount; i++) {
        particles.value.push(new Particle(effectType, canvas.width, canvas.height))
      }
    }
  })
}

const animate = (timestamp) => {
  if (!ctx.value || !canvasRef.value) {
    animationId.value = requestAnimationFrame(animate)
    return
  }

  const deltaTime = timestamp - lastTime.value
  lastTime.value = timestamp

  const canvas = canvasRef.value
  ctx.value.clearRect(0, 0, canvas.width, canvas.height)

  particles.value.forEach(particle => {
    particle.update(canvas.width, canvas.height)
    particle.draw(ctx.value, particle.type)
  })

  animationId.value = requestAnimationFrame(animate)
}

const handleResize = () => {
  initCanvas()
}

watch(() => props.effects, () => {
  createParticles()
}, { deep: true })

onMounted(() => {
  initCanvas()
  createParticles()
  animationId.value = requestAnimationFrame(animate)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.particles-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particles-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
