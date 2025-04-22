import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Web3Provider } from "./contexts/Web3Context";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import WalletConnector from "./components/common/WalletConnector";
import "./styles/tailwind.css";

const Home = lazy(() => import("./pages/Home"));
const BlockExplorer = lazy(() => import("./pages/BlockExplorer"));
const TokenLaunch = lazy(() => import("./pages/TokenLaunch"));
const AIIntegration = lazy(() => import("./pages/AIIntegration"));
const DeveloperTools = lazy(() => import("./pages/DeveloperTools"));

const App = () => {
  return (
    <Web3Provider>
      <ErrorBoundary>
        <Router>
          <div className="p-4 flex justify-between items-center">
            <LanguageSwitcher />
            <WalletConnector />
          </div>
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/block-explorer" component={BlockExplorer} />
              <Route path="/token-launch" component={TokenLaunch} />
              <Route path="/ai-integration" component={AIIntegration} />
              <Route path="/developer-tools" component={DeveloperTools} />
            </Switch>
          </Suspense>
        </Router>
      </ErrorBoundary>
    </Web3Provider>
  );
};

export default App;