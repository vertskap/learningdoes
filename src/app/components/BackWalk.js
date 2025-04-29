import styles from "@/public/assets/css/BackWalk.module.css";
import Link from "next/link";

export default function BackWalk() {
    return (
        <div>
            <Link href="/" prefetch={false}>
                <i className={styles.arrowbackground}></i>
            </Link>
        </div>
    );
}