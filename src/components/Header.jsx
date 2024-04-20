import ThemeToggle from './ThemeToggle';
import { logout } from './features/login/service/auth.service';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
	return (
		<header className="flex justify-between px-5 py-4 text-lg text-primary100">
			<span>{'Irame.ai'}</span>
			<div className="flex gap-6">
				{/* <ThemeToggle /> */}

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-46 mr-5">
						<DropdownMenuGroup>
							<DropdownMenuItem
								className="text-primary100 text-sm font-medium"
								onClick={() => logout()}
							>
								<i className="bi-box-arrow-left mr-2 text-primary100"></i>
								Logout
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default Header;
