import { Board } from "./components/Board";
import { ThemeProvider } from "./components/ThemeProvider";
import { Flexbox } from "./components/layout";
import { useState } from "react";

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
        gap={4}
      >
        <h1>Tic Tac Toe</h1>
        <Board size={size} />
      </Flexbox>
    </ThemeProvider>
  );
}

export default App;
