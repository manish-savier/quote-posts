import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Home.module.css"
import logoImage from "../public/images/logo.png"
import { useRouter } from "next/router";

const Navbar = (props) => {
    const router = useRouter();
    const home = router.pathname === "/";
    return (<div className={styles.nav_container}><nav className={`${styles.nav} container`}>
            <Image style={{margin: `0 1rem`}} src={logoImage} alt="logo-img" height={32} width={108}></Image>
            <ul>
            {home?(<li><div className={styles.searchbox}><input type="text" placeholder="Search for Post..." value={props.value} onChange={props.searchPost}></input></div></li>):(<Link style={{ textDecoration: 'none'}} href="/"><li>Home</li></Link>)}
            </ul>
        </nav></div>);
}

export default Navbar;