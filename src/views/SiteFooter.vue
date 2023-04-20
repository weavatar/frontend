<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <div class="footer-item">
          <img :src="logo" alt="weavatar" />
          <h4>WeAvatar 是xxxxx</h4>
          <NSpace>
            <NButton type="info" size="small">联系我们</NButton>
            <NButton type="info" size="small">加 QQ 群</NButton>
          </NSpace>
        </div>
      </div>
      <NGrid x-gap="12" cols="3" item-responsive responsive="screen">
        <NGridItem span="3 s:1">
          <div class="footer-nav">
            <div class="footer-item">
              <div class="footer-title">
                <h2>导航标题</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="">列表</a>
                  </li>
                  <li>
                    <a href="">列表</a>
                  </li>
                  <li>
                    <a href="">列表</a>
                  </li>

                  <li>
                    <a href="">列表</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </NGridItem>
        <NGridItem span="3 s:1">
          <div class="footer-nav">
            <div class="footer-item">
              <div class="footer-title">
                <h2>导航标题</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="">列表</a>
                  </li>
                  <li>
                    <a href="">列表</a>
                  </li>
                  <li>
                    <a href="">列表</a>
                  </li>

                  <li>
                    <a href="">列表</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </NGridItem>
        <NGridItem span="3 s:1">
          <div class="footer-nav">
            <div class="footer-item">
              <div class="footer-title">
                <h2>导航标题</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a href="">列表</a>
                  </li>
                  <li>
                    <a href="">列表</a>
                  </li>
                  <li>
                    <a href="">列表</a>
                  </li>

                  <li>
                    <a href="">列表</a>
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
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}

.footer-item img {
  width: 80%;
}
.footer-nav {
  width: 100%;
}
.footer-logo {
  width: 25%;
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
  }
}
</style>
