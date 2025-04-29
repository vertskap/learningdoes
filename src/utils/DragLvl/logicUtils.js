"use client";

import LogicStyle from "@/public/assets/css/Loading.module.css";

export default class logicUtils {
    calculate(n) {
        return Array.from({ length: n }, () => {
            const A = Math.floor(Math.random() * 10) + 1;
            const B = Math.floor(Math.random() * 10) + 1;

            const answer = [
                ["<", A < B],
                [">", A > B],
                ["<=", A <= B],
                [">=", A >= B],
            ];

            return { A, B, "answer": answer[Math.floor(Math.random() * 4)] };
        });
    }

    fill(responseLvl) {
        return new Array(responseLvl.length).fill(null);
    }

    namesMap(responseLvl) {
        return Array(responseLvl.length).fill().map((_, i) => {
            return `reply${i}`;
        });
    }

    catchChoices(choices, setChoices, i, choice) {
        if (choices[i] === null) {
            const news = [...choices];
            news[i] = choice;
            setChoices(news);
        }
    }
}