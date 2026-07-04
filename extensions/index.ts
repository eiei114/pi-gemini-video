import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";
import { Type } from "typebox";
import { formatGreeting } from "../lib/greeting.ts";
import { StringEnum } from "@earendil-works/pi-ai";

const greetParameters = Type.Object({
  name: Type.String({ description: "Name to greet" }),
  mode: StringEnum(["short", "friendly"] as const, {
    description: "Greeting style. Prefer short unless the user asks for more warmth.",
  }),
});

const geminiVideoGreet = defineTool({
  name: "gemini_video_greet",
  label: "Gemini Video Greet",
  description: "Return a greeting from the pi-gemini-video package",
  promptSnippet: "gemini_video_greet: return a greeting from the gemini-video package",
  promptGuidelines: [
    "Use gemini_video_greet only when testing this gemini-video package or greeting the user.",
  ],
  parameters: greetParameters,
  async execute(_toolCallId, params) {
    const message = formatGreeting(params);

    return {
      content: [{ type: "text", text: message }],
      details: { message, mode: params.mode },
    };
  },

  renderCall(args, theme, _context) {
    let text = theme.fg("toolTitle", theme.bold("gemini_video_greet "));
    text += theme.fg("accent", `name=${args.name}`);
    text += theme.fg("dim", ` mode=${args.mode}`);
    return new Text(text, 0, 0);
  },

  renderResult(result, { expanded }, theme, _context) {
    const details = result.details as { message: string; mode: string } | undefined;
    const content = result.content[0];
    const message =
      details?.message ?? (content?.type === "text" ? content.text : "");

    let text = theme.fg("success", "→ ") + theme.fg("text", message);
    if (expanded && details) {
      text += `\n${theme.fg("dim", `mode: ${details.mode}`)}`;
    }
    return new Text(text, 0, 0);
  },
});

export default function (pi: ExtensionAPI) {
  pi.registerCommand("gemini-video-info", {
    description: "Show pi-gemini-video extension information",
    handler: async (_args, ctx) => {
      ctx.ui.notify("pi-gemini-video: Gemini multi-modal video analysis extension loaded.", "info");
    },
  });

  pi.registerTool(geminiVideoGreet);
}