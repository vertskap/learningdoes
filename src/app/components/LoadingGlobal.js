"use client";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import Loading from "./Loading";
import LoadStyle from "@/public/assets/css/Loading.module.css";

/*export default function LoadingGlobal() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        setLoading(true);
        setFadeOut(false);

        const handleLoad = () => {
            setFadeOut(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);

        };
        const handleBeforeUnload = () => {
            setLoading(true);
            setFadeOut(false);
        };

        window.addEventListener("load", handleLoad);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("load", handleLoad);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [pathname]);

    if (loading) return null;

    return <Loading fadeClass={`${fadeOut ? LoadStyle.loadFadeOut : ""} `} />;
}*/

/*export default function LoadingGlobal() {
    const [loading, setLoading] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const [mounted, setMounted] = useState(false);

    const router = typeof window !== undefined ? useRouter() : null;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleStart = () => {
            setFadeOut(false);
            setLoading(true)
        };

        const handleComplete = () => {
            setFadeOut(true);
            setTimeout(() => setLoading(false), 1000);
        };

        router.events?.on("routeChangeStart", handleStart);
        router.events?.on("routeChangeComplete", handleComplete);
        router.events?.on("routeChangeError", handleComplete);

        return () => {
            router.events?.off("routeChangeStart", handleStart);
            router.events?.off("routeChangeComplete", handleComplete);
            router.events?.off("routeChangeError", handleComplete);
        };
    }, [router]);

    if (!loading || !mounted) return null;

    return (
        <Loading fadeClass={fadeOut ? LoadStyle.loadFadeOut : ""} />
    );
}*/


/*import { useLoadingLoader } from "@/context/LoadingGlobalContext";

export default function LoadingGlobal() {
    const { loading } = useLoadingLoader();

    if (!loading) return null;

    return (
        <Loading />
    );
}
*/

export default function LoadingGlobal({ children }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    if (!loading) {
        return <Loading />;
    }

    return children;
}