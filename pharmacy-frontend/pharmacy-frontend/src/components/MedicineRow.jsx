// export default function MedicineRow({ med, onSell }) {

//   const getColor = (date) => {
//     if (!date) return "";

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const expiry = new Date(date + "T00:00:00");

//     const days = (expiry - today) / (1000 * 60 * 60 * 24);

//     if (days < 30) return "bg-red-200";
//     if (days < 90) return "bg-yellow-200";

//     return "";
//   };

//   const isExpired = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const expiry = new Date(date + "T00:00:00");

//     return expiry < today;
//   };

//   return (
//     <tr className={`${getColor(med.expiryDate)} transition`}>

//       <td className="p-3 font-semibold">{med.name}</td>

//       <td className="p-3">{med.salt}</td>

//       {/* ✅ STOCK COLUMN FIXED */}
//       <td className="p-3">
//         {med.stock}

//         {/* 🔄 Reached reorder level */}
//         {med.stock === med.reorderLevel && (
//           <span className="ml-2 text-xs text-yellow-700 font-semibold">
//             Reorder Level
//           </span>
//         )}

//         {/* 🚚 Auto adjusted (above reorder after refill) */}
//         {med.stock > med.reorderLevel && med.stock <= med.reorderLevel + 5 && (
//           <span className="ml-2 text-xs text-green-600 font-semibold">
//             Restocked
//           </span>
//         )}
//       </td>

//       {/* ✅ EXPIRY */}
//       <td className="p-3">
//         {med.expiryDate}
//         {isExpired(med.expiryDate) && (
//           <span className="ml-2 text-xs text-red-700 font-bold">
//             Expired
//           </span>
//         )}
//       </td>

//       {/* ✅ ACTION */}
//       <td className="p-3">
//         <button
//           onClick={() => onSell(med.id)}
//           disabled={isExpired(med.expiryDate)}
//           className={`px-4 py-1 rounded-lg text-white ${
//             isExpired(med.expiryDate)
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           Sell
//         </button>
//       </td>

//     </tr>
//   );
// }



export default function MedicineRow({ med, onSell }) {

  const getColor = (date) => {
    if (!date) return "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(date + "T00:00:00");
    const days = (expiry - today) / (1000 * 60 * 60 * 24);

    if (days < 30) return "bg-red-200";
    if (days < 90) return "bg-yellow-200";

    return "";
  };

  const isExpired = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(date + "T00:00:00");

    return expiry < today;
  };

  return (
    <tr className={`${getColor(med.expiryDate)} transition`}>

      <td className="p-3 font-semibold">{med.name}</td>

      <td className="p-3">{med.salt}</td>

      {/* ✅ FIXED STOCK UI */}
      <td className="p-3">
        {med.stock}

        {/* Only show alert if EXACTLY at reorder level */}
        {med.stock === med.reorderLevel && (
          <span className="ml-2 text-xs text-yellow-700 font-semibold">
            Min Level
          </span>
        )}
      </td>

      <td className="p-3">
        {med.expiryDate}
        {isExpired(med.expiryDate) && (
          <span className="ml-2 text-xs text-red-700 font-bold">
            Expired
          </span>
        )}
      </td>

      <td className="p-3">
        <button
          onClick={() => onSell(med.id)}
          disabled={isExpired(med.expiryDate)}
          className={`px-4 py-1 rounded-lg text-white ${
            isExpired(med.expiryDate)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Sell
        </button>
      </td>

    </tr>
  );
}