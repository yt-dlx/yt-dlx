export default function registerIpcHandlers(ipcMain: Electron.IpcMain) {
  ipcMain.on(
    "AddSend",
    (event: Electron.IpcMainEvent, data: { num1: number; num2: number }) => {
      event.sender.send("AddGet", data.num1 + data.num2);
    }
  );
}
