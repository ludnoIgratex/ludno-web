import React from 'react'
import styles from "./styles/IntroImage.module.css"

const IntroImage = () => {
  return (
    <div className={styles.container}>
      <img
        src="/assets/images/playlets-solution/cultural-center.webp"
        alt="Cultural Center"
        className={styles.image}
      />
      <p className={styles.caption}>
        Изображение на фоне: https://design-mate.ru/read/objects/projects/new-cultural-center-gas2
      </p>
    </div>
  )
}

export default IntroImage
