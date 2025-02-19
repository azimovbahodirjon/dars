import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [age, setAge] = useState("");

  const [users, setUsers] = useState([]);
  console.log(users);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      id: uuidv4(),
      name,
      from,
      age,
    });
    setName("");
    setFrom("");
    setAge("");
  };
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            onChange={(e) => setFrom(e.currentTarget.value)}
            value={from}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            onChange={(e) => setAge(e.currentTarget.value)}
            value={age}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
