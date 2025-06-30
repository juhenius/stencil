import { Button } from "./components/Button.tsx";
import { CompositePreview } from "./components/CompositePreview.tsx";
import { GlobalSettings } from "./components/GlobalSettings.tsx";
import { Stack } from "./components/Stack.tsx";
import { Stencils } from "./components/Stencils.tsx";
import { useAppContext } from "./context/AppContext.tsx";
import "./index.css";

export function App() {
  const { exportStl } = useAppContext();
  return (
    <div className="w-full mx-auto p-4 h-screen flex flex-col overflow-hidden">
      <h1 className="text-3xl font-bold mb-4 flex-shrink-0">
        3D printable stencil generator
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col min-h-0 gap-8">
          <div className="flex-shrink-0">
            <GlobalSettings />
          </div>
          <div className="flex-1 min-h-0">
            <Stencils />
          </div>
          <div className="flex-shrink-0">
            <Button onClick={exportStl}>Export STL</Button>
          </div>
        </div>
        <Stack size="fill">
          <CompositePreview />
        </Stack>
      </div>
    </div>
  );
}
