import { useState } from 'react';
import { joinWaitlist } from '../types/home.content';
import AutomatedAnomalyDetection from './AutomatedAnomalyDetection';
import CustomTaskLearning from './CustomTaskLearning';
import DashboardAndCustomization from './DashboardAndCustomization';
import DeepDive from './DeepDive';
import Dialog from './Dialog';
import FAQs from './FAQs';
import { Footer } from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';
import HowDoesItWork from './HowDoesItWork';
import OurSolutions from './OurSolutions';
import SelfCorrectingIntelligence from './SelfCorrectingIntelligence';
import SmartDataExploration from './SmartDataExploration';
import JoinWaitlist from './JoinWaitlist';
import VideoSection from './VideoSection';
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
			{/* <VideoSection /> */}
			<UnlockDataPotential />
			<TransformData />
			<AdaptiveWorkspace />
			<LearningAndEvolution />
			<DashboardAndCustomization />
			<KeepDataPrivate />
			{/* <DeepDive /> */}
			{/* <AutomatedAnomalyDetection /> */}
			{/* <CustomTaskLearning /> */}
			{/* <SelfCorrectingIntelligence /> */}
			{/* <HowDoesItWork /> */}
			{/* <OurSolutions /> */}
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
