import { Routes, Route } from 'react-router-dom'
import { MantineProvider, Button, Stack } from "@mantine/core";
import Layout from './components/Layout';
import { theme } from "./theme";
import { FeaturesGrid, MOCKDATA } from "./components/FeatureExample";
import AuthenticationTitle from "./components/Login";
import APISetup from "./components/APISetup";

const App = (): JSX.Element => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* <Route index element={<FrontPage/>} /> */}
      </Route>
    </Routes>
  );
}

export default App;