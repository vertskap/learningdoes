"use client"
import lvldrag from "@/public/assets/css/layout/math/DragLvl.module.css";
import cubeStyle from "@/public/assets/css/Rotate3D.module.css";
import WinLvlStyle from "@/public/assets/css/WinLvl.module.css";
import Rotate3D from "@/utils/rotate3D";
import WinLvl from "@/utils/WinLvl";

import { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import { useAttemps } from "@/context/AttempsContext";
import { useLocale } from "@/context/LocaleContext";

function drawOnCanva(optID, x, y) {
    const img = new Image();
    img.src = "/assets/images/operators.png";

    img.onload = () => {
        const canvas = document.getElementById(optID);
        const ctx = canvas.getContext("2d");

        const spriteSize = 128;
        const scaledSprite = 64;

        ctx.drawImage(img, x, y, spriteSize, spriteSize, 0, 0, scaledSprite, scaledSprite)
    }
}

function grabCanva(canvases, setDragginCanvas, canvasID, attemps, setAttemps) {
    if (typeof document === "undefined") return;

    const canvasSing = document.querySelectorAll(canvases);
    const dropZone = document.getElementById("dropZone");
    const cubeElement = document.getElementById("cubeunknown");

    const mainLvlChildren = document.getElementsByClassName(lvldrag.mainLvl__children);
    const winScreen = document.getElementById("winGame");

    let onMouseDown, onMouseMove, onMouseUp;

    if (!canvasSing) return;

    canvasSing.forEach((optSign) => {
        let isDragging = false;
        let offsetX, offsetY;

        onMouseDown = (e) => {
            isDragging = true;
            setDragginCanvas(optSign);
            offsetX = e.clientX - optSign.offsetLeft;
            offsetY = e.clientY - optSign.offsetTop;
            // const rect = optSign.getBoundingClientRect();
            // offsetX = e.clientX - rect.left;
            // offsetY = e.clientY - rect.top;
            optSign.style.cursor = "grabbing";
        };

        onMouseMove = (e) => {
            if (!isDragging) return;

            // * BOXBODYLVL
            // const boxZone = boxBodyLvl.getBoundingClientRect();

            // let newX = e.clientX - boxZone.left - offsetX;
            // let newY = e.clientY - boxZone.top - offsetY;

            // newX = Math.max(0, Math.min(newX, boxZone.left - optSign.offsetWidth));
            // newY = Math.max(0, Math.min(newY, boxZone.top - optSign.offsetHeight));

            // optSign.style.left = newX + "px";
            // optSign.style.top = newY + "px";

            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            const maxX = window.innerWidth - optSign.width;
            const maxY = window.innerHeight - optSign.height;

            if (newX < 0) newX = 0;
            if (newX > maxX) newX = maxX;
            if (newY < 0) newY = 0;
            if (newY > maxY) newY = maxY;

            if (!isColliding(optSign, newX, newY)) {
                optSign.style.left = newX + "px";
                optSign.style.top = newY + "px";
            }

            if (isInsideDropZone(optSign, dropZone)) {
                cubeElement.classList.add(cubeStyle.cubeHidden);
            } else {
                cubeElement.classList.remove(cubeStyle.cubeHidden);
            }
        };

        onMouseUp = () => {
            if (!isDragging) return;

            isDragging = false;
            optSign.style.cursor = "grab";

            if (isInsideDropZone(optSign, dropZone)) {
                snapToDropzone(optSign, dropZone, cubeElement); // ! draggincanvas == optSign
                if (canvasID === optSign.getAttribute("id") && attemps > 0) {
                    requestAnimationFrame(() => {
                        for (const child of mainLvlChildren) {
                            child.classList.remove(lvldrag.yourAnswerWrong);
                            child.classList.add(lvldrag.yourAnswerWell);
                        }
                    });

                    setTimeout(() => {
                        winScreen.classList.remove(WinLvlStyle.winParent_hide);
                        winScreen.classList.add(WinLvlStyle.winParent);
                    }, 1500);
                } else {
                    requestAnimationFrame(() => {
                        for (const child of mainLvlChildren) {
                            child.classList.add(lvldrag.yourAnswerWrong);
                        }
                    });


                    setTimeout(() => {
                        if (attemps > 0) {
                            // * RENDER AGAIN 
                            setAttemps((prev) => prev - 1);
                            optSign.remove();
                            dropZone.appendChild(cubeElement);
                            cubeElement.classList.remove(cubeStyle.cubeHidden);
                            requestAnimationFrame(() => {
                                for (const child of mainLvlChildren) {
                                    child.classList.remove(lvldrag.yourAnswerWrong);
                                }
                            });
                        } // * SHOW LOST WIN SCREEN
                    }, 1500);
                }
            }
        };

        optSign.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });


    return () => {
        canvasSing.forEach((optSign) => {
            optSign.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        });

    };
}

function isInsideDropZone(canvas, dropZone) {
    const canvasRect = canvas.getBoundingClientRect();
    const dropZoneRect = dropZone.getBoundingClientRect();

    return (
        canvasRect.left < dropZoneRect.right &&
        canvasRect.right > dropZoneRect.left &&
        canvasRect.top < dropZoneRect.bottom &&
        canvasRect.bottom > dropZoneRect.top
    );
}

function snapToDropzone(canvas, dropZone, cube) {
    const dropRect = dropZone.getBoundingClientRect();
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;

    canvas.style.left = `${dropRect.left + (dropRect.width - canvasWidth) / 2}px`;
    canvas.style.top = `${dropRect.top + (dropRect.height - canvasHeight) / 2}px`;

    // cube.style.display = "none";
    cube.remove();
    dropZone.appendChild(canvas);
}

function isColliding(movingCanvas, newX, newY) {
    const allCanvanses = document.querySelectorAll("canvas");
    for (const otherCanvas of allCanvanses) {
        if (otherCanvas === movingCanvas) continue;

        const rect1 = {
            x: newX,
            y: newY,
            width: movingCanvas.width,
            height: movingCanvas.height
        };

        const rect2 = {
            x: otherCanvas.offsetLeft,
            y: otherCanvas.offsetTop,
            width: otherCanvas.width,
            height: otherCanvas.height
        };

        if (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        ) return true;
    }

    return false;
}

function calcRandomZ(setAnswer, setXState, setYState, setZState) {
    const _MAX_ = 10;
    const min = 1, max = 4;
    const X = Math.floor(Math.random() * _MAX_) + min;
    const Y = Math.floor(Math.random() * _MAX_) + min;
    let Z, canvasOperator;

    const mathFx = Math.floor(Math.random() * max) + min;

    switch (mathFx) {
        case 1: {
            Z = X + Y;
            canvasOperator = "addSign";
        } break;
        case 2: {
            Z = X > Y ? X - Y : Y - X;
            canvasOperator = "subSign";
        } break;
        case 3: {
            Z = X * Y;
            canvasOperator = "mulSign";
        } break;
        case 4: {
            Z = X / Y;
            canvasOperator = "divSign";
        } break;
        default: return alert("¡SOMETHING WAS WRONG!");
    }

    setAnswer(canvasOperator);
    setXState(X);
    setYState(Y);
    setZState(Z);
}

export default function DragLvl() {
    const [dragginCanvas, setDragginCanvas] = useState(null);
    const { attemps, setAttemps } = useAttemps();
    const [answer, setAnswer] = useState(undefined);

    const [xState, setXState] = useState(-1);
    const [yState, setYState] = useState(-1);
    const [zState, setZState] = useState(-1);

    const [mounted, setMounted] = useState(false);
    const { t } = useLocale();

    useEffect(() => {
        setMounted(true);
    }, []);

    const canvasWidth = 55, canvasHeight = 55;

    useEffect(() => {
        drawOnCanva("addSign", 0, 0);
        drawOnCanva("subSign", 128, 0);
        drawOnCanva("mulSign", 0, 128);
        drawOnCanva("divSign", 128, 128);
    }, []);

    useEffect(() => {
        if (answer) return;
        calcRandomZ(setAnswer, setXState, setYState, setZState);
    }, [answer]);

    useEffect(() => {
        grabCanva(".draggable-canvas", setDragginCanvas, answer, attemps, setAttemps);
    }, [answer]);

    if (!mounted) return;

    return (
        <div className={lvldrag.mainLvl}>
            <div className={`${lvldrag.mainLvl__children} ${lvldrag.titleLvl}`}>
                <h2>{t("drag").title}</h2>
            </div>
            <Sidebar mainLvl__children={lvldrag.mainLvl__children} attemps={attemps} />
            <div className={`${lvldrag.mainLvl__children} ${lvldrag.desc}`}>
                <p>{t("drag").description}</p>
            </div>
            <div id="boxBodyLvl" className={`${lvldrag.mainLvl__children} ${lvldrag.bodyLvl} ${lvldrag.bodyLvlFlex}`}>
                <div className={`${lvldrag.boxCountLvl}`}>
                    <div className={lvldrag.extrange}>{xState}</div>
                </div>
                <div id="dropZone" className={`${lvldrag.boxCountLvl}`}>
                    <Rotate3D />
                </div>
                <div className={`${lvldrag.boxCountLvl}`}>
                    <div className={lvldrag.extrange} >{yState}</div>
                </div>
                <div className={`${lvldrag.boxCountLvl}`}>
                    <div className={lvldrag.extrange}>=</div>
                </div>
                <div className={`${lvldrag.boxCountLvl}`}>
                    <div className={lvldrag.extrange} >{Math.round(zState * 100) / 100}</div>
                </div>
            </div>
            <div className={`${lvldrag.mainLvl__children} ${lvldrag.optLvl}`}>
                <div className={lvldrag.optSign}>
                    <canvas className="draggable-canvas" id="addSign" width={canvasWidth} height={canvasHeight}></canvas>
                </div>
                <div className={lvldrag.optSign}>
                    <canvas className="draggable-canvas" id="subSign" width={canvasWidth} height={canvasHeight}></canvas>
                </div>
                <div className={lvldrag.optSign}>
                    <canvas className="draggable-canvas" id="mulSign" width={canvasWidth} height={canvasHeight}></canvas>
                </div>
                <div className={lvldrag.optSign}>
                    <canvas className="draggable-canvas" id="divSign" width={canvasWidth} height={canvasHeight}></canvas>
                </div>
            </div>
            {mounted && <WinLvl attemps={attemps} />}
        </div>
    );
}