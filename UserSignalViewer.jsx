// src/components/UserSignalViewer.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";  // firebase.js থেকে db ইমপোর্ট করা
import { doc, onSnapshot } from "firebase/firestore";

const UserSignalViewer = () => {
  const [signalData, setSignalData] = useState({ signal: "OFF", result: "" });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "signals", "currentSignal"), (doc) => {
      setSignalData(doc.data());
    });

    return () => unsubscribe();  // Cleanup on component unmount
  }, []);

  return (
    <div className="signal-viewer">
      <h2>Current Signal</h2>
      <div className="signal">
        Signal: <strong>{signalData.signal}</strong>
      </div>
      {signalData.result && (
        <div className="result">
          Result: <strong>{signalData.result}</strong>
        </div>
      )}
    </div>
  );
};

export default UserSignalViewer;
