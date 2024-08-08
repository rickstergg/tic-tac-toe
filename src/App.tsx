import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <h1>Tic Tac Toe</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
    </ThemeProvider>
  );
}

export default App;
