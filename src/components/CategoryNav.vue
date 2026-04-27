<template>
  <div class="category-nav">
    <div class="category-container">
      <div 
        class="category-scroll"
        ref="scrollRef"
      >
        <div class="category-tabs">
          <div
            v-for="category in categories"
            :key="category.id"
            class="category-tab"
            :class="{ 
              active: store.currentCategory === category.id,
              hasSub: category.items && category.items.length > 0
            }"
            @click="selectCategory(category)"
          >
            <span class="category-icon">
              <span class="category-emoji" v-if="categoryEmoji[category.id]">
                {{ categoryEmoji[category.id] }}
              </span>
              <span v-else class="category-emoji">{{ category.name.charAt(0) }}</span>
            </span>
            <span class="category-name">{{ category.name }}</span>
          </div>
        </div>
      </div>
      
      <div 
        class="sub-category-scroll"
        v-if="currentCategoryWithSub && store.currentSubCategory"
        ref="subScrollRef"
      >
        <div class="sub-category-tabs">
          <div
            v-for="sub in currentCategoryWithSub.items"
            :key="sub.id"
            class="sub-category-tab"
            :class="{ active: store.currentSubCategory === sub.id }"
            @click="selectSubCategory(sub)"
          >
            <span class="sub-category-emoji">{{ sub.icon }}</span>
            <span class="sub-category-name">{{ sub.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { store, setCategory, setSubCategory } from '../store'
import { categories } from '../data/categories'

const scrollRef = ref(null)
const subScrollRef = ref(null)

const categoryEmoji = {
  recommend: '🎨',
  traditional: '🏮',
  legal: '📄',
  solar: '⏰',
  life: '🏠',
  wishes: '💬'
}

const currentCategoryWithSub = computed(() => {
  return categories.find(cat => cat.id === store.currentCategory && cat.items && cat.items.length > 0)
})

const selectCategory = (category) => {
  if (category.items && category.items.length > 0) {
    setCategory(category.id)
    setSubCategory(category.items[0].id)
  } else {
    setCategory(category.id)
    setSubCategory(null)
  }
}

const selectSubCategory = (sub) => {
  setSubCategory(sub.id)
}

const scrollToActive = async () => {
  await nextTick()
  
  if (scrollRef.value) {
    const activeTab = scrollRef.value.querySelector('.category-tab.active')
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
  
  if (subScrollRef.value) {
    const activeSubTab = subScrollRef.value.querySelector('.sub-category-tab.active')
    if (activeSubTab) {
      activeSubTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
}

watch(() => store.currentCategory, scrollToActive)
watch(() => store.currentSubCategory, scrollToActive)

onMounted(() => {
  scrollToActive()
})
</script>

<style scoped>
.category-nav {
  position: sticky;
  top: var(--header-height);
  z-index: 900;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
}

.category-container {
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.category-scroll,
.sub-category-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroll::-webkit-scrollbar,
.sub-category-scroll::-webkit-scrollbar {
  display: none;
}

.category-tabs {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  min-width: max-content;
}

.category-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  position: relative;
}

.category-tab:hover {
  background: var(--bg-hover);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.category-tab.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-primary);
}

.category-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-emoji {
  font-size: 20px;
}

.category-tab.active .category-emoji {
  color: white;
}

.category-name {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--text-color-secondary);
  white-space: nowrap;
}

.category-tab.active .category-name {
  color: white;
}

.sub-category-tabs {
  display: flex;
  gap: var(--spacing-xs);
  padding: 0 var(--spacing-md) var(--spacing-sm);
  min-width: max-content;
}

.sub-category-tab {
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
}

.sub-category-tab:hover {
  background: var(--bg-hover);
  border-color: var(--primary-color);
}

.sub-category-tab.active {
  background: var(--primary-alpha);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.sub-category-emoji {
  font-size: 14px;
}

.sub-category-name {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--text-color-secondary);
}

.sub-category-tab.active .sub-category-name {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .category-nav {
    position: fixed;
    top: calc(var(--header-height) + 48px);
    left: 0;
    right: 0;
  }

  .category-tab {
    min-width: 64px;
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .category-emoji {
    font-size: 18px;
  }

  .category-name {
    font-size: 10px;
    padding: 0 2px;
  }

  .sub-category-tab {
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  .sub-category-name {
    font-size: 11px;
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .category-tab {
    min-width: 56px;
    padding: 4px 8px;
  }

  .category-emoji {
    font-size: 16px;
  }

  .category-name {
    font-size: 9px;
  }

  .category-tabs {
    gap: 4px;
    padding: 8px 12px;
  }

  .sub-category-tabs {
    gap: 4px;
    padding: 0 12px 8px;
  }

  .sub-category-tab {
    padding: 4px 8px;
    gap: 2px;
  }

  .sub-category-emoji {
    font-size: 12px;
  }

  .sub-category-name {
    font-size: 10px;
  }
}
</style>
