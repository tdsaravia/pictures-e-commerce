import Image from 'next/image'
import styles from '../../styles/Header.module.scss';
import logo from '../../images/logo.png'
import cartIcon from '../../images/icons/Cart.png'
import { useSnipcart } from 'use-snipcart';

export default function Header() {
    const { cart = {} } = useSnipcart();

    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <Image src={logo} alt="logo"/>
            </div>
            <div className={styles.header__cart}>
                <button className="snipcart-checkout" style={{border:'none',backgroundColor:"transparent", cursor:'pointer'}}>
                <Image src={cartIcon} alt="cart"/>
                </button>
                <span>
                    ${ cart.subtotal?.toFixed(2) }
                </span>
            </div>
        </header>
    )
}