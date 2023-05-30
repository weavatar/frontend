<template>
  <main>
    <div
      class="home"
      v-motion
      :initial="{
        opacity: 0
      }"
      :enter="{
        opacity: 1,
        transition: {
          duration: 1500
        }
      }"
    >
      <h2>
        WeAvatar
        <span style="display: inline-block; vertical-align: middle">
          <NTag type="warning"> 2.0 </NTag>
        </span>
      </h2>
      <h1>多端多元化的统一头像服务</h1>
      <p>WeAvatar — 每个人的头像</p>
      <div class="home-button">
        <NButton type="info" size="large" round @click="handleStartUse">
          <template #icon>
            <NIcon>
              <RocketIcon />
            </NIcon>
          </template>
          开始使用
        </NButton>
      </div>
      <span>
        我们昨天共响应了
        <NTag :bordered="false" size="small">
          <NNumberAnimation
            ref="usageRef"
            :from="0"
            :to="usage"
            :active="false"
            :duration="3000"
            show-separator
          />
        </NTag>
        次请求
      </span>
    </div>

    <!-- 产品介绍 -->
    <div class="product">
      <div class="product-title" v-motion-slide-visible-bottom>
        <h1>为什么选择 WeAvatar</h1>
        <span>WeAvatar 可作为增强版的 Gravatar，相比原版 Gravatar 具有以下优势</span>
      </div>
      <div class="product-content">
        <NGrid x-gap="12" cols="3" item-responsive responsive="screen">
          <NGridItem span="3 s:1">
            <div class="product-content-p" v-motion-slide-visible-bottom>
              <NIcon size="60">
                <AlbumsIcon />
              </NIcon>
              <h2>多级头像匹配</h2>
              <p>
                WeAvatar 除用户上传的头像外 ，同时支持从 Gravatar、QQ 获取头像，这可为
                <b>70%</b>
                以上的请求提供准确的头像
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p" v-motion-slide-visible-bottom>
              <NIcon size="60">
                <IdCardIcon />
              </NIcon>
              <h2>手机号、字母头像</h2>
              <p>
                WeAvatar
                首家支持手机号头像及字母默认头像，手机号头像更符合国内用户的使用习惯，字母头像可为没有头像的用户提供更好的体验
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p" v-motion-slide-visible-bottom>
              <NIcon size="60">
                <ImageIcon />
              </NIcon>
              <h2>WEBP 支持</h2>
              <p>
                WeAvatar 支持新一代图片格式 WEBP 且默认返回 WEBP 格式的头像，这可减少约
                <b>80%</b>
                的流量消耗
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p" v-motion-slide-visible-bottom>
              <NIcon size="60">
                <ShieldCheckmarkIcon />
              </NIcon>
              <h2>安全</h2>
              <p>WeAvatar 对每张头像均进行 AI 自动化审核，确保不会有违规内容被输出</p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p" v-motion-slide-visible-bottom>
              <NIcon size="60">
                <SpeedometerIcon />
              </NIcon>
              <h2>更快的速度</h2>
              <p>
                WeAvatar 使用 GO 开发，具有无与伦比的速度优势。同时 WeAvatar
                拥有多级缓存机制，以尽可能提高头像的加载速度
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p" v-motion-slide-visible-bottom>
              <NIcon size="60">
                <CloudOutlineIcon />
              </NIcon>
              <h2>开放平台（开发中）</h2>
              <p>WeAvatar 开放平台支持自己的应用无缝对接 WeAvatar，提供配套的 SDK 供开发者使用</p>
            </div>
          </NGridItem>
        </NGrid>
      </div>
    </div>

    <!-- 使用者 -->
    <div class="user">
      <div class="user-title" v-motion-slide-visible-bottom>
        <h1>他们都在用</h1>
        <span>一些你可能认识的人也在使用 WeAvatar，不妨来试试？</span>
      </div>
      <div class="user-content">
        <NGrid cols="1 s:3 m:4 l:5 xl:5 2xl:5" item-responsive responsive="screen">
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://www.ilxtx.com/">
              <NImage
                :src="logo_lxtx"
                alt="龙笑天下"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://github.com/mirai-mamori/Sakurairo">
              <NImage
                :src="logo_iro"
                alt="Sakurairo"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://hzbk.net/">
              <NImage
                :src="logo_hzbk"
                alt="耗子博客"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="http://www.seoyh.net/">
              <NImage
                :src="logo_ydyh"
                alt="一点优化"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://jq.qq.com/?_wv=1027&k=I1oJKSTH">
              <NImage :src="logo_up" alt="我要上榜" height="80" width="180" lazy preview-disabled />
            </a>
          </NGridItem>
        </NGrid>
      </div>
    </div>

    <NDivider />

    <!-- 赞助商 -->
    <div class="sponsor">
      <div class="sponsor-title" v-motion-slide-visible-bottom>
        <h1>我们的赞助商</h1>
        <span>作为公益性质的项目，WeAvatar 的稳定运行离不开它们的帮助</span>
      </div>
      <div class="sponsor-content">
        <NGrid cols="1 s:3 m:3 l:3 xl:3 2xl:3" item-responsive responsive="screen">
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://www.ddunyun.com/aff/PNYAXMKI">
              <NImage
                :src="logo_dunyun"
                alt="盾云安全"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem v-motion-slide-visible-bottom>
            <a
              class="url"
              target="_blank"
              href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
            >
              <NImage
                :src="logo_upyun"
                alt="又拍云"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://www.jihulab.com/">
              <NImage
                :src="logo_jihu"
                alt="极狐GitLab"
                height="80"
                width="180"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
        </NGrid>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {
  NGrid,
  NGridItem,
  NIcon,
  NTag,
  NNumberAnimation,
  NImage,
  NDivider,
  NButton
} from 'naive-ui'
import type { NumberAnimationInst } from 'naive-ui'

import {
  AlbumsOutline as AlbumsIcon,
  IdCardOutline as IdCardIcon,
  ImageOutline as ImageIcon,
  ShieldCheckmarkOutline as ShieldCheckmarkIcon,
  SpeedometerOutline as SpeedometerIcon,
  CloudOutline as CloudOutlineIcon,
  RocketOutline as RocketIcon
} from '@vicons/ionicons5'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCdnUsage } from '@/api/system'
import logo_dunyun from '@/assets/logo-dunyun.png'
import logo_upyun from '@/assets/logo-upyun.png'
import logo_jihu from '@/assets/logo-jihu.svg'
import logo_hzbk from '@/assets/logo-hzbk.png'
import logo_ydyh from '@/assets/logo-ydyh.png'
import logo_iro from '@/assets/logo-iro.png'
import logo_lxtx from '@/assets/logo-lxtx.png'
import logo_up from '@/assets/logo-up.png'

const router = useRouter()
const usage = ref(0)
const usageRef = ref<NumberAnimationInst | null>(null)

fetchCdnUsage()
  .then((res) => {
    usage.value = res.data.usage
    nextTick(() => {
      usageRef.value?.play()
    })
  })
  .catch((err) => {
    if (err.code != 422) {
      window.$message.error(err.message)
    }
    console.log(err)
  })

const handleStartUse = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped>
.url {
  display: block;
  width: 100%;
  text-align: center;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/home-background.jpg');
  background-size: cover;
  background-position: center center;
}

.home:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6));
  z-index: -1;
}

.home h2 {
  font-size: 2rem;
  letter-spacing: 0.2rem;
  color: white;
}

.home h1 {
  font-size: 4rem;
  line-height: 0;
  letter-spacing: 1rem;
  color: white;
}

.home .home-button {
  padding: 20px;
}

.home p {
  font-size: 2rem;
  letter-spacing: 0.1rem;
  color: white;
}

.home span {
  font-size: 1rem;
  letter-spacing: 0.2rem;
  color: white;
}

.product {
  background: #f1f4f8;
  padding-top: 80px;
}

.user,
.sponsor {
  padding-bottom: 100px;
}

.product-title,
.user-title,
.sponsor-title {
  text-align: center;
  margin: 50px;
}

.product-content {
  flex-wrap: wrap;
  padding: 0 240px;
}

.user-content .url,
.sponsor-content .url {
  margin-top: 20px;
}

.user-content,
.sponsor-content {
  margin: 0 auto;
}

.product-content,
.user-content ul,
.sponsor-content ul {
  display: flex;
}

.product-content,
.user-content ul,
.sponsor-content ul {
  justify-content: center;
}

.user-content li,
.sponsor-content li {
  list-style: none;
}

.product-content-p {
  width: 100%;
  padding: 15px;
  margin: 40px 0;
  box-sizing: border-box;
  text-align: center;
}

.product-content-p :deep(.n-icon) {
  padding: 50px;
  margin: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  border: 1px solid rgb(84 120 160 / 20%);
}

.n-image {
  box-shadow: 0 0 10px 5px #eeeeee;
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .home h2 {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    color: white;
  }

  .home h1 {
    font-size: 1.6rem;
    line-height: 40%;
    letter-spacing: 0.2rem;
  }

  .home p {
    font-size: 1rem;
    letter-spacing: 0.1rem;
    color: white;
  }

  .home span {
    font-size: 0.5rem;
    letter-spacing: 0.1rem;
  }

  .product-content,
  .user-content ul,
  .sponsor-content ul {
    flex-wrap: wrap;
    padding: 10px;
  }

  .product-content-p {
    width: 100%;
  }
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .home h2 {
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
    color: white;
  }

  .home h1 {
    font-size: 2.5rem;
    line-height: 120%;
    letter-spacing: 0.2rem;
  }

  .home p {
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    color: white;
  }

  .home span {
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
  }

  .product-content,
  .user-content ul,
  .sponsor-content ul {
    flex-wrap: wrap;
    padding: 10px;
  }

  .product-content-p {
    width: 100%;
  }
}

@media screen and (min-width: 1024px) {
  :deep(.home-button .n-button) {
    padding: 30px;
  }
}
</style>
