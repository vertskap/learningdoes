"use client";

import { listenEvents } from "@/lib/listenEvents";

/*
 * @author JOSTING
 *
 * ESTE CODIGO QUEDA PENDIENTE EN LA REFACTORIZACIÓN
 */

export class draggableLvlUtils {
    constructor() {
        this.allCanvas = document.querySelectorAll(".draggable-canvas");
        this.dropZone = document.getElementById("dropZone");
        this.canvasID = "none";
        this.isDragging = false;
        this.offsetX;
        this.offsetY;
        this.draggableEvents = new listenEvents();
    }

    drawCanvas(operator, xoffset, yoffset) {
        const spriteSheets = new Image();
        spriteSheets.src = "/assets/images/operators.png";

        spriteSheets.onload = () => {
            const canvas = document.getElementById(operator);
            const ctx = canvas.getContext("2d");

            const spriteSize = 128;
            const scaledSprite = 64;

            ctx.drawImage(spriteSheets, xoffset, yoffset, spriteSize, spriteSize, 0, 0, scaledSprite, scaledSprite);
        }
    }

    draggableCanvas(dragginCanvas, setDragginCanvas) {
        if (typeof document === undefined) return;

        if (!this.allCanvas) return;

        this.allCanvas.forEach(canvas => {
            this.draggableEvents.add(canvas, "mousedown", this.#onMouseDown, [setDragginCanvas, canvas]);
            this.draggableEvents.add(document, "mousemove", this.#onMouseMove, canvas);
            this.draggableEvents.add(document, "mouseup", this.#onMouseUp, canvas);
        });

        return () => {
            this.allCanvas.forEach((canvas) => {
                this.draggableEvents.remove(canvas, "mousedown");
                this.draggableEvents.remove(document, "mousemove");
                this.draggableEvents.remove(document, "mouseup");
            });
        };
    }

    calcRandomZ() {
        const unknownX = document.getElementById("unknownX");
        const unknownY = document.getElementById("unknownY");
        const unknownZ = document.getElementById("unknownZ");

        const _MAX_ = 10;
        const min = 1, max = 4;
        const X = Math.floor(Math.random() * _MAX_) + min;
        const Y = Math.floor(Math.random() * _MAX_) + min;
        let Z, Fx;

        const mathFx = Math.floor(Math.random() * max) + min;

        switch (mathFx) {
            case 1: {
                Z = X + Y;
                Fx = "addSign";
                break;
            }
            case 2: {
                Z = X > Y ? X - Y : Y - X;
                Fx = 'subSign';
                break;
            }
            case 3: {
                Z = X * Y;
                Fx = 'mulSign';
                break;
            }
            case 4: {
                Z = X / Y;
                Fx = 'divSign';
                break;
            }
            default: return alert("¡SOMETHING WAS WRONG!");
        }

        unknownX.innerText = X;
        unknownY.innerText = Y + " =";
        unknownZ.innerText = Math.round(Z * 100) / 100;
    }

    #onMouseDown(e, ...args) {
        const [setDragginCanvas, canvas] = args;
        this.isDragging = true;
        setDragginCanvas(canvas);
        this.offsetX = e.clientX - canvas.offsetLeft;
        this.offsetY = e.clientY - canvas.offsetTop;
        canvas.style.cursor = "grabbing";
    }

    #onMouseMove(e, canvas) {
        if (!this.isDragging) return;

        let newX = e.clientX - this.offsetX;
        let newY = e.clientY - this.offsetY;

        const maxX = window.innerWidth - canvas.width;
        const maxY = window.innerHeight - canvas.height;

        if (newX < 0) newX = 0;
        if (newX > maxX) newX = maxX;
        if (newY < 0) newY = 0;
        if (newY > maxY) newY = maxY;

        if (!validationsDraggin.isColliding(canvas, newX, newY)) {
            canvas.style.left = newX + "px";
            canvas.style.top = newY + "px";
        }
    }

    #onMouseUp(canvas) {
        if (!this.isDragging) return;

        this.isDragging = false;
        canvas.style.cursor = "grab";

        if (validationsDraggin.isInsideDropZone(canvas, this.dropZone)) {
            validationsDraggin.snapToDropZone(canvas, this.dropZone);
            this.canvasID = canvas.getAttribute("id");
        }
    }
}

class validationsDraggin {
    static isColliding(canvas, newX, newY) {
        const allCanvas = document.querySelectorAll("canvas");
        for (const otherCanvas of allCanvas) {
            if (otherCanvas === canvas) continue;

            const rect1 = {
                x: newX,
                y: newY,
                width: canvas.width,
                height: canvas.height
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

    static isInsideDropZone(canvas, dropZone) {
        const canvasRect = canvas.getBoundingClientRect();
        const dropZoneRect = dropZone.getBoundingClientRect();

        return (
            canvasRect.left < dropZoneRect.right &&
            canvasRect.right > dropZoneRect.left &&
            canvasRect.top < dropZoneRect.bottom &&
            canvasRect.bottom > dropZoneRect.top
        );
    }

    static snapToDropZone(canvas, dropZone) {
        const dropRect = dropZone.getBoundingClientRect();
        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;

        canvas.style.left = `${dropRect.left + (dropRect.width - canvasWidth) / 2}px`;
        canvas.style.top = `${dropRect.top + (dropRect.height - canvasHeight) / 2}px`;
    }
}