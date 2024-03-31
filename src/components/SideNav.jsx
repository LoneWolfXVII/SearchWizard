import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import PropTypes from 'prop-types';

const SideNav = ({ isSideNavOpen, toggleSideNav }) => {
	const bottomMenuList = [
		{
			group: '',
			items: [
				{
					link: '/app/dashboard',
					text: 'Dashboard',
					icon: '📶',
				},
				{
					link: '/app/settings',
					text: 'Settings',
					icon: '⚙️',
				},
				{
					link: '/app/help',
					text: 'Help',
					icon: '?',
				},
			],
		},
	];
	return (
		<div
			className={`fixed flex flex-col gap-4 ${
				isSideNavOpen ? 'w-[250px] min-w-[250px]' : 'w-[72px] min-w-[72px]'
			} border-r min-h-screen p-4 bg-purple-8`}
		>
			<div className="grow">
				<Button variant="ghost" onClick={toggleSideNav}>
					=
				</Button>
				<div>
					<Link
						to={'/app'}
						className={`flex gap-4 items-center cursor-pointer text-primary80 text-sm font-medium ${
							isSideNavOpen ? 'rounded-[200px]' : 'rounded-full pr-6'
						} px-5 py-3 mt-10 mb-8 bg-purple-4`}
					>
						<div>+</div>
						{isSideNavOpen ? <p>New Chat</p> : null}
					</Link>
					<div
						className={`flex gap-4 items-center cursor-pointer text-sm  text-primary80 font-medium p-3 rounded-md hover:bg-purple-4`}
					>
						{isSideNavOpen ? <p>Recent</p> : null}
					</div>
				</div>
			</div>
			<div>
				<div style={{ overflow: 'visible' }}>
					<div style={{ overflow: 'visible' }}>
						{bottomMenuList?.map((menu, key) => (
							<div key={key}>
								{menu?.items?.map((option, optionKey) => (
									<Link
										to={option.link}
										key={optionKey}
										className="flex gap-4 items-center cursor-pointer text-primary80 text-sm font-medium p-3 rounded-md hover:bg-purple-4"
									>
										{option.icon}
										{isSideNavOpen ? <p>{option.text}</p> : null}
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

SideNav.propTypes = {
	isSideNavOpen: PropTypes.bool.isRequired,
	toggleSideNav: PropTypes.func.isRequired,
};

export default SideNav;
