import { MantineProvider, Button, Stack } from "@mantine/core";
import { theme } from "./theme";
import { FeaturesGrid, MOCKDATA } from "./components/Feature";

const App = () => {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}>
        {/* <Button>Click the button</Button> */}
        <FeaturesGrid title={"Potion"} description={""} data={MOCKDATA}/>
      </Stack>
    </MantineProvider>
  );
}

export default App;