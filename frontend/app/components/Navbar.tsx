import "../../styles/globals.css";
import "../../styles/Navbar.css";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaUserShield } from 'react-icons/fa';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
    return (
      <nav className="navbar">
        <Link href="/">
          <h1>YourCoin</h1>
        </Link>
        <div className="ml-auto">
          <Link href="/basket">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon-better-one" />
            </Link>
          <Link href="/login">
            <FaUserShield />
          </Link>
        </div>
      </nav>
    )
  }
  
  export default Navbar;