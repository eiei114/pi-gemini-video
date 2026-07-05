import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  let injectGeminiVideoHint = true;

  // Fires once when a Pi session starts (new or resumed).
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.setStatus("gemini-video", "Gemini Video loaded");
  });

  // Fires before each agent turn, after the system prompt is assembled.
  // Return { systemPrompt } to append teaching context without blocking the turn.
  pi.on("before_agent_start", async (event) => {
    if (!injectGeminiVideoHint) {
      return undefined;
    }
    injectGeminiVideoHint = false;

    return {
      systemPrompt:
        event.systemPrompt +
        "\n\n[pi-gemini-video] Event handlers in extensions/hello.ts are active. Type ?gemini-video for a quick help hint.",
    };
  });

  // Fires when the user submits input, before the agent processes it.
  // Return { action: "handled" } to short-circuit the agent for simple commands.
  pi.on("input", async (event, ctx) => {
    if (event.source === "extension") {
      return { action: "continue" };
    }

    if (event.text.trim() === "?gemini-video") {
      ctx.ui.notify(
        "pi-gemini-video loaded. Try /gemini-video-hello [name] or /gemini-video-info.",
        "info",
      );
      return { action: "handled" };
    }

    return { action: "continue" };
  });

  // Fires before a built-in or extension tool executes. Non-blocking logging only.
  pi.on("tool_call", async (event) => {
    console.log(`[pi-gemini-video] tool_call: ${event.toolName} (${event.toolCallId})`);
    return undefined;
  });

  // Fires after a tool finishes. Logs outcome; extensions may also return content/details overrides.
  pi.on("tool_result", async (event) => {
    const status = event.isError ? "error" : "ok";
    console.log(`[pi-gemini-video] tool_result: ${event.toolName} ${status} (${event.toolCallId})`);
    return undefined;
  });

  pi.registerCommand("gemini-video-hello", {
    description: "Show a hello message from pi-gemini-video",
    handler: async (args, ctx) => {
      const name = args.trim() || "Pi";
      ctx.ui.notify(`Hello, ${name}! pi-gemini-video is ready.`, "info");
    },
  });
}