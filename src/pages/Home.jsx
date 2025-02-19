function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="from">From</label>
          <input type="text" id="from" />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="text" id="age" />
        </div>
      </form>
    </div>
  );
}

export default Home;
