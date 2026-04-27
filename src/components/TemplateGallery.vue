<template>
  <div class="template-gallery">
    <div class="gallery-header">
      <h2 class="gallery-title">
        <span class="title-icon">{{ currentTitleIcon }}</span>
        {{ currentTitle }}
      </h2>
      <div class="gallery-stats">
        <span class="stat-item">
          <el-icon><View /></el-icon>
          <span>{{ filteredTemplates.length }} 个模板</span>
        </span>
      </div>
    </div>
    
    <div class="style-filter" v-if="filteredTemplates.length > 0">
      <el-radio-group v-model="currentStyle" size="small">
        <el-radio-button label="all">全部风格</el-radio-button>
        <el-radio-button
          v-for="style in templateStyles"
          :key="style.id"
          :label="style.id"
        >
          {{ style.name }}
        </el-radio-button>
      </el-radio-group>
    </div>
    
    <div class="templates-grid">
      <div
        v-for="template in styleFilteredTemplates"
        :key="template.id"
        class="template-card"
        :class="{ 
          selected: store.selectedTemplate?.id === template.id,
          'card-hover': true
        }"
        @click="selectTemplate(template)"
      >
        <div class="template-thumbnail">
          <img 
            :src="template.thumbnail" 
            :alt="template.name"
            loading="lazy"
          />
          
          <div class="template-overlay">
            <div class="overlay-actions">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                class="overlay-btn"
                @click.stop="selectTemplate(template)"
              >
                开始制作
              </el-button>
            </div>
          </div>
          
          <div class="template-badges">
            <el-tag
              v-if="template.isHot"
              type="danger"
              size="small"
              effect="dark"
              class="badge-tag"
            >
              热门
            </el-tag>
            <el-tag
              v-if="template.isNew"
              type="success"
              size="small"
              effect="dark"
              class="badge-tag"
            >
              新品
            </el-tag>
          </div>
          
          <el-button
            class="favorite-btn"
            :icon="isFavorite(template.id) ? 'StarFilled' : 'Star'"
            circle
            size="small"
            :type="isFavorite(template.id) ? 'warning' : ''"
            @click.stop="toggleFavorite(template.id)"
          />
        </div>
        
        <div class="template-info">
          <h3 class="template-name">{{ template.name }}</h3>
          <div class="template-meta">
            <span class="meta-tag" :style="{ backgroundColor: getStyleColor(template.style) }">
              {{ getStyleName(template.style) }}
            </span>
            <el-tooltip 
              v-for="effect in template.effects" 
              :key="effect"
              :content="getEffectName(effect)"
              placement="top"
            >
              <span class="effect-indicator">✨</span>
            </el-tooltip>
          </div>
        </div>
        
        <div class="selected-indicator" v-if="store.selectedTemplate?.id === template.id">
          <el-icon><Check /></el-icon>
        </div>
      </div>
      
      <div class="empty-state" v-if="styleFilteredTemplates.length === 0">
        <el-empty description="暂无匹配的模板" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { store, addToFavorites, removeFromFavorites, isFavorite as storeIsFavorite } from '../store'
import { selectTemplate as selectStoreTemplate } from '../data/templates'
import { templates, getTemplatesByCategory, templateStyles } from '../data/templates'
import { categories } from '../data/categories'
import { effects } from '../data/materials'
import { View, Check } from '@element-plus/icons-vue'

const currentStyle = ref('all')

const currentTitle = computed(() => {
  if (store.currentSubCategory) {
    const category = categories.find(c => c.id === store.currentCategory)
    if (category?.items) {
      const sub = category.items.find(s => s.id === store.currentSubCategory)
      if (sub) return sub.name
    }
  }
  
  const category = categories.find(c => c.id === store.currentCategory)
  return category?.name || '精选推荐'
})

const currentTitleIcon = computed(() => {
  if (store.currentSubCategory) {
    const category = categories.find(c => c.id === store.currentCategory)
    if (category?.items) {
      const sub = category.items.find(s => s.id === store.currentSubCategory)
      if (sub) return sub.icon
    }
  }
  return '🎨'
})

const filteredTemplates = computed(() => {
  if (store.currentCategory === 'recommend') {
    return templates
  }
  
  if (store.currentSubCategory) {
    return getTemplatesByCategory(store.currentSubCategory)
  }
  
  const category = categories.find(c => c.id === store.currentCategory)
  if (category?.items) {
    const allIds = category.items.map(item => item.id)
    return templates.filter(t => allIds.includes(t.category))
  }
  
  return getTemplatesByCategory(store.currentCategory)
})

const styleFilteredTemplates = computed(() => {
  if (currentStyle.value === 'all') {
    return filteredTemplates.value
  }
  return filteredTemplates.value.filter(t => t.style === currentStyle.value)
})

const isFavorite = (templateId) => storeIsFavorite(templateId)

const getStyleName = (styleId) => {
  const style = templateStyles.find(s => s.id === styleId)
  return style?.name || '其他'
}

const getStyleColor = (styleId) => {
  const style = templateStyles.find(s => s.id === styleId)
  return style?.color || '#9333EA'
}

const getEffectName = (effectId) => {
  const effect = effects.find(e => e.id === effectId)
  return effect?.name || '特效'
}

const selectTemplate = (template) => {
  selectStoreTemplate(template)
  ElMessage.success(`已选择「${template.name}」`)
}

const toggleFavorite = (templateId) => {
  if (isFavorite(templateId)) {
    removeFromFavorites(templateId)
    ElMessage.info('已取消收藏')
  } else {
    addToFavorites(templateId)
    ElMessage.success('已添加到收藏')
  }
}
</script>

<style scoped>
.template-gallery {
  animation: fadeInUp 0.5s ease-out;
}

.gallery-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.gallery-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-color-primary);
}

.title-icon {
  font-size: 28px;
}

.gallery-stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--text-color-muted);
}

.style-filter {
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
}

.style-filter::-webkit-scrollbar {
  height: 4px;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-lg);
}

.template-card {
  position: relative;
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  border: 2px solid var(--card-border);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.template-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-float);
}

.template-card.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-alpha), var(--shadow-float);
}

.template-thumbnail {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.template-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.template-card:hover .template-thumbnail img {
  transform: scale(1.1);
}

.template-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--spacing-md);
}

.template-card:hover .template-overlay {
  opacity: 1;
}

.overlay-actions {
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.template-card:hover .overlay-actions {
  transform: translateY(0);
}

.overlay-btn {
  --el-button-bg-color: var(--primary-color);
  --el-button-border-color: var(--primary-color);
}

.template-badges {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  display: flex;
  gap: var(--spacing-xs);
}

.badge-tag {
  font-size: 10px;
  padding: 2px 6px;
}

.favorite-btn {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  --el-button-bg-color: var(--glass-bg);
  --el-button-border-color: var(--glass-border);
  backdrop-filter: blur(10px);
}

.template-info {
  padding: var(--spacing-md);
}

.template-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-sm);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.template-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.meta-tag {
  font-size: var(--font-size-xs);
  color: white;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.effect-indicator {
  font-size: 14px;
  animation: pulse 2s ease-in-out infinite;
}

.selected-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 20px var(--primary-alpha);
  animation: scaleIn 0.3s ease-out;
}

.empty-state {
  grid-column: 1 / -1;
  padding: var(--spacing-3xl);
}

@media (max-width: 768px) {
  .templates-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--spacing-md);
  }

  .gallery-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .template-info {
    padding: var(--spacing-sm);
  }

  .template-name {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .templates-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }
}
</style>
