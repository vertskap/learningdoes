"use client"
import styles from "@/public/assets/css/TitleLearn.module.css";
import { useEffect, useRef } from "react";

export default function TitleLearn({ headTitle }) {
    const titleRef = useRef(null);

    useEffect(() => {
        if (!titleRef.current) return;

        titleRef.current.style.setProperty("--text-length", headTitle.length);
    }, [headTitle]);

    return (
        <section className={styles.TitleLearnContainer}>
            <h1 ref={titleRef} className={styles.TitleLearnFont}>{headTitle}</h1>
        </section>
    );
}