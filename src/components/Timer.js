import React from "react";
import { useTimer } from "react-timer-hook";

const Timer = ({ expiryTimestamp }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => window.open("/", "_self") });

  return (
    <div className="card text-center bg-transparent border-0">
      <div className="card-body d-flex flex-column justify-content-center align-items-center my-2">
        <div style={{ textAlign: "center" }}>
          <p>patientez... </p>

          <div style={{ fontSize: "50px" }}>
            <span>{minutes}</span>:<span>{seconds}</span>
          </div>
          {/* <p>{isRunning ? 'Running' : 'Not running'}</p> 
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={resume}>Resume</button>
          <button onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 1800);
            restart(time)
          }}>Restart</button> */}
        </div>
      </div>
    </div>
  );
};

export default Timer;
