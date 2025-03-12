<template>
  <div class="footer">
    <div class="footer-content">
      <NGrid x-gap="12" cols="4" item-responsive responsive="screen">
        <NGridItem span="4 s:1">
          <div class="footer-logo">
            <div class="footer-item">
              <img :src="logo" alt="weavatar" />
              <hr />
              <p>WeAvatar 是注册商标，受国家有关法律保护</p>
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
                    <a target="_blank" href="https://status.haozi.net">服务状态</a>
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
                <h2>相关项目</h2>
              </div>
              <div class="footer-list">
                <ul>
                  <li>
                    <a target="_blank" href="https://account.haozi.net/">耗子通行证</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://tom.moe/">Moe Tom</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://twikoo.js.org/">Twikoo</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://artalk.js.org/">Artalk</a>
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
                    <a target="_blank" href="https://github.com/tnb-labs/wp-china-plus">
                      WP-China-Plus
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/tnb-labs/panel"> Linux 面板 </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/tnb-labs/LaravelInstaller">
                      LaravelInstaller
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/tnb-labs/wp-setting-api">
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
    <p class="copyright">Copyright &copy; 2022 - 2024 WeAvatar All Rights Reserved.</p>
    <p class="beian" style="display: flex; justify-content: center; align-items: center">
      <a target="_blank" href="https://beian.miit.gov.cn" rel="noreferrer">津ICP备2022009678号-2</a>
      <NImage
        :src="beian_gongan"
        width="16"
        alt="备案图标"
        lazy
        preview-disabled
        style="padding-left: 10px"
      />
      <a
        target="_blank"
        href="https://beian.mps.gov.cn/#/query/webSearch?code=12011502000847"
        rel="noreferrer"
        style="padding-left: 4px"
      >
        津公网安备12011502000847号
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { NButton, NGrid, NGridItem, NImage, NSpace } from 'naive-ui'
import logo from '@/assets/logo-white.png'
import beian_gongan from '@/assets/beian-gongan.png'

const handleJoinGroup = () => {
  window.open('https://jq.qq.com/?_wv=1027&k=I1oJKSTH')
}
</script>

<style scoped>
.footer {
  margin-top: auto;
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.footer a {
  color: #fff;
  text-decoration: none;
}

.copyright,
.beian {
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
  margin: 14px 0;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 768px) {
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
