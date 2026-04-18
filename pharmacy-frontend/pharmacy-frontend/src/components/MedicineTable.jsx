import MedicineRow from "./MedicineRow";

export default function MedicineTable({ medicines, onSell }) {
  return (
    <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden">
      
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="p-3">Name</th>
          <th className="p-3">Salt</th>
          <th className="p-3">Stock</th>
          <th className="p-3">Expiry</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

      <tbody className="bg-white">
        {medicines.map((med) => (
          <MedicineRow key={med.id} med={med} onSell={onSell} />
        ))}
      </tbody>

    </table>
  );
}