<template>
  <div class="help">
    <NCard title="帮助">
      <NCollapse>
        <NCollapseItem title="WeAvatar 是什么？" name="1">
          <div>
            WeAvatar 完美兼容所有 Gravatar 头像 API 接口，同时如果你未在 WeAvatar
            设置头像，则会先尝试调用 Gravatar 上的头像数据，其后是 QQ
            头像，最后会返回我们为你准备的一组默认头像。
          </div>
        </NCollapseItem>
        <NCollapseItem title=">为什么我的头像是红色的 WeAvatar 标志？" name="2">
          <div>
            为了符合有关法律规定要求，WeAvatar 上的全部头像均会进行 AI 检测，您的头像被 AI
            判定违规。如果您认为这是误报，请与我们联系。
          </div>
        </NCollapseItem>
        <NCollapseItem title="WeAvatar 所支持的额外功能？" name="3">
          <div>
            WeAvatar
            目前支持手机号调用头像，方式同邮箱。计划下个大版本更新为不同App设置自定义头像功能。
          </div>
        </NCollapseItem>
        <NCollapseItem title="这里没有我的问题，需要寻求而外帮助" name="4">
          <div>
            请加群交流，项目 QQ 群：<a
              target="_blank"
              href="https://jq.qq.com/?_wv=1027&amp;k=I1oJKSTH"
              >12370907</a
            >
          </div>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NCollapse, NCollapseItem } from 'naive-ui'
</script>

<style scoped>
.help {
  padding: 100px;
}

@media screen and (max-width: 719px) {
  .help {
    padding: 100px 0 100px 0;
  }
}
</style>
