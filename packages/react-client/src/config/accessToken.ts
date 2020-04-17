export interface AppCredential {
  accessToken: string
  email: string
  role: string
  name: string
  id: string
}
let appCredential: AppCredential = {
  accessToken: '',
  email: '',
  role: '',
  name: '',
  id: ''
}

export const setAppCredential = (credential: AppCredential) => {
  appCredential = credential
}

export const getAppCredential = () => {
  return appCredential
}
