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
import { computed, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store, addToFavorites, removeFromFavorites, isFavorite as checkIsFavorite, addToHistory } from '../store'
import { copyToClipboard } from '../utils'
import {
  Star, StarFilled, CopyDocument, FullScreen,
  Download, Share, EditPen
} from '@element-plus/icons-vue'

const isSaving = ref(false)

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

const generateCardImage = async () => {
  const previewCard = document.querySelector('.preview-card')
  if (!previewCard) {
    throw new Error('找不到贺卡预览区域')
  }
  
  try {
    const html2canvas = (await import('html2canvas')).default
    
    const canvas = await html2canvas(previewCard, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false
    })
    
    return canvas
  } catch (error) {
    console.error('生成贺卡图片失败:', error)
    throw error
  }
}

const downloadImage = (canvas, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const link = document.createElement('a')
      link.download = filename
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

const saveCard = async () => {
  if (!store.selectedTemplate) {
    ElMessage.warning('请先选择一个模板')
    return
  }
  
  if (isSaving.value) return
  
  isSaving.value = true
  
  try {
    const loading = ElMessage({
      message: '正在生成贺卡图片...',
      type: 'info',
      duration: 0
    })
    
    const canvas = await generateCardImage()
    const timestamp = new Date().toISOString().slice(0, 10)
    const filename = `贺卡_${store.selectedTemplate.name}_${timestamp}.png`
    
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      try {
        const imageData = canvas.toDataURL('image/png')
        
        if (navigator.share) {
          const response = await fetch(imageData)
          const blob = await response.blob()
          const file = new File([blob], filename, { type: 'image/png' })
          
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: '节日贺卡',
              text: `我用节日贺卡生成器制作了「${store.selectedTemplate.name}」，快来看看吧！`
            })
            ElMessage.success('分享成功')
          } else {
            await downloadImage(canvas, filename)
            ElMessage.success('贺卡已保存，请查看下载目录')
          }
        } else {
          await downloadImage(canvas, filename)
          ElMessage.success('贺卡已保存，请查看下载目录')
        }
      } catch (shareError) {
        console.log('分享失败，使用常规下载:', shareError)
        await downloadImage(canvas, filename)
        ElMessage.success('贺卡已保存，请查看下载目录')
      }
    } else {
      await downloadImage(canvas, filename)
      ElMessage.success('贺卡已保存到本地')
    }
    
    addToHistory(store.currentCard)
    loading.close()
    
  } catch (error) {
    console.error('保存贺卡失败:', error)
    ElMessage.error('保存贺卡失败，请重试')
  } finally {
    isSaving.value = false
  }
}

const shareCard = async () => {
  if (!store.selectedTemplate) {
    ElMessage.warning('请先选择一个模板')
    return
  }
  
  ElMessageBox.alert(
    '您可以点击"保存贺卡"按钮下载图片，然后长按图片保存后分享到微信/朋友圈。\n\n在手机上，保存后系统会提示您选择分享方式。',
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
