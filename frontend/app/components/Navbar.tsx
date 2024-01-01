import "../../styles/globals.css";
import "../../styles/Navbar.css";
import Link from 'next/link';


function Navbar() {
    return (
      <nav className="navbar">
        <Link href="/">
          <h1>YourCoin</h1>
        </Link>
      </nav>
    )
  }
  
  export default Navbar;