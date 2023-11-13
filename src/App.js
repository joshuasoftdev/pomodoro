import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState('25:00');
  const [timerRunning, setTimerRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft('25:00');
    setTimerRunning(false);
    setIsSession(true);
    // Add code here to stop any running timer
  };

  const decrementBreak = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreak = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSession = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const incrementSession = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  const startStop = () => {
    setTimerRunning(!timerRunning);
  };

  useEffect(() => {
    let interval = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          let [minutes, seconds] = prevTime.split(':').map(Number);
          if (seconds) {
            seconds--;
          } else if (minutes) {
            minutes--;
            seconds = 59;
          } else {
            if (isSession) {
              setIsSession(false);
              return `${breakLength.toString().padStart(2, '0')}:00`;
            } else {
              setIsSession(true);
              return `${sessionLength.toString().padStart(2, '0')}:00`;
            }
          }
          return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });
      }, 1000);
    } else if (!timerRunning && timeLeft !== '00:00') {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, isSession, breakLength, sessionLength]);


  return (
    <div className="App">
      <h1>Pomodoro Clock</h1>
      <p id="break-label">Break Length</p>
      <p id="session-label">Session Length</p>
      <button id="break-decrement" onClick={decrementBreak}>-</button>
      <button id="session-decrement" onClick={decrementSession}>-</button>
      <button id="break-increment" onClick={incrementBreak}>+</button>
      <button id="session-increment" onClick={incrementSession}>+</button>
      <p id="break-length">{breakLength}</p>
      <p id="session-length">{sessionLength}</p>
      <p id="timer-label">{isSession ? 'Session' : 'Break'}</p>
      <p id="time-left">{timeLeft}</p>
      <button id="start_stop" onClick={startStop}>Start/Stop</button>
      <button id="reset" onClick={reset}>Reset</button>
    </div>
  );
}

export default App;