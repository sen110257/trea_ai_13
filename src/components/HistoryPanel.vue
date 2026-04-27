<template>
  <transition name="slide-up">
    <div 
      class="history-panel" 
      v-show="store.showHistoryPanel"
      @click.self="closePanel"
    >
      <div class="panel-content">
        <div class="panel-header">
          <h3 class="panel-title">
            <el-icon><Clock /></el-icon>
            历史记录
          </h3>
          <div class="header-actions">
            <el-button 
              size="small" 
              type="danger"
              :disabled="store.history.length === 0"
              @click="clearHistory"
            >
              清空历史
            </el-button>
            <el-button 
              circle 
              size="small" 
              icon="Close" 
              @click="closePanel"
              class="close-btn"
            />
          </div>
        </div>
        
        <div class="panel-body">
          <div class="history-list" v-if="store.history.length > 0">
            <div
              v-for="item in store.history"
              :key="item.id"
              class="history-item"
            >
              <div class="item-preview" :style="{ background: item.background }">
                <span class="preview-icon">🎨</span>
              </div>
              
              <div class="item-info">
                <div class="item-title">{{ getTemplateName(item.id) }}</div>
                <div class="item-meta">
                  <span class="meta-time">{{ formatDate(item.createdAt) }}</span>
                  <span class="meta-effects" v-if="item.effects?.length">
                    {{ item.effects.length }} 个特效
                  </span>
                </div>
              </div>
              
              <div class="item-actions">
                <el-button 
                  size="small" 
                  icon="Edit" 
                  @click="editItem(item)"
                >
                  编辑
                </el-button>
                <el-button 
                  size="small" 
                  type="danger"
                  icon="Delete" 
                  @click="removeItem(item.id)"
                />
              </div>
            </div>
          </div>
          
          <div class="empty-state" v-else>
            <el-empty description="暂无历史记录">
              <template #image>
                <el-icon class="empty-icon"><Clock /></el-icon>
              </template>
              <template #description>
                <p>你还没有制作过贺卡</p>
                <p class="empty-hint">选择一个模板开始创作吧！</p>
              </template>
            </el-empty>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { store, removeFromHistory, clearHistory as clearStoreHistory } from '../store'
import { getTemplateById } from '../data/templates'
import { formatDate } from '../utils'
import { Clock, Edit, Delete } from '@element-plus/icons-vue'

const closePanel = () => {
  store.showHistoryPanel = false
}

const getTemplateName = (id) => {
  const template = getTemplateById(id?.replace(/_\d+$/, ''))
  return template?.name || '自定义贺卡'
}

const editItem = (item) => {
  ElMessage.info('编辑功能开发中...')
}

const removeItem = (id) => {
  ElMessageBox.confirm(
    '确定要删除这条历史记录吗？',
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    removeFromHistory(id)
    ElMessage.success('已删除')
  }).catch(() => {})
}

const clearHistory = () => {
  ElMessageBox.confirm(
    '确定要清空所有历史记录吗？此操作不可恢复。',
    '确认清空',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    clearStoreHistory()
    ElMessage.success('历史记录已清空')
  }).catch(() => {})
}
</script>

<style scoped>
.history-panel {
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
  max-width: 500px;
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

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.close-btn {
  --el-button-bg-color: var(--btn-secondary-bg);
}

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.history-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.history-item:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-soft);
}

.item-preview {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.preview-icon {
  font-size: 28px;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-xs);
  color: var(--text-color-muted);
}

.meta-time,
.meta-effects {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.item-actions {
  display: flex;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.empty-state {
  padding: var(--spacing-3xl);
  text-align: center;
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
  .history-panel {
    align-items: flex-end;
  }
  
  .panel-content {
    max-width: 100%;
    max-height: 85vh;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
  
  .history-item {
    flex-wrap: wrap;
  }
  
  .item-actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: var(--spacing-sm);
    padding-top: var(--spacing-sm);
    border-top: 1px solid var(--border-light);
  }
}
</style>
