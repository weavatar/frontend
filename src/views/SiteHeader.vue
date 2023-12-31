<template>
  <NLayoutHeader bordered class="nav">
    <NText tag="div" :depth="1">
      <NImage
        :src="logo"
        alt="logo"
        :height="32"
        preview-disabled
        @click="router.push({ name: 'home' })"
      />
    </NText>
    <div class="right">
      <div class="pc-menu">
        <NMenu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          :watch-props="['defaultValue']"
        />
      </div>
      <div class="nav-end">
        <NDropdown trigger="hover" :options="userOptions" @select="handleSelect">
          <NSpace>
            <NAvatar size="small" :src="userStore.info.avatar" />
            <NText>{{ userStore.info.nickname }}</NText>
          </NSpace>
        </NDropdown>
      </div>
      <div class="mobile-menu">
        <NDropdown trigger="click" :options="menuOptions" @select="handleSelect">
          <NIcon :component="MenuIcon" color="#2080f0" size="40" :depth="1" />
        </NDropdown>
      </div>
    </div>
    <div class="container">
      <div class="lantern-box">
        <div class="lantern-light">
          <div class="lantern-line"></div>
          <div class="lantern-circle">
            <div class="lantern-rect">
              <div class="lantern-text">新</div>
            </div>
          </div>
          <div class="lantern-tassel-top">
            <div class="lantern-tassel-middle"></div>
            <div class="lantern-tassel-bottom"></div>
          </div>
        </div>
      </div>
      <div class="lantern-box">
        <div class="lantern-light">
          <div class="lantern-line"></div>
          <div class="lantern-circle">
            <div class="lantern-rect">
              <div class="lantern-text">年</div>
            </div>
          </div>
          <div class="lantern-tassel-top">
            <div class="lantern-tassel-middle"></div>
            <div class="lantern-tassel-bottom"></div>
          </div>
        </div>
      </div>
      <div class="lantern-box">
        <div class="lantern-light">
          <div class="lantern-line"></div>
          <div class="lantern-circle">
            <div class="lantern-rect">
              <div class="lantern-text">快</div>
            </div>
          </div>
          <div class="lantern-tassel-top">
            <div class="lantern-tassel-middle"></div>
            <div class="lantern-tassel-bottom"></div>
          </div>
        </div>
      </div>
      <div class="lantern-box">
        <div class="lantern-light">
          <div class="lantern-line"></div>
          <div class="lantern-circle">
            <div class="lantern-rect">
              <div class="lantern-text">乐</div>
            </div>
          </div>
          <div class="lantern-tassel-top">
            <div class="lantern-tassel-middle"></div>
            <div class="lantern-tassel-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </NLayoutHeader>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed, h, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NAvatar, NDropdown, NIcon, NImage, NLayoutHeader, NMenu, NSpace, NText } from 'naive-ui'
import {
  DocumentTextOutline as DocumentTextIcon,
  HomeOutline as HomeIcon,
  InformationCircleOutline as InformationCircleIcon,
  LogInOutline as LoginIcon,
  Menu as MenuIcon,
  PersonCircleOutline as PersonCircleIcon
} from '@vicons/ionicons5'

import logo from '@/assets/logo.png'

import { useUserStore } from '@/stores'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 主菜单
const menuOptions = ref()
// 用户菜单
const userOptions = ref()

const activeKey = computed({
  get: () => {
    return route.name as string
  },
  set: (value) => {
    router.push({
      name: value
    })
  }
})

// 监听登录状态
watch(
  () => userStore.auth.login,
  (login) => {
    if (login) {
      useUserStore().freshUserInfo()
    } else {
      useUserStore().resetUserInfo()
    }
    menuOptions.value = [
      {
        label: '首页',
        key: 'home',
        icon: renderIcon(HomeIcon),
        show: true
      },
      {
        label: '登录',
        key: 'login',
        icon: renderIcon(LoginIcon),
        show: !login
      },
      {
        label: '头像管理',
        key: 'user-avatar',
        icon: renderIcon(PersonCircleIcon),
        show: login
      },
      {
        label: '文档',
        key: 'doc',
        icon: renderIcon(DocumentTextIcon),
        show: true
      },
      {
        label: '关于',
        key: 'about',
        icon: renderIcon(InformationCircleIcon),
        show: true
      }
    ]
    userOptions.value = [
      {
        label: '登录',
        key: 'login',
        show: !login
      },
      {
        label: '头像管理',
        key: 'user-avatar',
        show: login
      },
      {
        label: '我的资料',
        key: 'user-info',
        show: login
      },
      {
        label: '登出',
        key: 'logout',
        show: login
      }
    ]
  },
  { immediate: true }
)

function handleSelect(key: string): void {
  router.push({
    name: key
  })
}
</script>

<style scoped>
:deep(.n-space div:nth-child(1)) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.right {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.nav {
  padding: 10px 32px;
  position: fixed;
  top: 0;
  z-index: 1;
  display: grid;
  align-items: center;
  --side-padding: 32px;
  grid-template-columns: calc(272px - var(--side-padding)) 1fr auto;
}

.nav-end {
  display: flex;
  align-items: center;
}

.pc-menu {
  display: flex;
  align-items: center;
}

.mobile-menu {
  display: none;
}

@media screen and (max-width: 768px) {
  .right {
    justify-content: flex-end;
  }

  .pc-menu {
    display: none;
  }

  .mobile-menu {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  :deep(.n-menu-item-content-header) {
    display: none;
  }

  :deep(.n-space div:nth-child(2)) {
    display: none;
  }
}

.lantern-box {
  position: fixed;
  pointer-events: none;
  transform: scale(0.5);
  top: -60px !important;
}
.lantern-light {
  position: relative;
  width: 120px;
  height: 90px;
  background-color: #d8000f;
  margin: 50px;
  border-radius: 50%;
  box-shadow: -5px 5px 50px 4px #fa6c00;
  animation: swing 3s infinite ease-in-out;
}
.lantern-light::before,
.lantern-light::after {
  content: '';
  position: absolute;
  border: 1px solid #dc8f03;
  width: 60px;
  height: 12px;
  background: linear-gradient(to right, #dc8f03, #ffa500, #dc8f03, #ffa500, #dc8f03);
  margin-left: 20px;
  left: 10px;
}
.lantern-light::before {
  top: -7px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.lantern-light::after {
  bottom: -7px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.lantern-line {
  width: 2px;
  height: 50px;
  background-color: #dc8f03;
  position: absolute;
  top: -50px;
  left: 60px;
}
.lantern-circle,
.lantern-rect {
  height: 90px;
  border-radius: 50%;
  border: 2px solid #dc8f03;
  background-color: rgba(216, 0, 15, 0.1);
}
.lantern-circle {
  width: 100px;
  margin: 12px 8px 8px 10px;
}
.lantern-rect {
  margin: -2px 8px 8px 26px;
  width: 45px;
}
.lantern-text {
  font:
    bold 2rem / 85px 'Franklin Gothic Medium',
    'Arial Narrow',
    Arial,
    sans-serif;
  text-align: center;
  color: #dc8f03;
}
.lantern-tassel-top {
  width: 5px;
  height: 20px;
  background-color: #ffa500;
  border-radius: 0 0 5px 5px;
  position: relative;
  margin: -5px 0 0 59px;
  animation: swing 3s infinite ease-in-out;
}
.lantern-tassel-middle,
.lantern-tassel-bottom {
  position: absolute;
  width: 10px;
  left: -2px;
}
.lantern-tassel-middle {
  border-radius: 50%;
  top: 14px;
  height: 10px;
  background-color: #dc8f03;
  z-index: 2;
}
.lantern-tassel-bottom {
  background-color: #ffa500;
  border-bottom-left-radius: 5px;
  height: 35px;
  top: 18px;
  z-index: 1;
}
@keyframes swing {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
.container .lantern-box:first-child {
  left: 60px;
  top: -30px;
}
.container .lantern-box:nth-child(2) {
  left: 160px;
  top: -25px;
}
.container .lantern-box:nth-child(3) {
  right: 160px;
  top: -28px;
}
.container .lantern-box:last-child {
  right: 60px;
  top: -26px;
}

@media screen and (max-width: 768px) {
  .container {
    display: none;
  }
}
</style>
