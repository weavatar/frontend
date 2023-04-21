<template>
  <NLayoutHeader bordered class="nav" :style="style">
    <NText tag="div" class="ui-logo" :depth="1">
      <img :src="logo" alt="logo" />
    </NText>
    <div class="right">
      <div :style="{ display: 'flex', alignItems: 'center' }">
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
    </div>
  </NLayoutHeader>
</template>

<script setup lang="ts">
import { h, computed, watch, ref } from 'vue'
import type { Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NMenu, NIcon, NText, NAvatar, NSpace, NDropdown, NLayoutHeader } from 'naive-ui'
import {
  HomeOutline as HomeIcon,
  LogInOutline as LoginIcon,
  PersonAddOutline as SignupIcon
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
        label: '注册',
        key: 'register',
        icon: renderIcon(SignupIcon),
        show: !login
      }
    ]
    userOptions.value = [
      {
        label: '登录',
        key: 'login',
        show: !login
      },
      {
        label: '注册',
        key: 'register',
        show: !login
      },
      {
        label: '我的通行证',
        key: 'profile',
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

const style = computed(() => {
  return {
    '--side-padding': '32px',
    'grid-template-columns': 'calc(272px - var(--side-padding)) 1fr auto'
  }
})
</script>

<style scoped>
@media screen and (max-width: 719px) {
  .nav {
    display: flex !important;
    flex-flow: column !important;
  }

  :deep(.n-menu-item-content-header) {
    display: none;
  }

  :deep(.n-space div:nth-child(2)) {
    display: none;
  }
}

.nav {
  padding: 10px 32px !important;
  position: fixed;
  top: 0;
  z-index: 1;
}

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
  display: grid;
  align-items: center;
  padding: 0 32px;
}

.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.ui-logo > img {
  margin-right: 12px;
  height: 42px;
  width: 232px;
}

.nav-end {
  display: flex;
  align-items: center;
}
</style>
