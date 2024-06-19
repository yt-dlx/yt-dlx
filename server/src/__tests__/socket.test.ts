import vitest from "vitest";
import websocket from "ws";
import path from "path";

let server: websocket;

vitest.describe("WebSocket Tests", () => {
  vitest.beforeAll(() => {
    server = new websocket("ws://localhost:8642");
  });
  vitest.afterAll(() => server.close());
  vitest.it("should handle connection and send events", async () => {
    const sendSpy = vitest.vi.spyOn(server, "send").mockImplementation(() => {});
    const events = ["AudioHighest"];
    await new Promise<void>(resolve => {
      server.on("open", async () => {
        for (const event of events) {
          const payload = JSON.stringify({
            event,
            payload: {
              stream: true,
              useTor: false,
              verbose: true,
              metadata: false,
              query: "careless whisper",
              output: path.join(process.cwd(), "downloads"),
            },
          });
          server.send(payload);
          await new Promise(res => setTimeout(res, 10000));
        }
        resolve();
      });
    });
    vitest.expect(sendSpy).toHaveBeenCalledTimes(events.length);
    vitest.vi
      .spyOn(console, "log")
      .mockImplementation(() => {})
      .mockRestore();
    vitest.vi
      .spyOn(console, "error")
      .mockImplementation(() => {})
      .mockRestore();
    sendSpy.mockRestore();
  });
});
