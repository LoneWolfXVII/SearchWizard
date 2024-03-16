import ErrorFallback from "@/components/error/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";

function AppProvider({ children }) {
	return (
		<Router>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
                {children}
            </ErrorBoundary>
        </Router>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AppProvider;