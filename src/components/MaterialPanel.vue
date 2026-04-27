<template>
  <transition name="slide-up">
    <div 
      class="material-panel" 
      v-show="store.showMaterialPanel"
      @click.self="closePanel"
    >
      <div class="panel-content">
        <div class="panel-header">
          <h3 class="panel-title">
            <el-icon><MagicStick /></el-icon>
            素材库
          </h3>
          <el-button 
            circle 
            size="small" 
            icon="Close" 
            @click="closePanel"
            class="close-btn"
          />
        </div>
        
        <el-tabs v-model="store.activeMaterialTab" class="material-tabs">
          <el-tab-pane label="贴纸" name="stickers">
            <div class="tab-content">
              <div class="sticker-categories">
                <div
                  v-for="cat in stickerCategories"
                  :key="cat.id"
                  class="category-chip"
                  :class="{ active: activeStickerCategory === cat.id }"
                  @click="activeStickerCategory = cat.id"
                >
                  <span class="cat-emoji">{{ cat.icon }}</span>
                  <span class="cat-name">{{ cat.name }}</span>
                </div>
              </div>
              
              <div class="sticker-grid">
                <div
                  v-for="sticker in currentStickers"
                  :key="sticker.id"
                  class="sticker-item"
                  @click="addSticker(sticker)"
                >
                  <span class="sticker-emoji">{{ sticker.emoji }}</span>
                  <span class="sticker-name">{{ sticker.name }}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="边框" name="borders">
            <div class="tab-content">
              <div class="border-grid">
                <div
                  v-for="border in borders"
                  :key="border.id"
                  class="border-item"
                  :style="border.style"
                  @click="applyBorder(border)"
                >
                  <span class="border-name">{{ border.name }}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="字体" name="fonts">
            <div class="tab-content">
              <div class="font-list">
                <div
                  v-for="font in fonts"
                  :key="font.id"
                  class="font-item"
                  @click="applyFont(font)"
                >
                  <div class="font-preview" :style="{ fontFamily: font.family }">
                    节日快乐 Happy
                  </div>
                  <div class="font-name">{{ font.name }}</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="上传" name="upload">
            <div class="tab-content">
              <div class="upload-area">
                <el-upload
                  drag
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :limit="1"
                  accept="image/*"
                >
                  <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
                  <div class="el-upload__text">
                    将照片拖到此处，或<em>点击上传</em>
                  </div>
                  <template #tip>
                    <div class="el-upload__tip">
                      支持 JPG、PNG、GIF、WEBP 格式
                    </div>
                  </template>
                </el-upload>
                
                <div class="upload-preview" v-if="uploadedImage">
                  <img :src="uploadedImage" alt="Preview" />
                  <div class="preview-controls">
                    <el-button type="primary" @click="addUploadedImage">
                      添加到贺卡
                    </el-button>
                    <el-button @click="clearUpload">
                      清除
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { store, addCardElement } from '../store'
import { stickers, stickerCategories, borders, fonts } from '../data/materials'
import { MagicStick, UploadFilled } from '@element-plus/icons-vue'

const activeStickerCategory = ref('festival')
const uploadedImage = ref(null)

const currentStickers = computed(() => {
  return stickers[activeStickerCategory.value] || []
})

const closePanel = () => {
  store.showMaterialPanel = false
}

const addSticker = (sticker) => {
  const element = {
    type: 'decoration',
    emoji: sticker.emoji,
    x: 50,
    y: 50,
    size: 48,
    animation: 'float'
  }
  addCardElement(element)
  ElMessage.success(`已添加「${sticker.name}」`)
}

const applyBorder = (border) => {
  ElMessage.info('边框功能开发中...')
}

const applyFont = (font) => {
  ElMessage.info('请先选中文字元素再应用字体')
}

const handleFileChange = (file) => {
  if (file.raw) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImage.value = e.target.result
    }
    reader.readAsDataURL(file.raw)
  }
}

const addUploadedImage = () => {
  if (!uploadedImage.value) return
  
  const element = {
    type: 'image',
    src: uploadedImage.value,
    x: 50,
    y: 50,
    width: 150,
    height: 150,
    borderRadius: 8,
    scale: 1,
    rotation: 0
  }
  addCardElement(element)
  ElMessage.success('图片已添加到贺卡')
  closePanel()
}

const clearUpload = () => {
  uploadedImage.value = null
}
</script>

<style scoped>
.material-panel {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.panel-content {
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  background: var(--card-bg);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  box-shadow: var(--shadow-float);
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
}

@media (min-width: 768px) {
  .material-panel {
    align-items: center;
  }
  
  .panel-content {
    border-radius: var(--radius-xl);
    max-height: 70vh;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color-primary);
}

.close-btn {
  --el-button-bg-color: var(--btn-secondary-bg);
}

.material-tabs {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tab-content {
  padding: var(--spacing-md);
  max-height: 400px;
  overflow-y: auto;
}

.sticker-categories {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-xs);
}

.category-chip {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.category-chip:hover {
  border-color: var(--primary-color);
}

.category-chip.active {
  background: var(--primary-alpha);
  border-color: var(--primary-color);
}

.cat-emoji {
  font-size: 16px;
}

.cat-name {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--text-color-secondary);
}

.category-chip.active .cat-name {
  color: var(--primary-color);
}

.sticker-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.sticker-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.sticker-item:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-soft);
}

.sticker-emoji {
  font-size: 32px;
}

.sticker-name {
  font-size: var(--font-size-xs);
  color: var(--text-color-muted);
}

.border-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.border-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.border-item:hover {
  transform: scale(1.02);
}

.border-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-color-secondary);
}

.font-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.font-item {
  padding: var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.font-item:hover {
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.font-preview {
  font-size: var(--font-size-lg);
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
}

.font-name {
  font-size: var(--font-size-xs);
  color: var(--text-color-muted);
}

.upload-area {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.upload-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
}

.upload-preview img {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.preview-controls {
  display: flex;
  gap: var(--spacing-sm);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter-from .panel-content,
.slide-up-leave-to .panel-content {
  transform: translateY(100%);
}

@media (max-width: 768px) {
  .sticker-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .border-grid {
    grid-template-columns: 1fr;
  }
}
</style>
