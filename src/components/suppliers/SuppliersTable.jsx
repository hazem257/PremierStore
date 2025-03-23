import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Edit, Trash2, Plus, Download } from "lucide-react";
import { utils, writeFile } from "xlsx-js-style";

const COUNTRIES = [
  "مصر",
  "السعودية",
  "الإمارات",
  "الجزائر",
  "المغرب",
  "العراق",
  "الكويت",
  "قطر",
  "عُمان",
  "لبنان",
  "سوريا",
  "الأردن",
  "اليمن",
  "ليبيا",
  "تونس",
  "السودان",
  "الصومال",
  "موريتانيا",
  "البحرين",
  "فلسطين"
];

const initialSuppliers = [
  { id: 1, name: "محمد أحمد", email: "mohamed@example.com", country: "مصر" },
];

const SupplierTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    country: "",
  });

  // Handlers
  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());
  
  const handleDelete = (supplierId) => 
    setSuppliers(suppliers.filter(supp => supp.id !== supplierId));

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setEditedData({...supplier});
  };

  const handleSaveEdit = () => {
    setSuppliers(suppliers.map(s => 
      s.id === editingSupplier.id ? {...editedData} : s
    ));
    setEditingSupplier(null);
  };

  const handleAdd = () => {
    setShowAddModal(true);
    setNewSupplier({ name: "", email: "", country: "" });
  };

  const handleSaveNew = () => {
    if (!newSupplier.name || !newSupplier.email || !newSupplier.country) return;
    
    const newId = Math.max(...suppliers.map(s => s.id)) + 1;
    setSuppliers([...suppliers, {...newSupplier, id: newId}]);
    setShowAddModal(false);
  };

  const handleCountryChange = (e, isEditModal = false) => {
    const value = e.target.value;
    isEditModal 
      ? setEditedData({...editedData, country: value}) 
      : setNewSupplier({...newSupplier, country: value});
  };

  // Export to Excel
  const handleExportExcel = () => {
    const data = [
      ["الاسم", "البريد الإلكتروني", "الدولة"],
      ...suppliers.map(supp => [supp.name, supp.email, supp.country])
    ];

    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "الموردين");

    // تنسيق العناوين
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F46E5" } },
      alignment: { horizontal: "center" }
    };

    for (let col = 0; col < data[0].length; col++) {
      const cell = utils.encode_cell({ r: 0, c: col });
      ws[cell].s = headerStyle;
    }

    // تحديد عرض الأعمدة
    ws['!cols'] = [{ wch: 25 }, { wch: 30 }, { wch: 20 }];

    writeFile(wb, "الموردين.xlsx");
  };

  // Filtered Data
  const filteredSuppliers = suppliers.filter(supp => 
    supp.name.toLowerCase().includes(searchTerm) ||
    supp.email.toLowerCase().includes(searchTerm) ||
    supp.country.toLowerCase().includes(searchTerm)
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4 text-white">إضافة مورد جديد</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="الاسم"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                className="bg-gray-700 text-white p-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                className="bg-gray-700 text-white p-2 rounded w-full"
              />
              <select
                value={newSupplier.country}
                onChange={(e) => handleCountryChange(e)}
                className="bg-gray-700 text-white p-2 rounded w-full"
              >
                <option value="">اختر الدولة</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveNew}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4 text-white">تعديل المورد</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                className="bg-gray-700 text-white p-2 rounded w-full"
              />
              <input
                type="email"
                value={editedData.email}
                onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                className="bg-gray-700 text-white p-2 rounded w-full"
              />
              <select
                value={editedData.country}
                onChange={(e) => handleCountryChange(e, true)}
                className="bg-gray-700 text-white p-2 rounded w-full"
              >
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingSupplier(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-100">المـورديـن</h2>
          <span className="bg-gray-700 text-green-400 px-3 py-1 rounded-full text-sm">
            العدد: {suppliers.length}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
        
          <div className="relative">
            <input
              type="text"
              placeholder="بحث..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">الاســم</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">الأميل</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">الـدولة</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">الإجراءات</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-700">
            {filteredSuppliers.map(supp => (
              <motion.tr
                key={supp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-2 py-4">
                  <div className="flex items-center justify-end">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {supp.name.charAt(0)}
                      </div>
                    </div>
                    <div className="mr-4">
                      <div className="text-sm font-medium text-gray-100">{supp.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-sm text-gray-300">{supp.email}</td>
                <td className="px-6 py-4 text-right text-sm text-gray-300">{supp.country}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleEdit(supp)}
                    className="text-indigo-400 hover:text-indigo-300 mx-2"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(supp.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <center>
      <div className=" btn-cont">
      <button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} />
              إضافة مورد
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download size={18} />
              تصدير إكسل
            </button>
          
          </div>
          </center>
    </motion.div>
  );
};

export default SupplierTable;
