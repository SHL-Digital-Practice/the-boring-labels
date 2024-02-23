export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Dashboard</h1>

      <div>
        <label htmlFor="category-select">Category</label>
        <select id="category-select">
          <option>Rooms</option>
          <option>Area Plans</option>
        </select>

        <label htmlFor="parameter-select">Parameter</label>
        <select name="parameter" id="parameter-select">
          <option>Name</option>
          <option>Department</option>
        </select>
      </div>
    </main>
  );
}
