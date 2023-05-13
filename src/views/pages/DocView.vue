<template>
  <div class="doc">
    <NCard title="文档">
      <NCollapse>
        <NCollapseItem title="基本概念" name="1">
          <div>
            <p>
              WeAvatar 头像服务可以像普通的图片 URL
              一样请求，具体格式是：https://weavatar.com/avatar/HASH
            </p>
            <p>
              其中 HASH 部分是 邮箱/手机号 的 MD5 哈希值，此电子邮箱/手机号必须在 weavatar.com
              上添加头像，否则会尝试返回 Gravatar 头像和 QQ 头像，如果都不存在，则返回默认头像。
            </p>
          </div>
        </NCollapseItem>
        <NCollapseItem title="在 CMS 中使用 WeAvatar" name="2">
          <div>
            <p>对于常见的 CMS 系统，可通过以下方式轻松地接入 WeAvatar。</p>
            <ul>
              <li>
                <b>WordPress : </b>
                <br />
                安装启用
                <a target="_blank" href="https://github.com/HaoZi-Team/WP-China-Plus">
                  WP-China-Plus
                </a>
                插件
              </li>
              <li>
                <b>Typecho : </b>
                <br />
                添加
                <NCode
                  code="define('__TYPECHO_GRAVATAR_PREFIX__', 'https://weavatar.com/avatar/');"
                  language="php"
                  inline
                />
                到站点根目录的 <NCode code="config.inc.php" inline /> 中
              </li>
              <li>
                <b>Emlog : </b>
                <br />
                <b>Pro之前(5.x 6.x民间): </b> 通过修改
                <NText code>include/lib/function.base.php</NText>
                中
                <NText code>getGravatar</NText>
                函数中的
                <NText code>http://www.gravatar.com</NText>
                为
                <NText code>https://weavatar.com</NText>
                接入 WeAvatar，你可以参考下方 额外的参数 部分来修改默认头像
                <br />
                <b>Pro之后(2.x): </b> 修改
                <NText code>include/lib/common.php</NText>
                中
                <NText code>getGravatar</NText>
                函数中的
                <NText code>cravatar.cn</NText>
                为
                <NText code>weavatar.com</NText>
                接入 WeAvatar，你可以参考下方 <b>额外的参数</b> 部分来修改默认头像
              </li>
              <li>
                <b>Z-Blog : </b>
                <br />
                后台应用中心搜索 "WeAvatar" 安装插件或前往
                <a target="_blank" href="https://app.zblogcn.com/?id=38455">
                  https://app.zblogcn.com/?id=38455
                </a>
                下载插件并手动安装
              </li>
              <li><b>Discuz : </b>待更新</li>
              <li><b>Flarum : </b>待更新</li>
            </ul>
          </div>
        </NCollapseItem>
        <NCollapseItem title="邮箱 / 手机号的哈希方法" name="3">
          <div>
            <ul>
              <li>去除首位两边的空格</li>
              <li>所有字母转小写</li>
              <li>计算 MD5 值</li>
            </ul>
          </div>
        </NCollapseItem>
        <NCollapseItem title="指定图片格式" name="4">
          <div>
            <p>我们当前支持五种图片返回格式，分别是：jpg、jpeg、png、gif、webp。</p>
            <p>
              你可以简单的通过向图片访问 URL 拼接文件后缀的方式来访问特定格式的图片，完整的请求 URL
              类似如下：
            </p>
            <p>https://weavatar.com/avatar/ff3dcd55b299b96db5e2ed195af50817.jpg</p>
          </div>
        </NCollapseItem>
        <NCollapseItem title="额外的参数" name="5">
          <div>
            <h3><b>调整头像大小</b></h3>
            <p>
              默认情况下，我们会返回 80×80 尺寸的头像，但是你可以通过 <code>s</code> 或
              <code>size</code> 参数来指定要获取的头像大小
            </p>
            <hr />
            <h3><b>自定义默认头像</b></h3>
            <p>
              如果你提供的哈希无法匹配到任何头像，则将会返回我们的默认头像。
              <br />
              <NImage
                src="https://weavatar.com/avatar/?f=y&s=60"
                alt="默认头像"
                width="60"
                height="60"
              />
              <br />
              当然，你也可以通过
              <code>d</code> 或 <code>default</code> 参数指定需要返回的默认头像：
            </p>
            <p>https://weavatar.com/avatar/ff3dcd55b299b96db5e2ed195af50817.jpg?d=你的URL</p>
            <p>需要注意的是，传递的默认头像地址必须经过 URL 编码。</p>
            <p>
              除了允许你自己指定默认头像外，我们还准备了一组内置的默认头像，只需要传入
              <code>d=默认头像ID</code> 即可调用：
            </p>
            <ul>
              <li><code>d=404</code>：返回 404 错误</li>
              <li><code>d=mp</code>：一个简单的卡通风格的人物轮廓</li>
              <li><code>d=identicon</code>：一个几何图案（随机生成）</li>
              <li><code>d=monsterid</code>：具有不同颜色、面孔的 "人头" 1（随机生成）</li>
              <li><code>d=wavatar</code>：具有不同特征和背景的人脸（随机生成）</li>
              <li><code>d=retro</code>：8位色的像素人脸（随机生成）</li>
              <li><code>d=robohash</code>：具有不同颜色、面孔的 "人头" 2（随机生成）</li>
              <li>
                <code>d=letter&letter=X</code>：返回给定 letter 组成的字母头像（最多支持 4
                位，自动裁切）
              </li>
              <li><code>d=blank</code>：返回一个透明的 PNG 图片</li>
            </ul>
            <NSpace>
              <NImage
                src="https://weavatar.com/avatar/?d=mp&f=y&s=60"
                alt="人物轮廓"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/?d=identicon&f=y&s=60"
                alt="几何图案"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/?d=monsterid&f=y&s=60"
                alt="人头1"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/?d=wavatar&f=y&s=60"
                alt="人脸"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/?d=retro&f=y&s=60"
                alt="像素人脸"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/?d=robohash&f=y&s=60"
                alt="人头2"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/demo?d=letter&letter=WeAvatar&f=y&s=60"
                alt="字母头像"
                width="60"
                height="60"
              />
              <NImage
                src="https://weavatar.com/avatar/?d=blank&f=y&s=60"
                alt="透明图片"
                width="60"
                height="60"
              />
            </NSpace>
            <p>为方便演示，以上图片均通过 CSS 添加了边框</p>
            <hr />
            <h3><b>强制加载默认头像</b></h3>
            <p>
              如果由于某种原因你想强制始终返回默认头像，您可以使用 <code>f</code> 或
              <code>forcedefault</code> 参数并将其值设置为 <code>y</code>。
            </p>
            <hr />
            <h3><b>指定要显示的头像级别</b></h3>
            <p>为符合中国法律要求，该参数暂不提供支持。</p>
            <hr />
            <h3><b>组合参数</b></h3>
            <p>
              以上所介绍的所有关于 WeAvatar 的参数都可以自由组合，比如你可以提供这样的一个头像URL：
            </p>
            <p>
              https://weavatar.com/avatar/ff3dcd55b299b96db5e2ed195af50817.png?d=letter&letter=WeAvatar&s=200&f=y
            </p>
            <p>以上头像URL将始终返回格式为 png、尺寸为 200 的字母头像，字母自动裁切为 WeAv。</p>
          </div>
        </NCollapseItem>
      </NCollapse>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NCode, NText, NCollapse, NCollapseItem, NSpace, NImage } from 'naive-ui'
</script>

<style scoped>
.doc {
  padding: 100px;
}

a {
  text-decoration: none;
  color: #409eff;
}

.n-image {
  border: 1px solid black;
}

@media screen and (max-width: 719px) {
  .doc {
    padding: 100px 0 100px 0;
  }
}
</style>
