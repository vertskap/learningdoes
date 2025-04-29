"use client";
// TODO: X >= Y true false
import LogicStyle from "@/public/assets/css/layout/math/LogicLvl.module.css";
import logicUtils from "@/utils/DragLvl/logicUtils";
import WinLvlStyle from "@/public/assets/css/WinLvl.module.css";

import { useState, useEffect, useRef } from "react";
import Sidebar from "../../Sidebar";
import WinLvl from "@/utils/WinLvl";
import { useAttemps } from "@/context/AttempsContext";
import { useLocale } from "@/context/LocaleContext";

export default function LogicLvl() {
    const { attemps, setAttemps } = useAttemps();
    const [dataLvl, setDataLvl] = useState([]);
    const [choices, setChoices] = useState([]);
    const [winner, setWinner] = useState(false);

    const [mounted, setMounted] = useState(false);

    const { t } = useLocale();

    const logic = useRef(null);

    if (!logic.current) {
        logic.current = new logicUtils();
    }

    useEffect(() => {
        setDataLvl(logic.current.calculate(4));
        setMounted(true);
    }, []);

    useEffect(() => {
        if (dataLvl.length > 0) {
            setChoices(logic.current.fill(dataLvl));
        }
    }, [dataLvl]);

    useEffect(() => {
        if (!(choices.length > 0)) return;
        if (!(choices.every(x => x !== null))) return;
        setTimeout(() => {
            setWinner(true);
        }, 1000);
    }, [choices]);

    const decreasingAttemps = (correct, select) => {
        if (correct !== select) setAttemps(prev => prev - 1);
    }

    if (!mounted) return null;

    return (
        <div className={LogicStyle.parent}>
            <div className={`${LogicStyle.child} ${LogicStyle.header}`}>
                <div className={`${LogicStyle.header__child} ${LogicStyle.title}`}>
                    <h2>{t("logic").title}</h2>
                </div>
                {/* <div className={`${LogicStyle.header__child} ${LogicStyle.sidebar}`}>
                    <div>...sidebar...</div>
                </div> */}
                <Sidebar mainLvl__children={LogicStyle.header__child} attemps={attemps} />
            </div>
            <div className={`${LogicStyle.child} ${LogicStyle.body}`}>
                <div className={`${LogicStyle.body__child_firstChild}`}>
                    <div className={`${LogicStyle.body__child_desc}`}>
                        <p>{t("logic").description}</p>
                    </div>
                    <div className={`${LogicStyle.body__child_choose}`}>
                        <p>{t("logic").choose}</p>
                        <div>
                            <label>{t("logic").value.true.name}</label>
                            <label>{t("logic").value.false.name}</label>
                        </div>
                    </div>
                </div>
                {
                    dataLvl.map(({ A, B, answer }, i) => (
                        <div key={i} className={`${LogicStyle.body__child}`}>
                            {/* MENOR < */}
                            <div className={
                                `${LogicStyle.body__child_ask}
                                ${choices[i] === null || choices[i] === undefined ? "" : (answer[1] === choices[i]) ? LogicStyle.wellAnswer : LogicStyle.wrongAnswer}`
                            }>
                                <div className={`${LogicStyle.body__child_askX}`}>{A}</div>
                                <div className={`${LogicStyle.body__child_askY}`}>{answer[0]}</div>
                                <div className={`${LogicStyle.body__child_askZ}`}>{B}</div>
                            </div>
                            <div className={
                                `${LogicStyle.body__child_answer}
                                ${choices[i] === null || choices[i] === undefined ? "" : (answer[1] === choices[i]) ? LogicStyle.wellAnswer : LogicStyle.wrongAnswer}`
                            }>
                                <label className={`${LogicStyle.body__child_answerTrue}`}>
                                    <input
                                        type="radio"
                                        name={`reply${i}`}
                                        onChange={(e) => {
                                            logic.current.catchChoices(choices, setChoices, i, true);
                                            decreasingAttemps(answer[1], e.target.value === "true");
                                        }}
                                        value={true}
                                        checked={choices[i] === true}
                                        disabled={choices[i] !== null && choices[i] !== true}
                                    />
                                    <span className={LogicStyle.checkmark}></span>
                                </label>
                                <label className={`${LogicStyle.body__child_answerFalse}`}>
                                    <input
                                        type="radio"
                                        name={`reply${i}`}
                                        onChange={(e) => {
                                            logic.current.catchChoices(choices, setChoices, i, false);
                                            decreasingAttemps(answer[1], !(e.target.value === "false"));
                                        }}
                                        value={false}
                                        checked={choices[i] === false}
                                        disabled={choices[i] !== null && choices[i] !== false}
                                    />
                                    <span className={LogicStyle.checkmark}></span>
                                </label>
                            </div>
                        </div>
                    ))
                }
            </div>
            {winner && <WinLvl attemps={attemps} winParent={WinLvlStyle.winParent} />}
        </div>
    );
}