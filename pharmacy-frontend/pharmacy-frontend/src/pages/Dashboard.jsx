// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SearchBar from "../components/SearchBar";
// import MedicineTable from "../components/MedicineTable";
// import Receipt from "../components/Receipt";
// import API from "../services/api";

// export default function Dashboard() {
//   const [medicines, setMedicines] = useState([]);
//   const [receipt, setReceipt] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const [newMedicine, setNewMedicine] = useState({
//     name: "",
//     salt: "",
//     stock: "",
//     reorderLevel: "",
//     expiryDate: "",
//     supplierEmail: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     const res = await API.get("/medicines/getAllMedicine");
//     setMedicines(res.data);
//   };

//   // ================= SELL =================
//   const sellMedicine = async (id) => {
//     const qty = parseInt(prompt("Enter quantity to sell:"));
//     if (!qty) return;

//     try {
//       const res = await API.post("/medicines/sell", {
//         medicineId: id,
//         quantity: qty,
//       });

//       alert(res.data);

//       const soldMed = medicines.find((m) => m.id === id);

//       setReceipt({
//         name: soldMed.name,
//         qty,
//       });

//       fetchMedicines();
//     } catch (err) {
//       alert(err.response?.data || "Sell failed");
//     }
//   };

//   // ================= ADD MEDICINE =================
//   const handleAddMedicine = async () => {
//     try {
//       await API.post("/medicines/addMedicine", newMedicine);

//       alert("Medicine added successfully");

//       setShowForm(false);
//       setNewMedicine({
//         name: "",
//         salt: "",
//         stock: "",
//         reorderLevel: "",
//         expiryDate: "",
//         supplierEmail: "",
//       });

//       fetchMedicines();
//     } catch (err) {
//       alert("Error adding medicine");
//     }
//   };

//   // ================= SEARCH =================
//   const searchMedicine = async (query) => {
//     if (!query) return fetchMedicines();

//     const res = await API.get(`/medicines/searchMedicine?q=${query}`);
//     setMedicines(res.data);
//   };

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Pharmacy Dashboard
//         </h1>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg"
//           >
//             + Add Medicine
//           </button>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* ADD FORM */}
//       {showForm && (
//         <div className="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-2 gap-3">
//           <input placeholder="Name"
//             onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})} />

//           <input placeholder="Salt"
//             onChange={(e) => setNewMedicine({...newMedicine, salt: e.target.value})} />

//           <input type="number" placeholder="Stock"
//             onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})} />

//           <input type="number" placeholder="Reorder Level"
//             onChange={(e) => setNewMedicine({...newMedicine, reorderLevel: e.target.value})} />

//           <input type="date"
//             onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})} />

//           <input placeholder="Supplier Email"
//             onChange={(e) => setNewMedicine({...newMedicine, supplierEmail: e.target.value})} />

//           <button
//             onClick={handleAddMedicine}
//             className="col-span-2 bg-blue-500 text-white py-2 rounded-lg"
//           >
//             Save Medicine
//           </button>
//         </div>
//       )}

//       {/* SEARCH */}
//       <div className="mb-4">
//         <SearchBar setSearch={searchMedicine} />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow-md p-4">
//         <MedicineTable medicines={medicines} onSell={sellMedicine} />
//       </div>

//       {/* RECEIPT */}
//       <Receipt receipt={receipt} />
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MedicineTable from "../components/MedicineTable";
import Receipt from "../components/Receipt";
import API from "../services/api";

export default function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    salt: "",
    stock: "",
    reorderLevel: "",
    expiryDate: "",
    supplierEmail: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await API.get("/medicines/getAllMedicine");
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= SELL =================
  const sellMedicine = async (id) => {
    const qty = parseInt(prompt("Enter quantity to sell:"));
    if (!qty || qty <= 0) return;

    try {
      const res = await API.post("/medicines/sell", {
        medicineId: id,
        quantity: qty,
      });

      const soldMed = medicines.find((m) => m.id === id);

      setReceipt({
        name: soldMed.name,
        qty,
        message: res.data,
      });

      fetchMedicines();
    } catch (err) {
      alert(err.response?.data || "Sell failed");
    }
  };

  // ================= ADD MEDICINE =================
  const handleAddMedicine = async () => {
    const { name, salt, stock, reorderLevel, expiryDate, supplierEmail } = newMedicine;

    // Basic validation
    if (!name || !salt || !stock || !reorderLevel || !expiryDate || !supplierEmail) {
      alert("All fields are required");
      return;
    }

    try {
      await API.post("/medicines/addMedicine", newMedicine);

      setShowForm(false);
      setNewMedicine({
        name: "",
        salt: "",
        stock: "",
        reorderLevel: "",
        expiryDate: "",
        supplierEmail: "",
      });

      fetchMedicines();
    } catch (err) {
      alert("Error adding medicine");
    }
  };

  // ================= SEARCH =================
  const searchMedicine = async (query) => {
    if (!query) return fetchMedicines();

    try {
      const res = await API.get(`/medicines/searchMedicine?q=${query}`);
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Pharmacy Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            + Add Medicine
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ADD FORM */}
      {showForm && (
        <div className="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-2 gap-3">

          <input placeholder="Name"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})} />

          <input placeholder="Salt"
            value={newMedicine.salt}
            onChange={(e) => setNewMedicine({...newMedicine, salt: e.target.value})} />

          <input type="number" placeholder="Stock"
            value={newMedicine.stock}
            onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})} />

          <input type="number" placeholder="Reorder Level"
            value={newMedicine.reorderLevel}
            onChange={(e) => setNewMedicine({...newMedicine, reorderLevel: e.target.value})} />

          <input type="date"
            value={newMedicine.expiryDate}
            onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})} />

          <input placeholder="Supplier Email"
            value={newMedicine.supplierEmail}
            onChange={(e) => setNewMedicine({...newMedicine, supplierEmail: e.target.value})} />

          <button
            onClick={handleAddMedicine}
            className="col-span-2 bg-blue-500 text-white py-2 rounded-lg"
          >
            Save Medicine
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="mb-4">
        <SearchBar setSearch={searchMedicine} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <MedicineTable medicines={medicines} onSell={sellMedicine} />
        )}
      </div>

      {/* RECEIPT */}
      <Receipt receipt={receipt} />
    </div>
  );
}