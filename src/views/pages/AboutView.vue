<template>
  <div class="about">
    <NCard title="关于">
      <NH4>WeAvatar 的前生</NH4>
      <NText>
        WeAvatar 的立项可以追溯至 2022 年 3 月，彼时依然在为 LitePress 相关项目工作。
        <br />
        由于意见不合无法继续，便开始着手筹备新项目，随后的几个月里完成了 WeAvatar
        域名及商标注册，2022 年 6 月下旬启动开发。于 2022 年 7 月 25 日 Cravatar 成立 1
        周年之际灰度上线。
        <br />
        由于琐事繁多加上仍对 LitePress 抱有期望， WeAvatar
        在几个月内一直未能完善控制台抢占市场，算是一个最大的遗憾。
      </NText>
      <NDivider />
      <NH4>WeAvatar 的今世</NH4>
      <NText>
        2022 年 11 月，LitePress
        原团队有了新的发展方向，不再继续维护、建设该项目，尝试接手项目，但提出的发展模式未被采纳，于是正式退出日渐落寞的
        LitePress 相关项目。
        <br />
        随后组建了新的开发小组，完成了控制台的开发，WeAvatar 1.0 正式上线。
        <br />
        2023 年 1 月，决定以 Golang 为主要开发语言进行 2.0 版本开发。
        <br />
        2023 年 4 月，缺乏维护的 LitePress
        相关项目被打包转交其他公司，但仍未能稳定维护。可见当初的决定多么正确。
        <br />
        2023 年五一假期，WeAvatar 2.0 上线，这是一个里程碑式的版本，宣告着最完善的头像服务就此诞生。
        <br />
        2023 年 7 月 25 日，WeAvatar 度过了她的首个生日。
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
        2023 年 8 月 4 日 更
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
