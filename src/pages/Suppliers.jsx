import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SuppliersTable from "../components/suppliers/SuppliersTable";

const userStats = {
	totalSupp: 1,
  supp_contry :1 ,
  
} ;

const Suppliers = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='الــمـورديـن' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='مجموع الموردين'
						icon={UsersIcon}
						value={userStats.totalSupp.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard
						name='مجموع الدول '
						icon={UserCheck}
						value={userStats.supp_contry.toLocaleString()}
						color='#F59E0B'
					/>
				</motion.div>

				<SuppliersTable/>

				{/* USER CHARTS */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
				</div>
			</main>
		</div>
	);
};
export default Suppliers;
