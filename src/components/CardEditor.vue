<template>
  <div class="card-editor">
    <div class="editor-header">
      <h2 class="editor-title">
        <el-icon><EditPen /></el-icon>
        编辑贺卡
      </h2>
      <el-button 
        size="small" 
        @click="closeEditor"
        class="close-btn"
      >
        <el-icon><Close /></el-icon>
      </el-button>
    </div>
    
    <div class="editor-tabs">
      <el-tabs v-model="activeTab" type="card" class="custom-tabs">
        <el-tab-pane label="文案编辑" name="text">
          <div class="tab-content">
            <div class="text-controls" v-if="currentTextElement">
              <div class="control-group">
                <label class="control-label">文字内容</label>
                <el-input
                  v-model="currentTextElement.content"
                  type="textarea"
                  :rows="2"
                  placeholder="输入祝福语..."
                  @input="updateElement"
                />
              </div>
              
              <div class="control-row">
                <div class="control-group">
                  <label class="control-label">字体</label>
                  <el-select v-model="currentTextElement.fontFamily" @change="updateElement" class="full-width">
                    <el-option
                      v-for="font in fonts"
                      :key="font.id"
                      :label="font.name"
                      :value="font.family"
                    >
                      <span :style="{ fontFamily: font.family }">{{ font.preview }}</span>
                    </el-option>
                  </el-select>
                </div>
                
                <div class="control-group">
                  <label class="control-label">字号</label>
                  <el-slider
                    v-model="currentTextElement.fontSize"
                    :min="12"
                    :max="120"
                    :step="2"
                    show-input
                    show-input-controls
                    input-size="small"
                    @change="updateElement"
                  />
                </div>
              </div>
              
              <div class="control-row">
                <div class="control-group">
                  <label class="control-label">颜色</label>
                  <el-color-picker
                    v-model="currentTextElement.color"
                    show-alpha
                    predefine
                    @change="updateElement"
                  />
                </div>
                
                <div class="control-group">
                  <label class="control-label">对齐</label>
                  <el-radio-group v-model="currentTextElement.textAlign" @change="updateElement">
                    <el-radio-button label="left"><el-icon><AlignLeft /></el-icon></el-radio-button>
                    <el-radio-button label="center"><el-icon><AlignCenter /></el-icon></el-radio-button>
                    <el-radio-button label="right"><el-icon><AlignRight /></el-icon></el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              
              <div class="control-group">
                <label class="control-label">字体特效</label>
                <el-radio-group v-model="currentFontEffect" @change="applyFontEffect">
                  <el-radio-button
                    v-for="effect in fontEffects"
                    :key="effect.id"
                    :label="effect.id"
                  >
                    {{ effect.name }}
                  </el-radio-button>
                </el-radio-group>
              </div>
              
              <div class="control-row">
                <div class="control-group">
                  <label class="control-label">水平位置</label>
                  <el-slider
                    v-model="currentTextElement.x"
                    :min="0"
                    :max="100"
                    @change="updateElement"
                  />
                </div>
                <div class="control-group">
                  <label class="control-label">垂直位置</label>
                  <el-slider
                    v-model="currentTextElement.y"
                    :min="0"
                    :max="100"
                    @change="updateElement"
                  />
                </div>
              </div>
            </div>
            
            <div class="empty-text" v-else>
              <el-empty description="点击预览区的文字进行编辑" />
            </div>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="背景样式" name="background">
          <div class="tab-content">
            <div class="background-grid">
              <div
                v-for="bg in backgrounds"
                :key="bg.id"
                class="background-item"
                :class="{ active: store.currentCard.background === bg.value }"
                :style="{ background: bg.value }"
                @click="selectBackground(bg.value)"
              >
                <div class="bg-name">{{ bg.name }}</div>
              </div>
            </div>
            
            <div class="custom-bg">
              <label class="control-label">自定义背景色</label>
              <el-color-picker
                v-model="customBgColor"
                show-alpha
                @change="applyCustomBg"
              />
              <el-button size="small" @click="applyCustomBg" class="apply-btn">应用</el-button>
            </div>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="尺寸设置" name="size">
          <div class="tab-content">
            <div class="size-grid">
              <div
                v-for="size in cardSizes"
                :key="size.id"
                class="size-item"
                :class="{ active: store.currentCard.size === size.id }"
                @click="selectSize(size.id)"
              >
                <div class="size-icon">
                  <el-icon><component :is="size.icon" /></el-icon>
                </div>
                <div class="size-info">
                  <div class="size-name">{{ size.name }}</div>
                  <div class="size-dimensions">{{ size.width }} × {{ size.height }}</div>
                </div>
              </div>
            </div>
            
            <div class="orientation-toggle">
              <label class="control-label">横竖方向</label>
              <el-radio-group v-model="store.currentCard.orientation">
                <el-radio-button label="portrait">竖版</el-radio-button>
                <el-radio-button label="landscape">横版</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="动态特效" name="effects">
          <div class="tab-content">
            <div class="effects-grid">
              <div
                v-for="effect in effectsList"
                :key="effect.id"
                class="effect-item"
                :class="{ active: store.currentCard.effects.includes(effect.id) }"
                @click="toggleEffect(effect.id)"
              >
                <div class="effect-icon">{{ effect.icon === 'CircleClose' ? '🚫' : effect.icon === 'Star' ? '⭐' : effect.icon === 'Sunny' ? '🎆' : effect.icon === 'Cherry' ? '🌸' : effect.icon === 'Heart' ? '❤️' : effect.icon === 'Party' ? '🎉' : effect.icon === 'MoonNight' ? '🌙' : effect.icon === 'Snowy' ? '❄️' : '✨' }}</div>
                <div class="effect-name">{{ effect.name }}</div>
              </div>
            </div>
            
            <div class="music-selector" v-if="false">
              <label class="control-label">背景音乐</label>
              <el-select v-model="store.currentCard.music" placeholder="选择音乐">
                <el-option
                  v-for="music in musicOptions"
                  :key="music.id"
                  :label="music.name"
                  :value="music.id"
                />
              </el-select>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <div class="editor-preview">
      <CardPreview 
        :selectable="true"
        @selectElement="handleSelectElement"
      />
    </div>
    
    <div class="quick-actions">
      <el-button type="primary" @click="openMaterialPanel" class="action-btn">
        <el-icon><Plus /></el-icon>
        添加素材
      </el-button>
      <el-button @click="resetCard" class="action-btn">
        <el-icon><RefreshRight /></el-icon>
        重置
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { store, updateCardBackground, updateCardSize, toggleEffect, setMaterialTab } from '../store'
import { fonts, fontEffects, backgrounds, cardSizes, effects as effectsList, musicOptions } from '../data/materials'
import CardPreview from './CardPreview.vue'
import {
  EditPen, Close, AlignLeft, AlignCenter, AlignRight,
  Plus, RefreshRight, Grid, Document, Picture, UserFilled
} from '@element-plus/icons-vue'

const activeTab = ref('text')
const selectedElementId = ref(null)
const customBgColor = ref('#9333EA')
const currentFontEffect = ref('none')

const currentTextElement = computed(() => {
  if (!selectedElementId.value) return null
  return store.currentCard.elements.find(el => el.id === selectedElementId.value && el.type === 'text')
})

const updateElement = () => {
  // 自动触发响应式更新
}

const applyFontEffect = (effectId) => {
  if (!currentTextElement.value) return
  const effect = fontEffects.find(e => e.id === effectId)
  if (effect) {
    // 应用字体特效
  }
}

const selectBackground = (bgValue) => {
  updateCardBackground(bgValue)
  ElMessage.success('背景已更新')
}

const applyCustomBg = () => {
  updateCardBackground(customBgColor.value)
  ElMessage.success('自定义背景已应用')
}

const selectSize = (sizeId) => {
  updateCardSize(sizeId)
  ElMessage.success('尺寸已切换')
}

const handleSelectElement = (elementId) => {
  selectedElementId.value = elementId
  if (elementId) {
    activeTab.value = 'text'
  }
}

const closeEditor = () => {
  store.selectedTemplate = null
  selectedElementId.value = null
}

const openMaterialPanel = () => {
  setMaterialTab('stickers')
}

const resetCard = () => {
  // 重置到模板初始状态
  ElMessage.info('贺卡已重置')
}

watch(selectedElementId, (newId) => {
  if (newId) {
    activeTab.value = 'text'
  }
})
</script>

<style scoped>
.card-editor {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  border: 1px solid var(--card-border);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  animation: fadeInRight 0.5s ease-out;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.editor-title {
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

.editor-tabs {
  padding: 0 var(--spacing-md);
}

.custom-tabs {
  --el-tabs-header-height: 44px;
}

.tab-content {
  padding: var(--spacing-md);
  min-height: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.control-group {
  margin-bottom: var(--spacing-md);
}

.control-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-color-secondary);
  margin-bottom: var(--spacing-sm);
}

.control-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.full-width {
  width: 100%;
}

.empty-text {
  padding: var(--spacing-2xl);
  text-align: center;
}

.background-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.background-item {
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  cursor: pointer;
  position: relative;
  border: 3px solid transparent;
  transition: all 0.3s ease;
}

.background-item:hover {
  transform: scale(1.05);
}

.background-item.active {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-alpha);
}

.bg-name {
  position: absolute;
  bottom: var(--spacing-xs);
  left: var(--spacing-xs);
  right: var(--spacing-xs);
  font-size: 10px;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-bg {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.apply-btn {
  margin-left: auto;
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.size-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-item:hover {
  border-color: var(--primary-color);
}

.size-item.active {
  border-color: var(--primary-color);
  background: var(--primary-alpha);
}

.size-icon {
  font-size-size: 28px;
  color: var(--text-color-secondary);
}

.size-item.active .size-icon {
  color: var(--primary-color);
}

.size-info {
  display: flex;
  flex-direction: column;
}

.size-name {
  font-size-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-color-primary);
}

.size-dimensions {
  font-size-size: var(--font-size-xs);
  color: var(--text-color-muted);
}

.orientation-toggle {
  margin-top: var(--spacing-lg);
}

.effects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.effect-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.effect-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.effect-item.active {
  border-color: var(--primary-color);
  background: var(--primary-alpha);
}

.effect-icon {
  font-size-size: 28px;
}

.effect-name {
  font-size-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--text-color-secondary);
}

.effect-item.active .effect-name {
  color: var(--primary-color);
}

.music-selector {
  margin-top: var(--spacing-lg);
}

.editor-preview {
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
}

.quick-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-light);
}

.action-btn {
  flex: 1;
}

@media (max-width: 768px) {
  .control-row {
    grid-template-columns: 1fr;
  }

  .background-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .size-grid {
    grid-template-columns: 1fr;
  }

  .effects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quick-actions {
    flex-direction: column;
  }
}
</style>
