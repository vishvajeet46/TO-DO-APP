// react + vite fast hota hai.
// command to setup react + vite :- npm create vite@latest

// import React from 'react' (we do not need to write this here because we are using react vite.)
import Todo from './components/Todo'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster></Toaster>
      <Todo/>
    </div>
  )
}

export default App
