import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface Info {
  id: string
  avatar: string
  nickname: string
  real_name: boolean
  created_at: string
}

export interface Auth {
  token: string
  login: boolean
}

export interface UserState {
  info: Info
  auth: Auth
}

export function defaultSetting(): UserState {
  return {
    info: {
      id: '',
      avatar: 'https://weavatar.com/avatar/?d=mp',
      nickname: '未登录',
      real_name: false,
      created_at: ''
    },
    auth: {
      token: '',
      login: false
    }
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
