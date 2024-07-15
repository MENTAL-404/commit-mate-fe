import styles from '../../styles/Home.module.css';
import MobileLayout from '../../components/mobile/MobileLayout';

export default function HomeMobile() {
  return (
    <MobileLayout>
      <div className={styles.mobileContainer}>
        <div className={styles.test}>
          dd
        </div>

      </div>
    </MobileLayout>
  );
}
