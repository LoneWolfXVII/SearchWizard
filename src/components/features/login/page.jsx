import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignInSignUp = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/app');
    }
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <Button onClick={() => handleRedirect()}>Sign In</Button>
        </div>
    );
}
 
export default SignInSignUp;