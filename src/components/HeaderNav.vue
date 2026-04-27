<template>
  <header class="header-nav">
    <div class="header-content">
      <div class="logo-section" @click="goHome">
        <span class="logo-icon">🎨</span>
        <div class="logo-text">
          <h1 class="logo-title">节日贺卡生成器</h1>
          <p class="logo-subtitle">Greeting Card Creator</p>
        </div>
      </div>
      
      <div class="search-section" v-if="!isMobile">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索模板、节日、场景..."
          prefix-icon="Search"
          class="search-input"
          @keyup.enter="handleSearch"
          @clear="clearSearch"
          clearable
        />
      </div>
      
      <div class="actions-section">
        <el-button
          class="action-btn mobile-menu-btn"
          :icon="isMobile ? 'Menu' : null"
          circle
          @click="toggleMobileMenu"
          v-if="isMobile"
        />
        
        <div class="action-buttons" :class="{ 'mobile-menu-open': mobileMenuOpen }">
          <el-button
            class="action-btn"
            :icon="store.theme === 'dark' ? 'Sunny' : 'Moon'"
            circle
            @click="toggleTheme"
          />
          
          <el-button
            class="action-btn"
            :icon="isFavorite ? 'Star' : 'StarFilled'"
            circle
            @click="toggleFavoritePanel"
          >
            <el-badge :value="store.favorites.length" :hidden="store.favorites.length === 0" class="badge" />
          </el-button>
          
          <el-button
            class="action-btn"
            icon="Clock"
            circle
            @click="toggleHistoryPanel"
          />
        </div>
      </div>
    </div>
    
    <div class="mobile-search" v-if="isMobile">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索模板..."
        prefix-icon="Search"
        size="small"
        @keyup.enter="handleSearch"
        @clear="clearSearch"
        clearable
      />
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { store, toggleTheme, toggleHistoryPanel, toggleFavoritePanel } from '../store'
import { searchTemplates } from '../data/templates'

const searchKeyword = ref('')
const isMobile = ref(false)
const mobileMenuOpen = ref(false)

const isFavorite = computed(() => store.selectedTemplate && store.favorites.includes(store.selectedTemplate.id))

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleSearch = () => {
  if (!searchKeyword.value.trim()) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  
  const results = searchTemplates(searchKeyword.value)
  if (results.length === 0) {
    ElMessage.info('未找到相关模板')
    return
  }
  
  ElMessage.success(`找到 ${results.length} 个相关模板`)
}

const clearSearch = () => {
  searchKeyword.value = ''
}

const goHome = () => {
  store.currentCategory = 'recommend'
  store.currentSubCategory = null
  store.selectedTemplate = null
  mobileMenuOpen.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo-section:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 32px;
  animation: float 3s ease-in-out infinite;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.logo-subtitle {
  font-size: var(--font-size-xs);
  color: var(--text-color-muted);
  line-height: 1.2;
}

.search-section {
  flex: 1;
  max-width: 400px;
  margin: 0 var(--spacing-lg);
}

.search-input {
  --el-input-bg-color: var(--input-bg);
  --el-input-border-color: var(--input-border);
  --el-input-hover-border-color: var(--primary-color);
  --el-input-focus-border-color: var(--primary-color);
}

.actions-section {
  position: relative;
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.action-btn {
  --el-button-bg-color: var(--btn-secondary-bg);
  --el-button-border-color: var(--border-color);
  --el-button-text-color: var(--text-color-secondary);
  --el-button-hover-bg-color: var(--primary-color);
  --el-button-hover-border-color: var(--primary-color);
  --el-button-hover-text-color: white;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.badge {
  --el-badge-bg-color: var(--primary-color);
}

.mobile-search {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  display: none;
}

.mobile-menu-btn {
  display: none;
}

@media (max-width: 768px) {
  .header-nav {
    height: auto;
    min-height: var(--header-height);
  }

  .logo-title {
    font-size: var(--font-size-base);
  }

  .logo-subtitle {
    display: none;
  }

  .search-section {
    display: none;
  }

  .mobile-search {
    display: block;
  }

  .action-buttons {
    position: fixed;
    top: var(--header-height);
    right: 0;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    padding: var(--spacing-sm);
    border-radius: var(--radius-lg) 0 0 var(--radius-lg);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    flex-direction: column;
    z-index: 999;
  }

  .action-buttons.mobile-menu-open {
    transform: translateX(0);
  }

  .mobile-menu-btn {
    display: inline-flex;
  }
}
</style>
