import jsPDF from "jspdf";
export default function Receipt({ receipt }) {
  if (!receipt) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Pharmacy Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Medicine: ${receipt.name}`, 20, 40);
    doc.text(`Quantity Sold: ${receipt.qty}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 60);

    doc.save("receipt.pdf");
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-2">Receipt</h3>

      <p>Medicine: {receipt.name}</p>
      <p>Quantity Sold: {receipt.qty}</p>

      <button
        onClick={downloadPDF}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Download PDF
      </button>
    </div>
  );
}