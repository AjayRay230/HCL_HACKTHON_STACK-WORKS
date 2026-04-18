export default function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name or salt..."
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}