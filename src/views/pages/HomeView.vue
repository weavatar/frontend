<template>
  <main>
    <div class="home">
      <h1>WeAvatar</h1>
      <p>每个人的头像</p>
    </div>
    <!-- 产品介绍 -->

    <div class="product">
      <div class="product-title">
        <h2>为什么选择 WeAvatar</h2>
        <span>WeAvatar 是 Gravatar 的完美替代方案，相比原版 Gravatar 具有以下优势</span>
      </div>
      <div class="product-content">
        <NGrid x-gap="12" cols="3" item-responsive responsive="screen">
          <NGridItem span="3 s:1">
            <div class="product-content-p">
              <img src="https://weavatar.com/avatar/?d=letter&letter=H" alt="多级头像匹配" />
              <h3>多级头像匹配</h3>
              <p>
                除WeAvatar上传的头像外，还同时支持从Gravatar、QQ进行默认头像获取，尽可能保证每次请求都能得到有效的头像返回
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p">
              <img src="https://weavatar.com/avatar/?d=letter&letter=H" alt="手机号头像" />
              <h3>手机号头像</h3>
              <p>WeAvatar支持为你的手机号上传对应的头像，网站可通过手机号的哈希值获取对应的头像</p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p">
              <img src="https://weavatar.com/avatar/?d=letter&letter=H" alt="WEBP自适应" />
              <h3>WEBP自适应</h3>
              <p>
                WeAvatar通过判断请求的Accept头，自动为支持WEBP的设备返回WEBP格式的头像，这可减少约80%的流量消耗
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p">
              <img src="https://weavatar.com/avatar/?d=letter&letter=H" alt="安全" />
              <h3>安全</h3>
              <p>
                WeAvatar通过对接AI图片审核服务，对每张头像均进行自动化审核，确保不会有违规内容出现
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p">
              <img src="https://weavatar.com/avatar/?d=letter&letter=H" alt="更快的速度" />
              <h3>更快的速度</h3>
              <p>
                WeAvatar后端使用Golang开发，天生具有无与伦比的速度优势。同时WeAvatar拥有多级缓存机制，尽可能提高头像的使用体验
              </p>
            </div>
          </NGridItem>
          <NGridItem span="3 s:1">
            <div class="product-content-p">
              <img src="https://weavatar.com/avatar/?d=letter&letter=H" alt="开放平台" />
              <h3>开放平台（开发中）</h3>
              <p>WeAvatar开放平台支持自己的应用无缝对接WeAvatar，提供配套的SDK供开发者使用</p>
            </div>
          </NGridItem>
        </NGrid>
      </div>
    </div>
    <!-- 赞助商 -->
    <div class="sponsor">
      <div class="sponsor-title">
        <h2>我们的赞助商</h2>
        <span>作为公益性质的项目，WeAvatar的成长离不开它们的帮助</span>
      </div>
      <div class="sponsor-content">
        <NGrid x-gap="12" cols="2" item-responsive responsive="screen">
          <NGridItem span="2 s:1">
            <a class="url" target="_blank" href="https://www.ddunyun.com/aff/PNYAXMKI">
              <img
                src="https://img-cdn.haozi.xyz/2022/12/09/54a1b368700423a992789eca4af8b7e2.jpg"
                alt="盾云安全"
              />
            </a>
          </NGridItem>
          <NGridItem span="2 s:1">
            <a class="url" target="_blank" href="https://www.jihulab.com/">
              <img
                src="https://www.jihulab.com/images/icons/logos/logo-121-75.svg"
                alt="极狐GitLab"
              />
            </a>
          </NGridItem>
        </NGrid>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NGrid, NGridItem } from 'naive-ui'
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
}

.home h1 {
  font-size: 8vh;
}

.home p {
  font-size: 4vh;
}

.product {
  background: #66ccff;
  padding-top: 80px;
}

.sponsor {
  padding-bottom: 100px;
}

.product-title,
.sponsor-title {
  text-align: center;
  margin: 50px;
}

.product-content {
  flex-wrap: wrap;
}

.sponsor-content img {
  box-shadow: 0 0 10px 5px #eeeeee;
}

.sponsor-content .url {
  margin-top: 20px;
}

.sponsor-content {
  max-width: 800px;
  margin: 0 auto;
}

.product-content,
.sponsor-content ul {
  display: flex;
}

.product-content,
.sponsor-content ul {
  justify-content: center;
}

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

/*.product-content-p img {
  padding: 50px;
  margin: 10px;
  background: rgb(3 169 244 / 59%);
  border-radius: 100px;
}*/

.sponsor-content img {
  padding: 20px;
  width: 240px;
  height: 100px;
}

@media only screen and (max-width: 768px) {
  .product-content,
  .sponsor-content ul {
    flex-wrap: wrap;
  }

  .product-content-p {
    width: 100%;
  }
}
</style>