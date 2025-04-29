import LoadStyle from "@/public/assets/css/Loading.module.css";
import React from "react";

export default function loading({ fadeClass = "" }) {
    return (
        <section className={`${LoadStyle.wrapper} ${LoadStyle.theme} ${fadeClass}`}>
            <div className={`${LoadStyle.spinner}`}>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </div>
        </section>
    );
}