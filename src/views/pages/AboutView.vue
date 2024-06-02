<template>
  <div class="about">
    <NCard title="关于">
      <NH4>WeAvatar 的前生</NH4>
      <NText>
        WeAvatar 的立项可以追溯至 2022 年 3 月，彼时我们依然在为 LitePress 项目工作。
        <br />
        之后由于意见不合无法继续便开始着手筹备新项目，在随后的几个月里完成了 WeAvatar 域名及商标注册，2022 年 6 月下旬启动开发。于
        2022 年 7 月 25 日 Cravatar 成立 1 周年之际灰度上线。
        <br />
        由于琐事繁多加上仍对 LitePress 抱有期望， WeAvatar 在几个月内一直未能完善控制台抢占市场，算是一个最大的遗憾。
      </NText>
      <NDivider />
      <NH4>WeAvatar 的今世</NH4>
      <NText>
        2022 年 11 月，尝试接手 LitePress 项目未果后正式退出项目，随后不久完成 WeAvatar 初版控制台的开发。
        <br />
        2023 年 1 月，决定以 Golang 和 Vue 为主要开发语言进行 2.0 版本开发。
        <br />
        2023 年 4 月，缺乏维护的 LitePress 相关项目被打包出售，WeAvatar 开发开始提速。
        <br />
        2023 年 5 月，WeAvatar 2.0 上线，这是一个全新的版本，宣告着最完善的头像服务就此诞生。
        <br />
        2023 年 7 月 25 日，WeAvatar 度过首个生日。
        <br />
        2024 年 3 月，WeAvatar 日请求数达 500 万次。
      </NText>
      <NDivider />
      <NH4>WeAvatar 的未来</NH4>
      <NText>
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
        2024 年 6 月 1 日
      </div>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NDivider, NH4, NText } from 'naive-ui'
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
