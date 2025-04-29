import MainStyle from "@/public/assets/css/Main.module.css";

export default function Main({ children }) {
    return (
        <main className={MainStyle.MainParent}>
            {children}
        </main>
    );
}