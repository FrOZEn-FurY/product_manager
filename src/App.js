import './App.css';
import {Main} from "./components/main";
import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
