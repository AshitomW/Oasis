"use client";
import React, { useState } from "react";

export default function Counter({ users }) {
  const [counter, setCount] = useState(0);

  console.log(users);
  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((count) => count + 1)}>{counter}</button>
    </div>
  );
}
