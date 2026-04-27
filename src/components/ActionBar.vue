<template>
  <div class="action-bar">
    <div class="bar-content">
      <div class="bar-left" v-if="store.selectedTemplate">
        <div class="selected-info">
          <span class="info-label">当前模板:</span>
          <span class="info-name">{{ store.selectedTemplate?.name }}</span>
        </div>
      </div>
      
      <div class="bar-right">
        <el-button-group class="action-group" v-if="store.selectedTemplate">
          <el-button @click="toggleFavorite">
            <el-icon><component :is="isFavorite ? 'StarFilled' : 'Star'" /></el-icon>
            <span class="hidden-mobile">收藏</span>
          </el-button>
          
          <el-button @click="copyWishes">
            <el-icon><CopyDocument /></el-icon>
            <span class="hidden-mobile">复制文案</span>
          </el-button>
          
          <el-button @click="openFullscreen">
            <el-icon><FullScreen /></el-icon>
            <span class="hidden-mobile">全屏预览</span>
          </el-button>
        </el-button-group>
        
        <el-button 
          type="primary" 
          :disabled="!store.selectedTemplate"
          @click="saveCard"
          class="save-btn"
        >
          <el-icon><Download /></el-icon>
          <span>保存贺卡</span>
        </el-button>
        
        <el-button 
          type="primary" 
          :disabled="!store.selectedTemplate"
          @click="shareCard"
          class="share-btn"
        >
          <el-icon><Share /></el-icon>
          <span class="hidden-mobile">分享</span>
        </el-button>
      </div>
    </div>
    
    <div class="empty-hint" v-if="!store.selectedTemplate">
      <el-icon><EditPen /></el-icon>
      <span>选择一个模板开始制作贺卡</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store, addToFavorites, removeFromFavorites, isFavorite as checkIsFavorite, addToHistory } from '../store'
import { copyToClipboard, toast } from '../utils'
import {
  Star, StarFilled, CopyDocument, FullScreen,
  Download, Share, EditPen
} from '@element-plus/icons-vue'

const isFavorite = computed(() => {
  return store.selectedTemplate && checkIsFavorite(store.selectedTemplate.id)
})

const toggleFavorite = () => {
  if (!store.selectedTemplate) return
  
  if (isFavorite.value) {
    removeFromFavorites(store.selectedTemplate.id)
    ElMessage.info('已取消收藏')
  } else {
    addToFavorites(store.selectedTemplate.id)
    ElMessage.success('已添加到收藏')
  }
}

const copyWishes = () => {
  if (!store.selectedTemplate) return
  
  const textElements = store.currentCard.elements.filter(e => e.type === 'text')
  if (textElements.length === 0) {
    ElMessage.warning('没有可复制的文案')
    return
  }
  
  const text = textElements.map(e => e.content).join('\n')
  copyToClipboard(text)
    .then(() => {
      ElMessage.success('文案已复制到剪贴板')
    })
    .catch(() => {
      ElMessage.error('复制失败')
    })
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

const saveCard = () => {
  if (!store.selectedTemplate) {
    ElMessage.warning('请先选择一个模板')
    return
  }
  
  ElMessage.success('贺卡已保存到本地')
  
  addToHistory(store.currentCard)
}

const shareCard = () => {
  if (!store.selectedTemplate) {
    ElMessage.warning('请先选择一个模板')
    return
  }
  
  ElMessageBox.alert(
    '您可以长按图片保存后分享到微信/朋友圈，或使用保存按钮下载图片后分享。',
    '分享贺卡',
    {
      confirmButtonText: '我知道了',
      type: 'info'
    }
  )
}
</script>

<style scoped>
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 950;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--glass-border);
}

.bar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-sm) var(--spacing-md);
}

.bar-left {
  display: flex;
  align-items: center;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
}

.info-label {
  color: var(--text-color-muted);
}

.info-name {
  font-weight: 500;
  color: var(--text-color-primary);
}

.bar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.action-group {
  margin-right: var(--spacing-sm);
}

.save-btn,
.share-btn {
  --el-button-bg-color: var(--primary-color);
  --el-button-border-color: var(--primary-color);
  --el-button-hover-bg-color: var(--primary-hover);
  --el-button-hover-border-color: var(--primary-hover);
}

.save-btn {
  background: var(--gradient-primary);
  border: none;
}

.empty-hint {
  display: none;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  color: var(--text-color-muted);
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .action-bar {
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  
  .bar-content {
    flex-direction: column;
    padding: var(--spacing-sm);
  }
  
  .bar-left {
    display: none;
  }
  
  .bar-right {
    width: 100%;
    justify-content: stretch;
  }
  
  .action-group {
    margin-right: 0;
    display: none;
  }
  
  .save-btn,
  .share-btn {
    flex: 1;
  }
  
  .empty-hint {
    display: flex;
  }
  
  .bar-content:has(.save-btn:not(:disabled)) + .empty-hint,
  .bar-content:not(:has(.save-btn:disabled)) ~ .empty-hint {
    display: none;
  }
}

@media (max-width: 480px) {
  .hidden-mobile {
    display: none;
  }
}
</style>
