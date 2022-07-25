import React from 'react'
import Image from 'next/image'
import dog from '../../images/dog.jpeg'
import styles from '../../styles/Main.module.scss';
import img1 from '../../images/image_detail_1.jpeg'
import img2 from '../../images/image_detail_2.jpg'
import img3 from '../../images/image_detail_3.jpg'

const PhotoOfTheDay = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>Samurai King Resting</h2>
                <button>ADD TO CART</button>
            </div>
            <div className={styles.image_container}>
                <Image src={dog} alt='main-photo'/>
                <div className={styles.text_block}>
                    <p>Photo of the day</p>
                </div>
            </div>
            <div className={styles.content__details}>
                <div className={styles.content__details_left}>
                    <h3>About the Samurai King Resting</h3>
                    <h4>Pets</h4>
                    <p>
                    So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Ciceros De Finibus in order to provide placeholder 
                    </p>
                    <p>
                    text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.
                    </p>
                </div>
                <div className={styles.content__details_right}>
                    <h3>People also buy</h3>
                    <div className={styles.card_container}>
                        <div className={styles.card_container__images}>
                            <Image src={img1} alt=""/>
                        </div>
                        <div className={styles.card_container__images}>
                            <Image src={img2} alt="" />
                        </div>
                        <div className={styles.card_container__images}>
                            <Image src={img3} alt="" />
                        </div>
                    </div>
                    <div>
                        <h3>Details</h3>
                        <p>Size: 1020 x 1020 pixel</p>
                        <p>Size: 15 mb</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoOfTheDay
