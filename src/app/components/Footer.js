"use client";
import { useLocale } from "@/context/LocaleContext";
import footStyle from "@/public/assets/css/Footer.module.css";

export default function Footer({ nameApp }) {
    const { t } = useLocale();

    return (
        <>
            <footer className={footStyle.footParent}>
                <div className={`${footStyle.footTitle} ${footStyle.footParent__child}`}>
                    <h3>{nameApp}</h3>
                </div>
                <div className={`${footStyle.footDesc} ${footStyle.footParent__child}`}>
                    <p>{t("footer").description}</p>
                </div>
                <div className={`${footStyle.footBody} ${footStyle.footParent__child}`}>
                    <div className={footStyle.footMembers}>
                        <div className={footStyle.footInt}><p>My Sisters Friend 1</p></div>
                        <div className={footStyle.footInt}><p>My Sisters Friend 2</p></div>
                        <div className={footStyle.footInt}><p>My Sisters Friend 3</p></div>
                        <div className={footStyle.footInt}><p>My Sisters Friend 4</p></div>
                    </div>
                </div>
                <div className={`${footStyle.footCopy} ${footStyle.footParent__child}`}>
                    <div className={footStyle.footIcon}>
                        <div>&copy;&nbsp;</div>
                    </div>
                    <div>
                        <p>{t("footer").copyright}</p>
                    </div>
                </div>
            </footer>
        </>
    );
}