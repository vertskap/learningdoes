"use client";

import NotFoundStyle from "@/public/assets/css/NotFound.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";

export default function NotFound() {
    const [redirect, setRedirect] = useState(5);
    const { t } = useLocale();

    useEffect(() => {
        setTimeout(() => {
            setRedirect(prev => prev - 1);
        }, 1000);

        if (redirect > 0) return;

        window.location.href = "/";
    }, [redirect]);
    return (
        <div className={NotFoundStyle.parent}>
            <div className={NotFoundStyle.child}>
                <div>
                    <h1>{t("notfound").title}</h1>
                </div>
            </div>
            <div className={NotFoundStyle.child}>
                <Image src="/images/notfound.jpeg" fill alt="NOT-FOUND" />
            </div>
            <div className={NotFoundStyle.child}>
                <div>
                    <p>{t("notfound").description.first}</p>
                    <p>{t("notfound").description.second} <span>{redirect}</span></p>
                </div>
            </div>
        </div>
    );
}