import { useEffect, createContext } from 'react';
import useSWR from 'swr';
import Rx from './Rx';
import Swr from './Swr';
import Compress from "./Compress.tsx";

function App() {
  return (
    <Compress/>
  )
}

export default App;
