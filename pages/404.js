import Link from "next/link"
import Navbar from '../components/Navbar'

export default function noPost() {
    return <>
    <Navbar />
    <div className="backHomeBtnContainer">
      <h3>No Post Found</h3>
      <Link style={{ textDecoration: 'none' }} href="/">
        <p className="backToHomeBtn">
          Go to home Page
        </p>
      </Link>
    </div>
    </>
  }
  