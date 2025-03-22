import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SuppliersTable = [
  { id: 1, name: "John Doe", email: "john@example.com", country: "Egypt" },
];

const SupplierTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(SuppliersTable);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = SuppliersTable.filter(
      (supp) =>
        supp.name.toLowerCase().includes(term) ||
        supp.email.toLowerCase().includes(term)
    );
    setFilteredSuppliers(filtered);
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>المـورديـن</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search suppliers...'
            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className='overflow-x-auto '>
        <table className='min-w-full divide-y divide-gray-700 '>
          <thead>
            <tr>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider'>
                الاســم
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider'>
                الأميل
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider'>
                الـدولة
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700  '>
            {filteredSuppliers.map((supp) => (
              <motion.tr
                key={supp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className='px-2 py-4 whitespace-nowrap flex '>
                  <div className='flex items-center justify-end'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
                        {supp.name.charAt(0)}
                      </div>
                    </div>
                    <div className='mr-4 '>
                      <div className='text-sm font-medium text-gray-100'>{supp.name}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right'>
                  <div className='text-sm text-gray-300'>{supp.email}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right'>
                  <div className='text-sm text-gray-300'>{supp.country}</div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SupplierTable;