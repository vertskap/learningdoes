import Image from "next/image";
import styles from "@/public/assets/css/CardLearn.module.css";

export default function CardLearn({ bgImage, bgAlt, children }) {
    return (
        <section className={`${styles.SecLearn}`}>
            <div className={`${styles.SecLearnOpt} ${styles.SecLearnBackground}`}>
                <Image src={bgImage} fill alt={bgAlt} className={styles.image} />
                <div className={styles.overlay}>{children}</div>
            </div>
        </section>
    );
}