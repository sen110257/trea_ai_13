<template>
  <transition name="slide-up">
    <div 
      class="favorite-panel" 
      v-show="store.showFavoritePanel"
      @click.self="closePanel"
    >
      <div class="panel-content">
        <div class="panel-header">
          <h3 class="panel-title">
            <el-icon><StarFilled /></el-icon>
            我的收藏
            <el-badge :value="store.favorites.length" class="count-badge" />
          </h3>
          <el-button 
            circle 
            size="small" 
            icon="Close" 
            @click="closePanel"
            class="close-btn"
          />
        </div>
        
        <div class="panel-body">
          <div class="favorite-grid" v-if="favoriteTemplates.length > 0">
            <div
              v-for="template in favoriteTemplates"
              :key="template.id"
              class="favorite-item card-hover"
              @click="useTemplate(template)"
            >
              <div class="item-thumbnail">
                <img :src="template.thumbnail" :alt="template.name" />
                
                <div class="item-overlay">
                  <el-button
                    type="primary"
                    size="small"
                    icon="Plus"
                    class="overlay-btn"
                    @click.stop="useTemplate(template)"
                  >
                    使用
                  </el-button>
                </div>
                
                <el-button
                  class="remove-btn"
                  type="danger"
                  circle
                  size="small"
                  icon="Delete"
                  @click.stop="removeFavorite(template.id)"
                />
              </div>
              
              <div class="item-info">
                <h4 class="item-name">{{ template.name }}</h4>
                <div class="item-tags">
                  <el-tag
                    v-if="template.isHot"
                    type="danger"
                    size="small"
                    effect="dark"
                  >
                    热门
                  </el-tag>
                  <el-tag
                    v-if="template.isNew"
                    type="success"
                    size="small"
                    effect="dark"
                  >
                    新品
                  </el-tag>
                  <span class="effect-count" v-if="template.effects?.length">
                    ✨ {{ template.effects.length }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="empty-state" v-else>
            <el-empty description="暂无收藏">
              <template #image>
                <el-icon class="empty-icon"><StarFilled /></el-icon>
              </template>
              <template #description>
                <p>你还没有收藏任何模板</p>
                <p class="empty-hint">点击模板卡片上的星标即可收藏</p>
              </template>
            </el-empty>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store, removeFromFavorites, selectTemplate } from '../store'
import { getTemplateById } from '../data/templates'
import { StarFilled, Delete, Plus } from '@element-plus/icons-vue'

const closePanel = () => {
  store.showFavoritePanel = false
}

const favoriteTemplates = computed(() => {
  return store.favorites
    .map(id => getTemplateById(id))
    .filter(t => t)
})

const useTemplate = (template) => {
  selectTemplate(template)
  closePanel()
  ElMessage.success(`已选择「${template.name}」`)
}

const removeFavorite = (templateId) => {
  ElMessageBox.confirm(
    '确定要取消收藏这个模板吗？',
    '确认取消',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    removeFromFavorites(templateId)
    ElMessage.info('已取消收藏')
  }).catch(() => {})
}
</script>

<style scoped>
.favorite-panel {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.panel-content {
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-float);
  display: flex;
  flex-direction: column;
  animation: scaleIn 0.3s ease-out;
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

.count-badge {
  --el-badge-bg-color: var(--primary-color);
}

.close-btn {
  --el-button-bg-color: var(--btn-secondary-bg);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.favorite-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.favorite-item {
  position: relative;
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--card-border);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-item:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-float);
}

.item-thumbnail {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--bg-tertiary);
}

.item-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.favorite-item:hover .item-thumbnail img {
  transform: scale(1.1);
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--spacing-md);
}

.favorite-item:hover .item-overlay {
  opacity: 1;
}

.overlay-btn {
  --el-button-bg-color: var(--primary-color);
  --el-button-border-color: var(--primary-color);
}

.remove-btn {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.favorite-item:hover .remove-btn {
  opacity: 1;
}

.item-info {
  padding: var(--spacing-sm);
}

.item-name {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-tags {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.effect-count {
  font-size: var(--font-size-xs);
  color: var(--text-color-muted);
}

.empty-state {
  padding: var(--spacing-3xl);
  text-align: center;
  grid-column: 1 / -1;
}

.empty-icon {
  font-size: 48px;
  color: var(--text-color-muted);
}

.empty-hint {
  color: var(--text-color-muted);
  margin-top: var(--spacing-sm);
}

@media (max-width: 768px) {
  .favorite-panel {
    align-items: flex-end;
  }
  
  .panel-content {
    max-width: 100%;
    max-height: 85vh;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
  
  .favorite-grid {
    grid-template-columns: 1fr;
  }
  
  .remove-btn {
    opacity: 1;
  }
}
</style>
