import React, { useState } from 'react'
import styles from '../../styles/mobile/MobileHeader.module.css'
import logo from '../../../src/assets/images/mobileLogo.png'
import { IoSearch } from 'react-icons/io5'
import { Fade as Hamburger } from 'hamburger-react'
import MobileSidebar from './MobileSidebar'
import SearchCommit from './SearchCommit'
import { useLocation } from 'react-router-dom'

const MobileHeader = () => {
  const [isOpen, setOpen] = useState(false)
  const [isSearch, setIsSearch] = useState(false)

  const location = useLocation()
  const path = location.pathname

  if (path === '/') {
    return (
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt='mobile logo' />
        </div>
      </header>
    )
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={logo} alt='mobile logo' />
        </div>
        <div className={styles.searchMenuContainer}>
          <div className={styles.searchIcon}>
            <IoSearch onClick={() => setIsSearch(!isSearch)} />
          </div>
          <div className={styles.hamburgerMenu}>
            <Hamburger
              onClick={() => setOpen((prev) => !prev)}
              toggled={isOpen}
              size={20}
              toggle={setOpen}
            />
          </div>
        </div>
        <MobileSidebar isOpen={isOpen} onClose={() => setOpen(false)} />
        {/*<Sidebar isOpen={isOpen} onClose={() => setOpen(false)} />*/}
      </header>
      {isSearch && <SearchCommit onClose={() => setIsSearch(false)} />}
    </>
  )
}

export default MobileHeader
