import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";

const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='نــظــرة عـامـــة' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='مــجــمــوع المـبــيــعــات' icon={Zap} value='' color='#6366F1' />
					<StatCard name='المستخدمين الجدد' icon={Users} value='' color='#8B5CF6' />
					<StatCard name='مجموع المنتجات ' icon={ShoppingBag} value='' color='#EC4899' />
					<StatCard name='معدل النمو' icon={BarChart2} value='' color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
				
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
