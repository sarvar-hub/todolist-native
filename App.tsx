import { QueryProvider } from "@src/providers";
import Main from "@src/views/Main";

export default function App() {
  return (
    <QueryProvider>
      <Main />
    </QueryProvider>
  );
}
