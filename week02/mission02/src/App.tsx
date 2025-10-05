import "./App.css";
import ContextPage from "./context/ContextPage";
import { ThemeProvider } from "./context/ThemeProvider";

export function App() {
  return (
    <ThemeProvider>
      <ContextPage></ContextPage>
    </ThemeProvider>
  );
}

export default App;
