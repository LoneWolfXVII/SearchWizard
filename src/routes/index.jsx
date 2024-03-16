import { Route, Routes } from "react-router-dom";
import SignInSignUp from "@/components/features/login/page";
import NewChat from "@/components/features/new-chat/page";
import Dashboard from "@/components/features/dashboard/page";
import Help from "@/components/features/help/page";
import Layout from "@/components/Layout";
import Settings from "@/components/features/settings/page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<SignInSignUp />} />
      <Route path="/app/*" element={
        <Layout>
          <Routes>
            <Route path="new-chat" element={<NewChat />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
};

export default AppRoutes;
