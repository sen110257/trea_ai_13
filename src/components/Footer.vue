<template>
  <footer class="footer" v-if="false">
    <div class="footer-content">
      <div class="footer-logo">
        <span class="logo-icon">🎨</span>
        <span class="logo-text">节日贺卡生成器</span>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4 class="group-title">关于我们</h4>
          <a href="#" class="link-item">产品介绍</a>
          <a href="#" class="link-item">使用帮助</a>
          <a href="#" class="link-item">意见反馈</a>
        </div>
        
        <div class="link-group">
          <h4 class="group-title">更多服务</h4>
          <a href="#" class="link-item">模板商城</a>
          <a href="#" class="link-item">VIP会员</a>
          <a href="#" class="link-item">联系我们</a>
        </div>
        
        <div class="link-group">
          <h4 class="group-title">关注我们</h4>
          <div class="social-links">
            <a href="#" class="social-link" title="微信">
              <el-icon><ChatDotRound /></el-icon>
            </a>
            <a href="#" class="social-link" title="微博">
              <el-icon><Share /></el-icon>
            </a>
            <a href="#" class="social-link" title="抖音">
              <el-icon><VideoPlay /></el-icon>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          <p>© 2024 节日贺卡生成器 Greeting Card Creator</p>
          <p class="copyright-sub">所有模板仅供个人使用，请勿用于商业用途</p>
        </div>
        
        <div class="legal-links">
          <a href="#" class="legal-link">隐私政策</a>
          <span class="divider">|</span>
          <a href="#" class="legal-link">用户协议</a>
          <span class="divider">|</span>
          <a href="#" class="legal-link">服务条款</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ChatDotRound, Share, VideoPlay } from '@element-plus/icons-vue'
</script>

<style scoped>
.footer {
  background: var(--card-bg);
  border-top: 1px solid var(--card-border);
  margin-top: auto;
}

.footer-content {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-md);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.logo-icon {
  font-size: 32px;
}

.logo-text {
  font-size: var(--font-size-lg);
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--border-light);
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.group-title {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--text-color-primary);
  margin-bottom: var(--spacing-xs);
}

.link-item {
  font-size: var(--font-size-sm);
  color: var(--text-color-muted);
  transition: color 0.3s ease;
}

.link-item:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
}

.social-link {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-color-secondary);
  font-size: var(--font-size-base);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.copyright {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.copyright p {
  font-size: var(--font-size-sm);
  color: var(--text-color-muted);
}

.copyright-sub {
  font-size: var(--font-size-xs) !important;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-xs);
}

.legal-link {
  color: var(--text-color-muted);
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: var(--primary-color);
}

.divider {
  color: var(--border-color);
}

@media (max-width: 768px) {
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .legal-links {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
