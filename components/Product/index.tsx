import React from 'react'
import styles from '../../styles/Product.module.scss'

const Product = ({data}) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_content}>
                <img src={data.src} alt={data.alt}/>
                <button className={styles.add_button}>ADD TO CART</button>
            </div>
            <div className={styles.card_info}>
                <h3>{data.category}</h3>
                <h2>{data.name}</h2>
                <p>${data.price}</p>
            </div>
        </div>
    )
}

export default Product
