import WinLvlStyle from "@/public/assets/css/WinLvl.module.css";
import Link from "next/link";
import { useNavigation } from "./AdminLvl";
import { useLocale } from "@/context/LocaleContext";

export default function WinLvl({ attemps, winParent = "" }) {
    const { goToNext, index, lengthComponents } = useNavigation();
    const { t } = useLocale();

    return (
        <section id="winGame" className={`${WinLvlStyle.winParent_hide} ${winParent}`}>
            <div className={WinLvlStyle.winParent__child}>
                <h1 className={WinLvlStyle.winParent__child_title}>{t("win").title}</h1>
            </div>
            <div className={`${WinLvlStyle.winHyperParent__child}`}>
                <strong>{t("win").body}:&nbsp;</strong><p>{attemps}</p>
            </div>
            <div className={WinLvlStyle.winParent__child}>
                <div className={WinLvlStyle.winHyperParent}>
                    <div className={WinLvlStyle.winHyperParent__child}>
                        <Link href="/"><i className={WinLvlStyle.winHyperParent__home}></i></Link>
                    </div>
                </div>
                <div className={WinLvlStyle.winHyperParent}>
                    <div className={WinLvlStyle.winHyperParent__child}>
                        <Link href="/"><i className={WinLvlStyle.winHyperParent__repeat}></i></Link>
                    </div>
                </div>
                <div className={WinLvlStyle.winHyperParent}>
                    <div className={WinLvlStyle.winHyperParent__child}>
                        <button className={WinLvlStyle.winHyperParent__child_btn} style={index >= lengthComponents ? { display: "none" } : undefined} onClick={goToNext}><i className={WinLvlStyle.winHyperParent__next}></i></button>
                    </div>
                </div>
            </div>
        </section>
    );
}