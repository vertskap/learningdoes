"use client";

// import FileSystem from "node:fs/promises";

//?1: IT DOES A COUNT OF ALL LEVELS
//?2: IT CHARGES RANDOM LVL
//?3: IT TAKES COUNT SCORE
//?4: CONTINUOS TO THE NEXT LVL

// import DragLvl from "@/app/components/layouts/math/DragLvl";
// import LogicLvl from "@/app/components/layouts/math/LogicLvl";


// export const componentList = [DragLvl, LogicLvl];

import { createContext, useContext, useEffect, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children, components }) => {
    const [index, setIndex] = useState(null);
    const [shuffledList, setShuffledList] = useState([]);
    const lengthComponents = components.length - 1;

    useEffect(() => {
        // const randomIndex = Math.floor(Math.random() * components.length);
        const shuffled = [...components].sort(() => 0.5 - Math.random());
        setShuffledList(shuffled);
        setIndex(0);
    }, [components]);

    const goToNext = () => {
        setIndex((prev) => (prev + 1 < components.length ? prev + 1 : prev));
        // setIndex((prev) => (prev + 1) % shuffledList.length);
    };

    if (index === null) return;

    const CurrentComponent = shuffledList[index];

    return (
        <NavigationContext.Provider value={{ goToNext, index, lengthComponents }}>
            {<CurrentComponent />}
            {children}
        </NavigationContext.Provider>
    );
};

// class FileSystemHandle {
//     constructor(choice) {
//         this.choice = choice; //? math - lang
//     }


// }

// const lang = "/src/app/components/layouts/language";

// async function getLvlTree() {
//     try {
//         const getLvl = await FileSystem.readdir(lang, { encoding: "utf8" });
//         return getLvl[Math.random() * getLvl.length - 1];
//     } catch (error) {
//         alert(error);
//     }
// }

// class nodeLvl {
//     constructor(level) {
//         this.level = level;
//         this.next = null;
//     }
// }

// class linkedListLvl {
//     constructor() {
//         this.head = null;
//         this.size = 0;
//     }

//     appendAfter(level) {
//         const newNode = nodeLvl(level);
//         if (!this.head) {
//             this.head = newNode;
//         } else {
//             let current = this.head;
//             while (current.next) {
//                 current = current.next;
//             }
//             current.next = newNode;
//         }

//         this.size++;
//     }

//     clear() {
//         this.head = null;
//         this.size = 0;
//     }
// }