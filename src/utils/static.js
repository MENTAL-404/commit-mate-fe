export const URL = {
  logIn: '/',
  home: '/home',
  commits: '/commits',
  issues: '/issues',
  settings: '/settings',
  repos: '/repos',
  logOut: '/',
  todo: '/todo',
}

export const GITHUB_LOGIN =
  process.env.REACT_APP_PRD_AUTH ||
  'https://github.com/login/oauth/authorize?client_id=Ov23lifYg9wKiqtJvRsK&scope=repo,read:org'

export const BACK_TOKEN =
  process.env.REACT_APP_PRD_LOGIN ||
  'https://api.commitmate-dev.kro.kr/api/auth/github/callback'

export const SERVER_URL =
  process.env.REACT_APP_PRD_BE || 'https://api.commitmate-dev.kro.kr/api'

export const ORGANIZATION = 'MENTAL-404'

// export const ORGANIZATION = 'MENTAL-404'

export const getSelectedOrg = () => {
  return localStorage.getItem('selected_org') ?? null
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}

export const getHeader = () => {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
    'Content-Type': 'application/json',
  }
}

export const getSelectedRepo = () => {
  return localStorage.getItem('selected_repo') ?? null
}

export const API_URL = () => {
  return {
    pr: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/pulls`,
    todo: `${SERVER_URL}/todos?complete=`,
    todos: `${SERVER_URL}/todos`,
    logout: `${SERVER_URL}/auth/logout`,
    shortcurId: `${SERVER_URL}/shortcuts`,
    organization: `${SERVER_URL}/organizations`,
    organization_select: `${SERVER_URL}/v2/organizations`,
    aceess_token: `${SERVER_URL}/auth/github/callback?code=`,
    shortcut: `${SERVER_URL}/shortcuts/organization/${ORGANIZATION}`,
    repositories: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories`,
    issue_assignee: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/issues/status`,
    issue_state: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/issues/stats`,
    issue: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/issues`,
    commit_chart: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/chart`,
    commit_contribution: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/graph`,
    commit_message: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/wordcloud`,
    commit_rank: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/rank`,
    commit_total: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/all`,
    commit_king: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits/weekly/top`,
    commit_search: `${SERVER_URL}/organizations/${ORGANIZATION}/repositories/${getSelectedRepo()}/commits?search`,
  }
}
