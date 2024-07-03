import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { URL } from './utils/static'
import Login from './pages/Login'
import Home from './pages/Home'
import Commits from './pages/Commits'
import Issues from './pages/Issues'
import Settings from './pages/Settings'

import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path={URL.logIn} element={<div className={styles.PageContainer}><Login /></div>}></Route>
          <Route path={URL.home} element={<div className={styles.PageContainer}><Home /></div>}></Route>
          <Route path={URL.commits} element={<div className={styles.PageContainer}><Commits /></div>}></Route>
          <Route path={URL.issues} element={<div className={styles.PageContainer}><Issues /></div>}></Route>
          <Route path={URL.settings} element={<div className={styles.PageContainer}><Settings /></div>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
