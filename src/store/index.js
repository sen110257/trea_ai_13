import { reactive, watch } from 'vue'

const STORAGE_KEY = 'greeting_card_generator'

const defaultState = {
  theme: 'light',
  currentCategory: 'recommend',
  currentSubCategory: null,
  selectedTemplate: null,
  currentCard: {
    id: null,
    size: 'square',
    background: 'linear-gradient(135deg, #9333EA 0%, #EC4899 50%, #06B6D4 100%)',
    elements: [],
    effects: [],
    music: 'none',
    orientation: 'portrait'
  },
  favorites: [],
  history: [],
  showSidebar: true,
  showMaterialPanel: false,
  showHistoryPanel: false,
  showFavoritePanel: false,
  activeMaterialTab: 'stickers'
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...defaultState, ...parsed }
    }
  } catch (e) {
    console.error('Failed to load state:', e)
  }
  return defaultState
}

function saveState(state) {
  try {
    const toSave = {
      theme: state.theme,
      favorites: state.favorites,
      history: state.history
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch (e) {
    console.error('Failed to save state:', e)
  }
}

export const store = reactive(loadState())

watch(
  () => ({ theme: store.theme, favorites: store.favorites, history: store.history }),
  (newVal) => saveState(store),
  { deep: true }
)

export function toggleTheme() {
  store.theme = store.theme === 'light' ? 'dark' : 'light'
  document.documentElement.className = `theme-${store.theme}`
}

export function setTheme(theme) {
  store.theme = theme
  document.documentElement.className = `theme-${store.theme}`
}

export function setCategory(categoryId) {
  store.currentCategory = categoryId
  store.currentSubCategory = null
}

export function setSubCategory(subCategoryId) {
  store.currentSubCategory = subCategoryId
}

export function selectTemplate(template) {
  store.selectedTemplate = template
  if (template) {
    store.currentCard = {
      id: template.id + '_' + Date.now(),
      size: 'square',
      background: template.background.value,
      elements: JSON.parse(JSON.stringify(template.elements || [])),
      effects: [...(template.effects || [])],
      music: template.music || 'none',
      orientation: 'portrait'
    }
  }
}

export function updateCardElement(elementId, updates) {
  const element = store.currentCard.elements.find(el => el.id === elementId)
  if (element) {
    Object.assign(element, updates)
  }
}

export function addCardElement(element) {
  store.currentCard.elements.push({
    ...element,
    id: element.type + '_' + Date.now()
  })
}

export function removeCardElement(elementId) {
  const index = store.currentCard.elements.findIndex(el => el.id === elementId)
  if (index > -1) {
    store.currentCard.elements.splice(index, 1)
  }
}

export function updateCardBackground(background) {
  store.currentCard.background = background
}

export function updateCardEffects(effects) {
  store.currentCard.effects = effects
}

export function updateCardMusic(music) {
  store.currentCard.music = music
}

export function updateCardSize(sizeId) {
  store.currentCard.size = sizeId
}

export function toggleEffect(effectId) {
  const index = store.currentCard.effects.indexOf(effectId)
  if (index > -1) {
    store.currentCard.effects.splice(index, 1)
  } else {
    store.currentCard.effects.push(effectId)
  }
}

export function addToFavorites(templateId) {
  if (!store.favorites.includes(templateId)) {
    store.favorites.push(templateId)
  }
}

export function removeFromFavorites(templateId) {
  const index = store.favorites.indexOf(templateId)
  if (index > -1) {
    store.favorites.splice(index, 1)
  }
}

export function isFavorite(templateId) {
  return store.favorites.includes(templateId)
}

export function addToHistory(cardData) {
  const historyItem = {
    ...cardData,
    createdAt: new Date().toISOString(),
    id: 'history_' + Date.now()
  }
  store.history.unshift(historyItem)
  if (store.history.length > 50) {
    store.history.pop()
  }
}

export function clearHistory() {
  store.history = []
}

export function removeFromHistory(historyId) {
  const index = store.history.findIndex(h => h.id === historyId)
  if (index > -1) {
    store.history.splice(index, 1)
  }
}

export function toggleSidebar() {
  store.showSidebar = !store.showSidebar
}

export function setMaterialTab(tab) {
  store.activeMaterialTab = tab
  store.showMaterialPanel = true
}

export function toggleMaterialPanel() {
  store.showMaterialPanel = !store.showMaterialPanel
}

export function toggleHistoryPanel() {
  store.showHistoryPanel = !store.showHistoryPanel
  if (store.showHistoryPanel) {
    store.showFavoritePanel = false
    store.showMaterialPanel = false
  }
}

export function toggleFavoritePanel() {
  store.showFavoritePanel = !store.showFavoritePanel
  if (store.showFavoritePanel) {
    store.showHistoryPanel = false
    store.showMaterialPanel = false
  }
}

document.documentElement.className = `theme-${store.theme}`
