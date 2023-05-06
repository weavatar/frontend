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
      <h1>WeAvatar</h1>
      <p>每个人的头像</p>
      <span>
        我们昨天共卑微地响应了
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
                WeAvatar 除上传的头像外，还支持从 Gravatar、QQ
                进行默认头像获取，尽可能确保每次请求都能得到有效的头像返回
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
              <h2>WEBP 自适应</h2>
              <p>
                WeAvatar 通过判断请求的 Accept 头，自动为支持 WEBP 的设备返回 WEBP
                格式的头像，这可减少约 80% 的流量消耗
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
                WeAvatar 后端使用 Golang 开发，具有无与伦比的速度优势。同时 WeAvatar
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
        <NGrid x-gap="12" cols="4" item-responsive responsive="screen">
          <NGridItem span="4 s:1" v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://www.ilxtx.com/">
              <NImage
                src="https://img-cdn.haozi.xyz/2023/05/06/79604f30163a61113dd2c1b4bc356f5d.png"
                alt="龙笑天下"
                height="60"
                width="240"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem span="4 s:1" v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://github.com/mirai-mamori/Sakurairo">
              <NImage
                src="https://img-cdn.haozi.xyz/2023/05/06/50d03b2516a1305af371877095c7444e.png"
                alt="Sakurairo"
                height="60"
                width="240"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem span="4 s:1" v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://hzbk.net/">
              <NImage
                src="https://img-cdn.haozi.xyz/2019/12/08/823ba0e9886920ebd4d4e97b0f407162.png"
                alt="耗子博客"
                height="60"
                width="240"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem span="4 s:1" v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="http://www.seoyh.net/">
              <NImage
                src="https://img-cdn.haozi.xyz/2023/05/06/bf62c7776043081ecf05596211e5177c.png"
                alt="一点优化"
                height="60"
                width="240"
                lazy
                preview-disabled
              />
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
        <NGrid x-gap="12" cols="2" item-responsive responsive="screen">
          <NGridItem span="6 s:1" v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://www.ddunyun.com/aff/PNYAXMKI">
              <NImage
                src="https://img-cdn.haozi.xyz/2022/12/09/54a1b368700423a992789eca4af8b7e2.jpg"
                alt="盾云安全"
                height="60"
                width="240"
                lazy
                preview-disabled
              />
            </a>
          </NGridItem>
          <NGridItem span="6 s:1" v-motion-slide-visible-bottom>
            <a class="url" target="_blank" href="https://www.jihulab.com/">
              <NImage
                src="https://www.jihulab.com/images/icons/logos/logo-121-75.svg"
                alt="极狐GitLab"
                height="60"
                width="240"
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
import { NGrid, NGridItem, NIcon, NTag, NNumberAnimation, NImage, NDivider } from 'naive-ui'
import type { NumberAnimationInst } from 'naive-ui'

import {
  AlbumsOutline as AlbumsIcon,
  IdCardOutline as IdCardIcon,
  ImageOutline as ImageIcon,
  ShieldCheckmarkOutline as ShieldCheckmarkIcon,
  SpeedometerOutline as SpeedometerIcon,
  CloudOutline as CloudOutlineIcon
} from '@vicons/ionicons5'
import { nextTick, ref } from 'vue'
import { fetchCdnUsage } from '@/api/system'

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
  background-image: url(../../assets/home-cover.jpg);
  background-size: cover;
  background-position: center center;
}

.home h1 {
  font-size: 8rem;
  letter-spacing: 1rem;
  color: white;
}

.home p {
  font-size: 4rem;
  letter-spacing: 0.5rem;
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

@media only screen and (max-width: 768px) {
  .home h1 {
    font-size: 4rem;
    line-height: 120%;
    letter-spacing: 0.2rem;
    color: white;
  }

  .home p {
    font-size: 2rem;
    letter-spacing: 0.4rem;
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
</style>
