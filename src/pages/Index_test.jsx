import { useState } from "react";

export default function Index() {
  const [test, setTest] = useState("Hello World");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">UptoSkill Dashboard</h1>
        <p className="text-gray-600 mb-4">{test}</p>
        <button 
          onClick={() => setTest("React is working!")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Button
        </button>
      </div>
    </div>
  );
}
