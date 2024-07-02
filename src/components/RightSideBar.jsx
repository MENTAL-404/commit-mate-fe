import styles from '../styles/RightSidebar.module.css'
import noti from '../images/noti.png'
import profileImage from '../images/hong.png'
import drop from '../images/drop.png'
import linkGithub from '../images/linkGithub.png'
import book from '../images/book.png'
import statusGraph from '../images/statisGraph.png'

export default function RightSideBar() {
  return (
    <div className={styles.main}>
      <div className={styles.sideBar}>
        <div className={styles.topContainer}>
          <div className={styles.notiContainer}>
            <img src={noti} alt='notification' className={styles.notiIcon} />
          </div>
          <div className={styles.profileContainer}>
            <div className={styles.innerContainer}>
              <img
                src={profileImage}
                alt='profile'
                className={styles.profileImage}
              />
              404-Mental
            </div>
            <img src={drop} alt='drop' className={styles.dropImage} />
          </div>
        </div>
        <div className={styles.todoContainer}>
          <div className={styles.title}>할 일 목록</div>
          <div className={styles.innerTodoContainer}>
            <div className={styles.innerTitle}>Todo</div>
            <div className={styles.todoList}>No todos yet</div>
            <div className={styles.addTodoBtn}>Add Todo</div>
          </div>
        </div>
        <div className={styles.linkContainer}>
          <div className={styles.title}>바로가기</div>
          <div className={styles.linkList}>
            <div className={styles.link}>
              <img src={linkGithub} alt='github' className={styles.linkLogo} />
              Github Repository
            </div>
            <div className={`${styles.link} ${styles.noLink}`}>
              추가된 바로가기가 없습니다
            </div>
          </div>
        </div>
        <div className={styles.statusContainer}>
          <div className={styles.title}>진행상황</div>
          <div className={styles.innerStatusContainer}>
            <div className={styles.innerStatusTitle}>
              이번주 목표 달성
              <img src={book} alt='book' className={styles.book} />
            </div>
            <div className={styles.statusGraph}>
              <img
                src={statusGraph}
                alt='status'
                className={styles.graph}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
