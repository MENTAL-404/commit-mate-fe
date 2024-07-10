export const URL = {
  logIn: '/',
  home: '/home',
  commits: '/commits',
  issues: '/issues',
  settings: '/settings',
  logOut: '/',
}

export const GITHUB_LOGIN =
  'https://github.com/login/oauth/authorize?client_id=Ov23lifYg9wKiqtJvRsK&scope=repo'

export const BACK_TOKEN =
  'https://api.commitmate-dev.kro.kr/api/auth/github/callback'

export const SERVER_URL = 'https://api.commitmate-dev.kro.kr/api'

export const ORGANIZATION = 'MENTAL-404'

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const AUTH_HEADER = {
  Authorization: `Bearer ${getAccessToken()}`,
  'Content-Type': 'application/json',
}

export const getSelectedRepo = () => {
  return localStorage.getItem('selected_repo')
}
