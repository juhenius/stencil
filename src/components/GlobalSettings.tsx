import { useAppContext } from "../context/AppContext.tsx";
import { Input } from "./Input.tsx";
import { Panel } from "./Panel.tsx";

export function GlobalSettings() {
  const { apiKey, setApiKey, instructions, setInstructions } = useAppContext();

  return (
    <Panel title="Settings">
      <Input
        id="apiKey"
        type="password"
        label="OpenAI API Key"
        value={apiKey}
        onChange={(value) => setApiKey(value)}
      />
      <Input
        id="instructions"
        type="textarea"
        label="Instructions"
        value={instructions}
        onChange={(value) => setInstructions(value)}
        rows={3}
      />
    </Panel>
  );
}
