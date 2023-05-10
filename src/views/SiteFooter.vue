<template>
  <div class="footer">
    <div class="footer-content">
      <NGrid x-gap="12" cols="4" item-responsive responsive="screen">
        <NGridItem span="4 s:1">
          <div class="footer-logo">
            <div class="footer-item">
              <img :src="logo" alt="weavatar" />
              <hr />
              <p>致力于打造多端多元化的统一头像服务</p>
              <NSpace>
                <NButton type="info" @click="handleJoinGroup">联系我们</NButton>
                <NButton type="info" @click="handleJoinGroup">加 QQ 群</NButton>
              </NSpace>
            </div>
          </div>
        </NGridItem>
        <NGridItem span="4 s:1">
          <div class="footer-nav">
            <div class="footer-item">
              <div class="footer-title">
                <h2>WeAvatar</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <RouterLink :to="{ name: 'home' }">网站首页</RouterLink>
                  </li>
                  <li>
                    <RouterLink :to="{ name: 'user-avatar' }">头像管理</RouterLink>
                  </li>
                  <li>
                    <a target="_blank" href="https://stats.uptimerobot.com/EZnOgFlv29">服务状态</a>
                  </li>
                  <li>
                    <RouterLink :to="{ name: 'about' }">关于我们</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </NGridItem>
        <NGridItem span="4 s:1">
          <div class="footer-nav">
            <div class="footer-item">
              <div class="footer-title">
                <h2>WePublish</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a target="_blank" href="https://wepublish.cn/">社区论坛</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://wepublish.cn/">应用市场</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://wepublish.cn/">协同翻译</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://wepublish.cn/">帮助文档</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </NGridItem>
        <NGridItem span="4 s:1">
          <div class="footer-nav">
            <div class="footer-item">
              <div class="footer-title">
                <h2>耗子开源</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a target="_blank" href="https://github.com/HaoZi-Team/WP-China-Plus">
                      WP-China-Plus
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/HaoZi-Team/Panel"> Linux 面板 </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/HaoZi-Team/Laravel-Installer">
                      Laravel-Installer
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/HaoZi-Team/wp-setting-api">
                      WP-Setting-API
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </NGridItem>
      </NGrid>
    </div>
    <p class="copyright">
      Copyright &copy; 2022 - 2023 WeAvatar
      <a target="_blank" href="https://beian.miit.gov.cn">津ICP备2022009678号-2</a>
    </p>
    <p class="info">自豪地采用 Golang + Vue3 + Vite + Naive UI 驱动</p>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo-white.png'
import { NSpace, NButton, NGridItem, NGrid } from 'naive-ui'

const handleJoinGroup = () => {
  window.open('https://jq.qq.com/?_wv=1027&k=I1oJKSTH')
}
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 10px;
  z-index: 999;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.copyright,
.info {
  text-align: center;
}

.footer-content {
  max-width: 1440px;
  margin-right: auto;
  margin-left: auto;
}

.footer-item img {
  width: 80%;
}

.footer-nav {
  width: 100%;
  text-align: right;
}

.footer-logo {
  width: 100%;
}

.footer-logo,
.footer-nav {
  margin-top: 20px;
}

.footer-item {
  margin: 20px;
}

.footer-list ul {
  list-style: none;
  padding: 0;
}

.footer-list li {
  list-style: none;
  padding: 0;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
}

@media only screen and (max-width: 768px) {
  .footer-content {
    display: block;
  }

  .footer-logo,
  .footer-nav {
    width: 100%;
    text-align: left;
  }
}
</style>
