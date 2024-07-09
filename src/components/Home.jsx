import { useState } from 'react';
import { joinWaitlist } from '../types/home.content';
import DashboardAndCustomization from './DashboardAndCustomization';
import Dialog from './Dialog';
import FAQs from './FAQs';
import { Footer } from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';
import JoinWaitlist from './JoinWaitlist';
import UnlockDataPotential from './UnlockDataPotential';
import TransformData from './TransformDataIntoAction';
import AdaptiveWorkspace from './AdaptiveWorkspace';
import LearningAndEvolution from './LearningAndEvolution';
import KeepDataPrivate from './KeepDataPrivate';
import StillHaveQuestions from './StillHaveQuestions';

const Home = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="">
			<Header setOpen={setOpen} />
			<HeroSection setOpen={setOpen} />
			<UnlockDataPotential />
			<TransformData />
			<AdaptiveWorkspace />
			<LearningAndEvolution />
			<DashboardAndCustomization />
			<KeepDataPrivate />
			<FAQs />
			<StillHaveQuestions setOpen={setOpen} />
			<Footer />
			{open ? (
				<div className="">
					<Dialog
						data={joinWaitlist}
						open={open}
						setOpen={setOpen}
						width={'max-w-[500px]'}
					>
						<JoinWaitlist setOpen={setOpen} />
					</Dialog>
				</div>
			) : null}
		</div>
	);
};

export default Home;
