export function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function downloadCanvas(canvas, filename = 'greeting-card.png') {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(resolve)
        .catch(reject)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        resolve()
      } catch (e) {
        reject(e)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  })
}

export function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function resizeImage(img, maxWidth = 1200, maxHeight = 1200) {
  const canvas = document.createElement('canvas')
  let width = img.width
  let height = img.height
  
  if (width > maxWidth) {
    height = (height * maxWidth) / width
    width = maxWidth
  }
  if (height > maxHeight) {
    width = (width * maxHeight) / height
    height = maxHeight
  }
  
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)
  
  return canvas
}

export function getRandomColor() {
  const colors = [
    '#9333EA', '#EC4899', '#06B6D4', '#EF4444', 
    '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start, end, t) {
  return start + (end - start) * t
}

export function easeOutQuad(t) {
  return t * (2 - t)
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function isValidImageFile(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  return validTypes.includes(file.type)
}

export function showToast(message, type = 'success', duration = 2000) {
  const toast = document.createElement('div')
  toast.className = `custom-toast toast-${type}`
  toast.textContent = message
  
  const style = document.createElement('style')
  style.textContent = `
    .custom-toast {
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }
    .custom-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .toast-success {
      background: linear-gradient(135deg, #10B981, #34D399);
      color: white;
    }
    .toast-error {
      background: linear-gradient(135deg, #EF4444, #F87171);
      color: white;
    }
    .toast-warning {
      background: linear-gradient(135deg, #F59E0B, #FBBF24);
      color: white;
    }
    .toast-info {
      background: linear-gradient(135deg, #3B82F6, #60A5FA);
      color: white;
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(toast)
  
  requestAnimationFrame(() => {
    toast.classList.add('show')
  })
  
  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => {
      document.body.removeChild(toast)
      document.head.removeChild(style)
    }, 300)
  }, duration)
}

export const toast = {
  success: (msg) => showToast(msg, 'success'),
  error: (msg) => showToast(msg, 'error'),
  warning: (msg) => showToast(msg, 'warning'),
  info: (msg) => showToast(msg, 'info')
}
