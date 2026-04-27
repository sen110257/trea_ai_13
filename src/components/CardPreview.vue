<template>
  <div class="card-preview">
    <div class="preview-container">
      <div 
        class="preview-card"
        :class="{ 'selectable': selectable }"
        :style="cardStyle"
      >
        <div class="preview-bg" :style="{ background: store.currentCard.background }"></div>
        
        <div 
          v-for="element in sortedElements"
          :key="element.id"
          class="preview-element"
          :class="{ 
            selected: selectedElementId === element.id,
            'text-element': element.type === 'text',
            'decoration-element': element.type === 'decoration',
            'image-element': element.type === 'image'
          }"
          :style="getElementStyle(element)"
          @click="handleClick(element)"
        >
          <template v-if="element.type === 'text'">
            <span 
              class="text-content"
              :style="getTextStyle(element)"
            >{{ element.content }}</span>
          </template>
          
          <template v-else-if="element.type === 'decoration'">
            <span 
              class="decoration-content"
              :style="{ fontSize: element.size + 'px' }"
            >{{ element.emoji }}</span>
          </template>
          
          <template v-else-if="element.type === 'image'">
            <img 
              class="image-content"
              :src="element.src"
              :style="getImageStyle(element)"
              alt=""
            />
          </template>
          
          <div 
            class="element-handle"
            v-if="selectable && selectedElementId === element.id"
          >
            <div class="handle-corner top-left" @mousedown.stop="startResize('nw', element, $event)"></div>
            <div class="handle-corner top-right" @mousedown.stop="startResize('ne', element, $event)"></div>
            <div class="handle-corner bottom-left" @mousedown.stop="startResize('sw', element, $event)"></div>
            <div class="handle-corner bottom-right" @mousedown.stop="startResize('se', element, $event)"></div>
            <div class="handle-rotate" @mousedown.stop="startRotate(element, $event)">
              <el-icon><RefreshRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
      
      <div class="preview-actions" v-if="showActions">
        <el-button-group>
          <el-button size="small" icon="ZoomOut" @click="zoomOut">缩小</el-button>
          <el-button size="small" @click="resetZoom">{{ zoom }}%</el-button>
          <el-button size="small" icon="ZoomIn" @click="zoomIn">放大</el-button>
        </el-button-group>
        
        <el-button size="small" icon="FullScreen" @click="openFullscreen">全屏查看</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { store } from '../store'
import { cardSizes } from '../data/categories'
import { RefreshRight, ZoomOut, ZoomIn, FullScreen } from '@element-plus/icons-vue'

const props = defineProps({
  selectable: { type: Boolean, default: false },
  showActions: { type: Boolean, default: true }
})

const emit = defineEmits(['selectElement'])

const selectedElementId = ref(null)
const zoom = ref(100)
const isResizing = ref(false)
const isRotating = ref(false)
const resizeHandle = ref('')
const resizingElement = ref(null)
const rotatingElement = ref(null)
const startX = ref(0)
const startY = ref(0)
const startWidth = ref(0)
const startHeight = ref(0)
const startRotation = ref(0)

const currentCardSize = computed(() => {
  return cardSizes.find(s => s.id === store.currentCard.size) || cardSizes[0]
})

const cardStyle = computed(() => {
  const size = currentCardSize.value
  const aspectRatio = store.currentCard.orientation === 'landscape' 
    ? `${size.height}/${size.width}` 
    : `${size.width}/${size.height}`
  
  return {
    width: `${size.width * (zoom.value / 100)}px`,
    height: `${size.height * (zoom.value / 100)}px`,
    aspectRatio
  }
})

const sortedElements = computed(() => {
  return [...store.currentCard.elements]
})

const getElementStyle = (element) => {
  const style = {
    position: 'absolute',
    left: `${element.x}%`,
    top: `${element.y}%`,
    transform: `translate(-50%, -50%)`
  }
  
  if (element.rotation) {
    style.transform += ` rotate(${element.rotation}deg)`
  }
  
  if (element.scale) {
    style.transform += ` scale(${element.scale})`
  }
  
  if (element.animation) {
    style.animation = `${element.animation} 2s ease-in-out infinite`
  }
  
  if (element.delay) {
    style.animationDelay = `${element.delay}s`
  }
  
  return style
}

const getTextStyle = (element) => {
  const style = {
    fontSize: `${element.fontSize}px`,
    fontFamily: element.fontFamily || 'inherit',
    color: element.color || 'inherit',
    textAlign: element.textAlign || 'center',
    lineHeight: 1.4,
    whiteSpace: 'nowrap'
  }
  
  if (element.textShadow) {
    style.textShadow = element.textShadow
  }
  
  return style
}

const getImageStyle = (element) => {
  const style = {}
  
  if (element.width) {
    style.width = `${element.width}px`
  }
  if (element.height) {
    style.height = `${element.height}px`
  }
  if (element.borderRadius) {
    style.borderRadius = `${element.borderRadius}%`
  }
  
  return style
}

const handleClick = (element) => {
  if (props.selectable) {
    selectedElementId.value = element.id
    emit('selectElement', element.id)
  }
}

const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 10, 200)
}

const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 10, 50)
}

const resetZoom = () => {
  zoom.value = 100
}

const openFullscreen = () => {
  const preview = document.querySelector('.preview-card')
  if (preview) {
    if (preview.requestFullscreen) {
      preview.requestFullscreen()
    } else if (preview.webkitRequestFullscreen) {
      preview.webkitRequestFullscreen()
    } else if (preview.msRequestFullscreen) {
      preview.msRequestFullscreen()
    }
  }
}

const startResize = (handle, element, event) => {
  isResizing.value = true
  resizeHandle.value = handle
  resizingElement.value = element
  startX.value = event.clientX
  startY.value = event.clientY
  startWidth.value = element.width || 100
  startHeight.value = element.height || 100
}

const startRotate = (element, event) => {
  isRotating.value = true
  rotatingElement.value = element
  startX.value = event.clientX
  startY.value = event.clientY
  startRotation.value = element.rotation || 0
}

const handleMouseMove = (event) => {
  if (isResizing.value && resizingElement.value) {
    const dx = event.clientX - startX.value
    const dy = event.clientY - startY.value
    const scale = Math.max(0.5, 1 + (dx + dy) / 200)
    
    if (!resizingElement.value.scale) {
      resizingElement.value.scale = 1
    }
    resizingElement.value.scale = Math.max(0.5, Math.min(3, resizingElement.value.scale + (dx + dy) / 500))
  }
  
  if (isRotating.value && rotatingElement.value) {
    const dx = event.clientX - startX.value
    rotatingElement.value.rotation = startRotation.value + dx
  }
}

const handleMouseUp = () => {
  isResizing.value = false
  isRotating.value = false
  resizeHandle.value = ''
  resizingElement.value = null
  rotatingElement.value = null
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped>
.card-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  width: 100%;
}

.preview-card {
  position: relative;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-float);
  overflow: hidden;
  transition: all 0.3s ease;
}

.preview-card.selectable {
  cursor: crosshair;
}

.preview-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.preview-element {
  z-index: 1;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.preview-element:hover {
  outline: 2px dashed var(--primary-color);
  outline-offset: 2px;
}

.preview-element.selected {
  outline: 2px solid var(--primary-color);
  outline-offset: 4px;
}

.text-content {
  display: block;
  max-width: 100%;
  word-wrap: break-word;
}

.decoration-content {
  display: block;
  line-height: 1;
}

.image-content {
  display: block;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.element-handle {
  position: absolute;
  inset: -8px;
  pointer-events: none;
}

.handle-corner {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--primary-color);
  border: 2px solid white;
  border-radius: 50%;
  pointer-events: auto;
  cursor: nwse-resize;
}

.handle-corner.top-left { top: 0; left: 0; cursor: nwse-resize; }
.handle-corner.top-right { top: 0; right: 0; cursor: nesw-resize; }
.handle-corner.bottom-left { bottom: 0; left: 0; cursor: nesw-resize; }
.handle-corner.bottom-right { bottom: 0; right: 0; cursor: nwse-resize; }

.handle-rotate {
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  cursor: grab;
  pointer-events: auto;
}

.handle-rotate:active {
  cursor: grabbing;
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .preview-card {
    max-width: 100%;
    overflow: auto;
  }
}
</style>
