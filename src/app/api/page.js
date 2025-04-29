"use client";

import { NavigationProvider } from "@/utils/AdminLvl";
import { AttempsProvider } from "@/context/AttempsContext";

import DragLvl from "../components/layouts/math/DragLvl";
import LogicLvl from "../components/layouts/math/LogicLvl";

import Header from "../components/Header";

import WinLvl from "@/utils/WinLvl";
import { useLocale } from "@/context/LocaleContext";

const components = [DragLvl, LogicLvl];

// import { useState, useEffect } from "react";
// import { componentList } from "@/utils/AdminLvl";

export default function Game() {
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [shuffledList, setShuffledList] = useState([]);

    // useEffect(() => {
    //     const shuffled = [...componentList].sort(() => 0.5 - Math.random());
    //     setShuffledList(shuffled);
    // }, []);

    // const handleNext = () => {
    //     setCurrentIndex((prev) => (prev + 1) % shuffledList.length);
    // };

    // const CurrentComponent = shuffledList[currentIndex];
    const { t } = useLocale();


    return (
        // <div>
        //     {/* <BackWalk /> */}
        //     
        //     {/* <DragLvl /> */}
        //     {/* <LogicLvl /> */}
        // </div>

        <AttempsProvider>
            <Header />
            <h2>{t("dashboard")}</h2>
            <NavigationProvider components={components}>
                <WinLvl />
            </NavigationProvider>
        </AttempsProvider>
    );
}