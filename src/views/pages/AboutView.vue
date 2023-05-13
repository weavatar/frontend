<template>
  <div class="about">
    <NCard title="关于">
      <NDivider />
      <NH4>WeAvatar 的前生</NH4>
      <NText>
        <NBlockquote> WeAvatar 本不应该存在，它的身世亦充满坎坷。 </NBlockquote>
        <br />
        时间回溯至 2022 年 3 月，彼时的我还是 LitePress 和 Cravatar
        的团队成员之一，和团长在平台重构的意见上存在分歧。
        <br />
        最终，讨论决定新开一个项目，以 WeAvatar 为名，Cravatar 通过页面广告等方式引流。
        <br />
        随后的几个月里 WeAvatar 完成了域名及商标注册，2022 年 6 月下旬启动开发。于 2022 年 7 月 25
        日 Cravatar 成立 1 周年之际灰度上线。
        <br />
        但是好景不长，随着 LitePress
        的开发日渐趋于停滞，加上与团长之间的分歧加剧，上述引流计划也因此夭折。
        <br />
        由于琐事繁多加上躺平， WeAvatar 在几个月内一直未完成控制台的开发，算是一个最大的遗憾。
      </NText>
      <NDivider />
      <NH4>WeAvatar 的今世</NH4>
      <NText>
        <NBlockquote>
          今天的 WeAvatar 是目前国内最完善的头像服务，同时仍在快速迭代升级中。
        </NBlockquote>
        <br />
        2022 年 11 月，与团长的关系正式破裂，我决定退出 LitePress 相关项目。
        <br />
        随后组建了现在的开发小组，一夜之间完成了 WeAvatar 控制台的开发，WeAvatar 1.0 正式上线。
        <br />
        由于琐事繁多，这之后又是一段时间的平静，直到 2023 年 1 月，决定以 Golang 为主要开发语言进行
        2.0 版本开发。
        <br />
        在 2.0 开发期间，由于方向选择失误，重复造轮子以及反复切换框架导致开发进度缓慢，直到 2023 年
        4 月，最终确定以 Golang + Vue 进行开发。
        <br />
        2023 年 4 月是忙碌的一个月，在这个月里，WeAvatar 2.0
        的开发进度飞快，几乎每天都有新功能上线，感谢开发小组的努力以及向 WeAvatar
        提出不少建议的首批用户。
        <br />
        2023 年的五一假期，重构后的 WeAvatar 2.0
        正式上线，这是一个里程碑式的版本，宣告着国内最完善的头像服务的诞生。
      </NText>
      <NDivider />
      <NH4>WeAvatar 的未来</NH4>
      <NText>
        <NBlockquote> WeAvatar 的未来充满无限可能，它将打造多端多元化的统一头像服务。 </NBlockquote>
        <br />
        WeAvatar 的目标市场不仅仅是网站，它将尝试进入 桌面App 、 移动App 、小程序 等领域。
        <br />
        路虽远行则将至，事虽难做则必成。期待 WeAvatar 的未来更加精彩！
      </NText>
      <NDivider />
      未完待续
      <div style="float: right">
        <br />
        耗子
        <br />
        2023 年 5 月 13 日
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NH4, NText, NDivider, NBlockquote } from 'naive-ui'
</script>

<style scoped>
.about {
  padding: 100px;
}

@media screen and (max-width: 719px) {
  .about {
    padding: 100px 0 100px 0;
  }
}
</style>
