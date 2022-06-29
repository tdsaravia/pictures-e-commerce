import Image from 'next/image'
import styles from '../../styles/Header.module.scss';
import logo from '../../images/logo.png'
import cart from '../../images/icons/Cart.png'
export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Image src={logo} alt="logo"/>
            </div>
            <div className={styles.header__cart}>
                <Image src={cart} alt="cart"/>
            </div>
        </header>
    )
}