<template>
  <div class="avatar">
    <NCard title="头像管理">
      <NDataTable :columns="columns" :data="data" :loading="loading" :row-key="(row) => row.id" />
      <NCard :bordered="false">
        <NButton
          type="primary"
          size="large"
          style="display: block; margin-left: auto; margin-right: auto"
        >
          上传头像
        </NButton>
      </NCard>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { NCard, NButton, NDataTable, NPopconfirm } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { h, ref } from 'vue'
import { fetchAvatarList, deleteAvatar } from '@/api/avatar'

interface Avatar {
  hash: string
  raw: string
  user_id: number
  ban: boolean
  check: boolean
  created_at: string
  updated_at: string
}

const loading = ref(false)
const data = ref([] as Avatar[])

fetchAvatarList()
  .then((res) => {
    data.value = res.data as Avatar[]
    loading.value = false
  })
  .catch((res) => {
    window.$message.error(res.message)
    loading.value = false
  })

const columns: DataTableColumns<Avatar> = [
  {
    title: '头像',
    key: 'hash',
    render({ hash }) {
      return h('img', {
        src: `https://weavatar.com/avatar/${hash}?s=50&t=` + new Date().getTime(),
        style: {
          borderRadius: '10%'
        }
      })
    }
  },
  {
    title: '地址',
    key: 'raw'
  },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    render(row) {
      let actions = []
      actions.push(
        h(
          NButton,
          {
            style: {
              marginRight: '16px'
            },
            strong: true,
            size: 'small',
            type: 'info',
            onClick: () => {
              console.log(row)
            }
          },
          { default: () => '修改图片' }
        )
      )
      actions.push(
        h(
          NPopconfirm,
          {
            onPositiveClick: () => handleAvatarDelete(row.hash),
            onNegativeClick: () => {
              window.$message.info('取消删除')
            }
          },
          {
            default: () => {
              return '确定删除头像吗？'
            },
            trigger: () => {
              return h(
                NButton,
                {
                  strong: true,
                  size: 'small',
                  type: 'error'
                },
                { default: () => '删除头像' }
              )
            }
          }
        )
      )
      return actions
    }
  }
]

const handleAvatarDelete = (hash: string) => {
  deleteAvatar(hash)
    .then((res) => {
      window.$message.success(res.message)
      fetchAvatarList()
        .then((res) => {
          data.value = res.data as Avatar[]
          loading.value = false
        })
        .catch((res) => {
          window.$message.error(res.message)
          loading.value = false
        })
    })
    .catch((res) => {
      window.$message.error(res.message)
    })
}
</script>

<style scoped>
.avatar {
  padding: 100px;
}
</style>
