import styles from '../styles/RightSidebar.module.css'
import RightSideTopContainer from './RightSideTopContainer'
import Shortcut from './home/Shortcut'
import Todo from './home/Todo'

export default function RightSideBar() {
  return (
    <div className={styles.main}>
      <div className={styles.sideBar}>
        <RightSideTopContainer />
        <div className={styles.title}>할 일 목록</div>
        <Todo />
        <div className={styles.linkContainer}>
          <div className={styles.title}>바로가기</div>
          <Shortcut />

        </div>
        <div className={styles.statusContainer}>
          {/*<div className={styles.title}>진행상황</div>*/}
          {/*<div className={styles.innerStatusContainer}>*/}
          {/*  <div className={styles.innerStatusTitle}>*/}
          {/*    이번주 목표 달성*/}
          {/*    <img src={book} alt='book' className={styles.book} />*/}
          {/*  </div>*/}
          {/*  <div className={styles.statusGraph}>*/}
          {/*    <img*/}
          {/*      src={statusGraph}*/}
          {/*      alt='status'*/}
          {/*      className={styles.graph}*/}
          {/*    ></img>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}
