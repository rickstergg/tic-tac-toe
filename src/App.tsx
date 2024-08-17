import { Board } from "./components/Board";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { Flexbox } from "./components/layout";
import { useState } from "react";
import { Shortcuts } from "./components/Shortcuts";

function App() {
  const [size, setSize] = useState<number>(3);

  return (
    <ThemeProvider>
      <Flexbox
        column
        className="bg-grey-300 dark:bg-slate-800"
        align="center"
        justify="center"
        width="full"
        height="full"
        gap={6}
      >
        <Flexbox>
          <h1>Tic Tac Toe</h1>
        </Flexbox>
        <Board size={size} />
        <Flexbox row gap={4}>
          <Shortcuts keys={["R"]} postDescription="to reset" />
          <Shortcuts keys={["CTRL + Z"]} postDescription="to undo" />
        </Flexbox>
      </Flexbox>
    </ThemeProvider>
  );
}

export default App;
