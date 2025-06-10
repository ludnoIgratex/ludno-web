import React from 'react'
import styles from "./styles/Materials.module.css"

const Materials = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Материалы</h2>
      <div className={styles.content}>
        <img
          src="/assets/images/nature-navigation/materials.avif"
          alt="Материалы"
          className={styles.image}
        />
        <div className={styles.text}>
          <p>
            В производстве используется сибирская лиственница — древесина, обладающая высокой прочностью,
            устойчивостью к влаге и долговечностью. Это природный материал, который гармонирует с ландшафтом
            и сохраняет эстетичный внешний вид в течение многих лет.
          </p>
          <p>
            Для табличек используется алюмокомпозит — прочный, лёгкий и устойчивый к погодным воздействиям
            материал. Он не подвержен коррозии и обеспечивает лёгкое обслуживание.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Materials
