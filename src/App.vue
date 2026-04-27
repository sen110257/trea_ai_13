<template>
  <div class="app" :class="`theme-${store.theme}`">
    <ParticlesBackground :effects="store.currentCard.effects" />
    
    <HeaderNav />
    
    <main class="main-content">
      <CategoryNav />
      
      <div class="content-wrapper">
        <div class="templates-section">
          <TemplateGallery />
        </div>
        
        <div class="editor-section" v-if="store.selectedTemplate">
          <CardEditor />
        </div>
      </div>
    </main>
    
    <MaterialPanel />
    <HistoryPanel />
    <FavoritePanel />
    <ActionBar />
    
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { store, setTheme } from './store'
import HeaderNav from './components/HeaderNav.vue'
import CategoryNav from './components/CategoryNav.vue'
import TemplateGallery from './components/TemplateGallery.vue'
import CardEditor from './components/CardEditor.vue'
import MaterialPanel from './components/MaterialPanel.vue'
import HistoryPanel from './components/HistoryPanel.vue'
import FavoritePanel from './components/FavoritePanel.vue'
import ActionBar from './components/ActionBar.vue'
import Footer from './components/Footer.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'

onMounted(() => {
  setTheme(store.theme)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.main-content {
  padding-top: var(--header-height);
  padding-bottom: 80px;
  min-height: 100vh;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  padding: var(--spacing-md);
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.templates-section {
  animation: fadeInUp 0.5s ease-out;
}

.editor-section {
  animation: fadeInRight 0.5s ease-out;
}

@media (min-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: calc(var(--header-height) + 48px + 60px);
    padding-bottom: 100px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: calc(var(--header-height) + 48px + 60px);
  }
  
  .content-wrapper {
    padding: var(--spacing-sm);
    gap: var(--spacing-md);
  }
}
</style>
