import { defineStore } from 'pinia'
import type { UserState } from './helper'
import { defaultSetting, getLocalState, setLocalState } from './helper'
import { fetchUserInfo } from '@/api/user'

export const useUserStore = defineStore('user-store', {
  state: (): UserState => getLocalState(),
  actions: {
    freshUserInfo() {
      fetchUserInfo()
        .then((res) => {
          this.info = { ...this.info, ...res.data }
        })
        .catch((err) => {
          console.log(err)
        })
      this.recordState()
    },

    resetUserInfo() {
      this.info = { ...defaultSetting().info }
      this.recordState()
    },

    updateToken(token: string) {
      this.auth.token = token
      this.auth.login = true
      this.recordState()
    },

    clearToken() {
      this.auth.token = ''
      this.auth.login = false
      this.recordState()
    },

    recordState() {
      setLocalState(this.$state)
    }
  }
})
