import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import ProductsTable from "../components/products/ProductsTable";

const ProductsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='الـمــنـتـجـات' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='مجموع المنتجات' icon={Package} value={""} color='#6366F1' />
					<StatCard name='الأعلى مبيعاَ' icon={TrendingUp} value={""} color='#10B981' />
					<StatCard name='الأقل مخزوناَ' icon={AlertTriangle} value={""} color='#F59E0B' />
					<StatCard name='مجموع المكسب' icon={DollarSign} value={""} color='#EF4444' />
				</motion.div>

				<ProductsTable />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
				</div>
			</main>
		</div>
	);
};
export default ProductsPage;
