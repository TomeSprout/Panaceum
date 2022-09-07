import { MantineProvider, Button, Stack } from "@mantine/core";
import { theme } from "./theme";
import { FeaturesGrid, MOCKDATA } from "./components/FeatureExample";
import APISetup from "./components/APISetup";

const App = () => {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}>
        <APISetup title={"Potion"} description={""} />
        <FeaturesGrid title={"Potion"} description={""} data={MOCKDATA}/>
      </Stack>
    </MantineProvider>
  );
}

export default App;