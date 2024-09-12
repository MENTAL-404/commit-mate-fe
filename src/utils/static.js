export const URL = {
  logIn: '/',
  home: '/home',
  commits: '/commits',
  issues: '/issues',
  settings: '/settings',
  repos: '/repos',
  orgs: '/organizations',
  logOut: '/',
  todo: '/todo',
}

export const GITHUB_LOGIN = process.env.REACT_APP_PRD_AUTH 

export const BACK_TOKEN = process.env.REACT_APP_PRD_LOGIN 

export const SERVER_URL = process.env.REACT_APP_PRD_BE 

export const getSelectedOrg = () => {
  const selectedOrg = localStorage.getItem('selected_org')
  if (selectedOrg) {
    try {
      return JSON.parse(selectedOrg)
    } catch (error) {
      console.error('JSON 파싱 에러:', error)
      return null
    }
  }
  return null
}

export const getSelectedOrgId = () => {
  const selectedOrg = getSelectedOrg()
  return selectedOrg ? selectedOrg.id : null
}

export const getSelectedOrgName = () => {
  const selectedOrg = getSelectedOrg()
  return selectedOrg ? selectedOrg.name : null
}

export const getSelectedOrgImg = () => {
  const selectedOrg = getSelectedOrg()
  return selectedOrg ? selectedOrg.avartar_url : null
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
    pr: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/pulls`,
    todosUD: `${SERVER_URL}/todos`,
    todosCR: `${SERVER_URL}/todos/orgs/${getSelectedOrgId()}`,
    logout: `${SERVER_URL}/auth/logout`,
    shortcurId: `${SERVER_URL}/shortcuts`,
    organization: `${SERVER_URL}/orgs`,
    organization_select: `${SERVER_URL}/v2/organizations`,
    aceess_token: `${SERVER_URL}/auth/github/callback?code=`,
    shortcutOrg: `${SERVER_URL}/shortcuts/orgs/${getSelectedOrgId()}`,
    shortcut: `${SERVER_URL}/shortcuts`,
    repositories: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories`,
    issue_assignee: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/issues/status`,
    issue_state: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/issues/stats`,
    issue: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/issues`,
    commit_chart: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits/chart`,
    commit_contribution: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits/graph`,
    commit_message: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits/wordcloud`,
    commit_rank: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits/rank`,
    commit_total: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits/all`,
    commit_king: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits/weekly/top`,
    commit_search: `${SERVER_URL}/organizations/${getSelectedOrgName()}/repositories/${getSelectedRepo()}/commits?search`,
  }
}
