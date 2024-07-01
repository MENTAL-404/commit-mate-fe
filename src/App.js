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
          <Route path={URL.logIn} element={<Login />}></Route>
          <Route path={URL.home} element={<Home />}></Route>
          <Route path={URL.commits} element={<Commits />}></Route>
          <Route path={URL.issues} element={<Issues />}></Route>
          <Route path={URL.settings} element={<Settings />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
