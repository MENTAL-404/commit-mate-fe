import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { URL } from './utils/static'
import { Login, Home, Commits, Issues, Settings, Repos } from './pages/pc'
import {
  LoginMobile,
  HomeMobile,
  CommitsMobile,
  IssuesMobile,
  SettingsMobile,
  ReposMobile,
  MenuMobile,
} from './pages/mobile'
import { isMobile } from 'react-device-detect'

import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={isMobile ? styles.mobileApp : styles.App}>
        {isMobile ? (
          <Routes>
            <Route path={URL.logIn} element={<LoginMobile />} />
            <Route path={URL.home} element={<HomeMobile />} />
            <Route path={URL.commits} element={<CommitsMobile />} />
            <Route path={URL.issues} element={<IssuesMobile />} />
            <Route path={URL.settings} element={<SettingsMobile />} />
            <Route path={URL.repos} element={<ReposMobile />} />
            <Route path={URL.menu} element={<MenuMobile />} />
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
          </Routes>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
