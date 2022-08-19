import { MantineProvider, Text, Button, Stack } from "@mantine/core";
import { theme } from "./theme";
import { Feature, FeaturesGrid, MOCKDATA } from "./components/Feature";
import { IconTestPipe } from "@tabler/icons";

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Stack align="center" mt={50}>
        <Text size="xl" weight={500}>
          Welcome to Mantine!
        </Text>
        <Button>Click the button</Button>
      </Stack>
      <Feature icon={IconTestPipe} title={"Tut"} description={"des"} />
      <FeaturesGrid title={"data"} description={"des"} data={MOCKDATA}/>
    </MantineProvider>
  );
}