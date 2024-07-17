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
  'https://github.com/login/oauth/authorize?client_id=Ov23li30j1Gx1R7YUbl5&scope=repo,read:orgs'

export const BACK_TOKEN =
  'https://api.commitmate-dev.kro.kr/api/auth/github/callback'

export const SERVER_URL = 'https://api.commitmate-dev.kro.kr/api'

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
