# Examples

This package ships one minimal example for each Pi package resource type.

## Extension

`extensions/hello.ts` registers:

- `/gemini-video-hello`
- a small session status indicator

Try it with:

```bash
pi -e .
```

Then run:

```txt
/gemini-video-hello YourName
```

## Agent Skill

`skills/example-skill/SKILL.md` demonstrates a minimal Agent Skill.

Replace it with your real video analysis workflow instructions.

## Prompt template

`prompts/example.md` demonstrates a tiny prompt template with one variable.

## Theme

`themes/example-theme.json` is a placeholder theme. Replace it or remove `themes/` if your package does not ship themes.

## Typed custom tool

`extensions/index.ts` registers:

- `/gemini-video-info`
- `gemini_video_greet` custom tool

The tool demonstrates:

- TypeBox object parameters
- a string enum schema via `StringEnum`
- shared logic imported from `lib/greeting.ts`
