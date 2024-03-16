import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {

  return (
    <header className="flex justify-between px-5 py-4 text-lg text-primary100">
      <span>{"Irame.ai"}</span>
      <div className="flex gap-6">
        {/* <ThemeToggle /> */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
