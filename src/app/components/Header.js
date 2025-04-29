"use client";
import { useEffect, useState } from "react";

import HeaderStyle from "@/public/assets/css/Header.module.css";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

const updateClock = (setHour) => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    setHour(time);
};

export default function Header() {
    const [hour, setHour] = useState(new Date().toLocaleTimeString());
    const [isClient, setIsClient] = useState(false);

    const { t, locale, setLocale } = useLocale();
    const { theme, setTheme } = useTheme();
    const [nameTheme, setNameTheme] = useState(t("header").theme[theme].title);

    useEffect(() => {
        setIsClient(true);
        const interval = setInterval(() => {
            updateClock(setHour);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
        setNameTheme(t("header").theme[theme].title);
    }, [theme, t]);

    if (!isClient) return null;

    return (
        <header className={HeaderStyle.parent}>
            <div className={`${HeaderStyle.child} ${HeaderStyle.theme}`}>
                {/* <div className={HeaderStyle.theme__parent}>
                    <div className={`${HeaderStyle.theme__parent_child}`}>
                        <div className={`${HeaderStyle.theme__bg_config} ${HeaderStyle.theme__bg}`}></div>
                    </div>
                    <span className={HeaderStyle.theme__parent_child}>{nameTheme}</span>
                </div> */}
                <label className={`${HeaderStyle.theme__parent}`}>
                    <input
                        type="checkbox"
                        checked={theme === "light"}
                        className={`${HeaderStyle.theme__bg_config} ${HeaderStyle.theme__bg}`}
                        onChange={(e) => { setTheme(e.target.checked ? "light" : "dark") }}
                    />
                    <span className={HeaderStyle.theme__parent_child}>
                        <span className={HeaderStyle.theme__night}>{nameTheme}</span>
                        {/* <span className={HeaderStyle.theme__light}></span> */}
                    </span>
                </label>
            </div>
            <div className={`${HeaderStyle.child} ${HeaderStyle.hour}`}>{hour}</div>
            <div className={`${HeaderStyle.child} ${HeaderStyle.translate}`}>
                <label><i className={HeaderStyle.lang__icon}></i></label>
                <select
                    className={HeaderStyle.translate__select}
                    name="translations"
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                >
                    <option disabled={true} value="ko_KR">한국어</option>
                    <option value="en_US">English</option>
                    <option value="es_NI">Español</option>
                    <option disabled={true} value="ja_JP">日本語</option>
                    <option disabled={true} value="zh_CN">繁體字</option>
                </select>
            </div>
        </header>
    );
}