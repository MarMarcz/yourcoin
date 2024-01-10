import "../../styles/globals.css";
import "../../styles/Navbar.css";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUserTie } from '@fortawesome/free-solid-svg-icons';



function Navbar() {
    return (
      <nav className="navbar">
        <Link href="/">
          <h1>YourCoin</h1>
        </Link>
        <div className="ml-auto">
          <Link href="/basket">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-4" />
            </Link>
          <Link href="/login">
          <FontAwesomeIcon icon={faUserTie} className="mr-4"/>
          </Link>
        </div>
      </nav>
    )
  }
  
  export default Navbar;