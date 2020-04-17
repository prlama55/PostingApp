export interface AppCredential {
  accessToken: string
  email: string
  role: string
  name: string
  id: string
  hasBusiness: boolean
}
let appCredential: AppCredential = {
  accessToken: '',
  email: '',
  role: '',
  name: '',
  id: '',
  hasBusiness: false
}

export const setAppCredential = (credential: AppCredential) => {
  appCredential = credential
}

export const getAppCredential = () => {
  return appCredential
}
