import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/RightSideTopContainer.module.css'
import drop from '../assets//images/drop.png'
import qr from '../assets//images/qr.png'
import { getSelectedRepo, getSelectedOrgImg } from '../utils/static'

function RightSideTopContainer({ customStyle }) {
  const selectedRepo = getSelectedRepo()
  const organization_image = getSelectedOrgImg()
  console.log(organization_image)

  return (
    <div
      className={`${styles.topContainer} ${customStyle ? styles[customStyle] : ''}`}
    >
      <div className={styles.qrContainer}>
        <img src={qr} alt='qr' className={styles.qr} />
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.innerContainer}>
          <img
            src={organization_image}
            alt='profile'
            className={styles.profileImage}
          />
          <div className={styles.organizationName}>{selectedRepo}</div>
        </div>
        <img src={drop} alt='drop' className={styles.dropImage} />
      </div>
    </div>
  )
}

RightSideTopContainer.propTypes = {
  customStyle: PropTypes.string,
}

RightSideTopContainer.defaultProps = {
  customStyle: '',
}

export default RightSideTopContainer
