import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { URL } from './utils/static'
import {
  Login,
  Home,
  Commits,
  Issues,
  Settings,
  Repos,
  Organization,
} from './pages/pc'
import {
  LoginMobile,
  HomeMobile,
  CommitsMobile,
  IssuesMobile,
  SettingsMobile,
  ReposMobile,
  TodoMobile,
  OrganizationMobile,
} from './pages/mobile'

import styles from './App.module.css'

function App() {
  const isMobileView = useMediaQuery({ query: '(max-width: 580px)' })

  return (
    <BrowserRouter>
      <div className={isMobileView ? styles.mobileApp : styles.App}>
        {isMobileView ? (
          <Routes>
            <Route path={URL.logIn} element={<LoginMobile />} />
            <Route path={URL.home} element={<HomeMobile />} />
            <Route path={URL.commits} element={<CommitsMobile />} />
            <Route path={URL.issues} element={<IssuesMobile />} />
            <Route path={URL.settings} element={<SettingsMobile />} />{' '}
            <Route path={URL.orgs} element={<OrganizationMobile />} />
            <Route path={URL.repos} element={<ReposMobile />} />
            <Route path={URL.todo} element={<TodoMobile />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path={URL.logIn}
              element={
                <div className={styles.PageContainer}>
                  <Login />
                </div>
              }
            />
            <Route
              path={URL.home}
              element={
                <div className={styles.PageContainer}>
                  <Home />
                </div>
              }
            />
            <Route
              path={URL.commits}
              element={
                <div className={styles.PageContainer}>
                  <Commits />
                </div>
              }
            />
            <Route
              path={URL.issues}
              element={
                <div className={styles.PageContainer}>
                  <Issues />
                </div>
              }
            />
            <Route
              path={URL.settings}
              element={
                <div className={styles.PageContainer}>
                  <Settings />
                </div>
              }
            />
            <Route
              path={URL.repos}
              element={
                <div className={styles.PageContainer}>
                  <Repos />
                </div>
              }
            />
            <Route
              path={URL.orgs}
              element={
                <div className={styles.PageContainer}>
                  <Organization />
                </div>
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
