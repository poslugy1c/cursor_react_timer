import React from 'react';
import './App.css';
import Timer from './components/Timer';

function App() {
  return (
    <div className="App">
      <Timer
        time={10}
        step={10}
        progressBar={400}
        onTick={(time) => console.log(`Залишилось часу: ${time} с.`)}
        onTimeStart={() => console.log("Таймер запущено!")}
        onTimePause={() => console.log("Таймер на паузі!")}
        onTimeEnd={() => console.log("Час вийшов!")}
      />
    </div>
  );
}

export default App;
