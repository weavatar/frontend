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
</style>
