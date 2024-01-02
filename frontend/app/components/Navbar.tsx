import "../../styles/globals.css";
import "../../styles/Navbar.css";
import Link from 'next/link';
import { FaUserShield } from 'react-icons/fa';



function Navbar() {
    return (
      <nav className="navbar">
        <Link href="/">
          <h1>YourCoin</h1>
        </Link>
        <div className="ml-auto">
          <Link href="/login">
            <h2><FaUserShield /></h2>
          </Link>
        </div>
      </nav>
    )
  }
  
  export default Navbar;