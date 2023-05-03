import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface Info {
  id: number
  avatar: string
  nickname: string
  email: string
  phone: string
  birthday: string
  address: string
  hometown: string
  profession: string
  company: string
  introduction: string
  is_developer: boolean
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
      id: 0,
      avatar: 'https://weavatar.com/avatar/?d=mp',
      nickname: '未登录',
      email: '',
      phone: '',
      birthday: '',
      address: '',
      hometown: '',
      profession: '',
      company: '',
      introduction: '',
      is_developer: false,
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
