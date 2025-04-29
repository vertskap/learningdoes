"use client";
//? THIS PAGE SHOWS THE 2 TYPE OF QUIZ
import TitleLearn from "../components/TitleLearn";
import DashboardStyle from "@/public/assets/css/Dashboard.module.css";
import CardLearn from "../components/CardLearn";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function Dashboard() {
    const { t } = useLocale();

    return (
        <section className={DashboardStyle.DBParent}>
            <div className={DashboardStyle.DBParent__children}>
                <TitleLearn headTitle={t("home").title} />
            </div>
            <div className={DashboardStyle.DBParent__children}>
                <Link style={{ outline: "none" }} href="../api" prefetch={false}>
                    <CardLearn bgImage="/images/mathground.jpg" bgAlt="mathground" />
                </Link>
                <Link style={{ outline: "none" }} href="../not">
                    <CardLearn bgImage="/images/spanishground.jpg" bgAlt="spanishground" />
                </Link>
            </div>
        </section>
    );
}