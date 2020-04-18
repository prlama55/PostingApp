export interface AppCredential {
  accessToken: string
  email: string
  role: string
  name: string
  id: string
  businessUserId: string // app partner id
  hasBusiness: boolean
}
let appCredential: AppCredential = {
  accessToken: '',
  email: '',
  role: '',
  name: '',
  id: '',
  hasBusiness: false,
  businessUserId:''
}

export const setAppCredential = (credential: AppCredential) => {
  appCredential = credential
}

export const getAppCredential = () => {
  return appCredential
}
