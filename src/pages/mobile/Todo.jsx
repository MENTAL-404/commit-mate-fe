import styles from '../../styles/Todo.module.css'
import MobileLayout from '../../components/mobile/MobileLayout'
import Todo from '../../components/home/Todo'

export default function TodoMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
        투두
        <Todo />
      </div>
    </MobileLayout>
  )
}
