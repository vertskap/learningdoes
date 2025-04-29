import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appServer = app.isPackaged ? serve({
    directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
    const win = new BrowserWindow({
        title: "Loadingdoes",
        width: 800,
        height: 600,
        maximizable: false,
        resizable: false,
        webPreferences: {
            sandbox: false,
            nodeIntegration: false, // * IMPORTANT BECAUSE SECURITY ACCORDING TO CHATGPT
            contextIsolation: true, // * REQUIRED FOR PRELOAD
            preload: "preload.js"
        }
    });

    if (app.isPackaged) {
        appServer(win).then(() => {
            win.loadURL("app://~")
        });
    } else {
        win.loadURL("http://localhost:3000");
        win.webContents.on("did-fail-load", (e, code, desc) => {
            win.webContents.reloadIgnoringCache();
            win.webContents.insertCSS(`
                * {
                    font-family: "myLocalFont", system-iu !important;
                }
            `);
        });
        win.webContents.setWindowOpenHandler(({ url }) => {
            win.loadURL(url);
            return { action: "deny" };
        });

        ipcMain.handle("set-theme", (event, theme) => {
            const color = theme === "dark" ? "#131313" : "#f8f8f9";
            win.setBackgroundColor(color);
        });
    }
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})