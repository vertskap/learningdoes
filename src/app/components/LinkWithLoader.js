"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoadingLoader } from "@/context/LoadingGlobalContext";
import React from "react";


export default function LinkWithLoader({ href, children, ...rest }) {
    const router = useRouter();
    const { setLoading } = useLoadingLoader();

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);

        const hrefString = typeof href === "string" ? href : href.toString();
        router.push(hrefString);
    }

    return (
        <a href={typeof href === "string" ? href : href.toString()} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
}