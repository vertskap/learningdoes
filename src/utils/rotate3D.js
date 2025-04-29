import style from "@/public/assets/css/Rotate3D.module.css"

export default function Rotate3D() {
    return (
        <div id="cubeunknown" className={style.cube}>
            <div className={`${style.bg} ${style.face} ${style.front}`}></div>
            <div className={`${style.bg} ${style.face} ${style.back}`}></div>
            <div className={`${style.bg} ${style.face} ${style.left}`}></div>
            <div className={`${style.bg} ${style.face} ${style.right}`}></div>
            <div className={`${style.bg} ${style.face} ${style.top}`}></div>
            <div className={`${style.bg} ${style.face} ${style.bottom}`}></div>
        </div>
    );
}