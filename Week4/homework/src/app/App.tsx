import { router } from "@shared/router/router";
import ThemeProvider from "@shared/styles/theme-provider";
import { RouterProvider } from "react-router";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
