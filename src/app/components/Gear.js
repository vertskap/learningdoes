import GearStyle from "@/public/assets/css/Gear.module.css";

export function Gear() {
    return (
        <div className={GearStyle.GearParent}>
            <div className={GearStyle.GearParent__children}>
                <i className={GearStyle.gear__icon}></i>
            </div>
            <div className={GearStyle.GearParent__children}>
                {/** AQUI VA EL MENU QUE NO HARE AHORA */}
            </div>
        </div>
    );
}