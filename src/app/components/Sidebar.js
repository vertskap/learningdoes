import { Gear } from "./Gear";
import BackWalk from "./BackWalk";
import SidebarStyle from "@/public/assets/css/Sidebar.module.css";
import { useLocale } from "@/context/LocaleContext";

export default function Sidebar({ mainLvl__children = "", attemps }) {
    const { t } = useLocale();

    return (
        <div className={`${mainLvl__children} ${SidebarStyle.attempLvl}`}>
            <div className={`${SidebarStyle.attempLvl_children}`}>
                <BackWalk />
            </div>
            <div className={`${SidebarStyle.attempLvl_children}`}>
                <span>{t("sidebar").title}:&nbsp;</span><strong>{attemps}</strong>
            </div>
            <div className={`${SidebarStyle.attempLvl_children}`}>
                {/** AQUI VA EL COMPONENTE GEAR */}
                <Gear />
            </div>

        </div>
    );
}