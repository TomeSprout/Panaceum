import React from 'react'
import {
  ThemeIcon,
  Text,
  TextInput,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Button,
} from "@mantine/core";
import {
  IconKey,
  IconLock,
  TablerIcon,
  IconArrowRightCircle,
  IconCopyOff,
  IconFilter,
} from "@tabler/icons";

export const MOCKDATA = [
  {
    icon: IconKey,
    title: "Notion API Key",
    description: "Enter your Notion API Key here",
    placeholder: "Notion Key",
  },
  {
    icon: IconKey,
    title: "Todoist API Key",
    description: "Enter your Todoist API Key here",
    placeholder: "Todoist Key",
  },
];

interface APIProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
  placeholder: string;
}

function API({ icon: Icon, title, description, placeholder }: APIProps) {
  return (
    <div>
      <TextInput
        placeholder={placeholder}
        radius={"md"}
        size={"lg"}
        icon={<Icon size={25} stroke={2.5} />}
      />
      <Text size="lg" color="dimmed" style={{ lineHeight: 3}}>
        {description}
      </Text>
      <br />
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 90 }}
        size="xl"
        compact
      >
        {"Submit"}
      </Button>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 1,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: APIProps[];
}

export function APISetup({
  title,
  description,
  data = MOCKDATA,
}: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => (
    <API {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>{title}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={2}
        spacing={theme.spacing.xl * 5}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "xl" },
          { maxWidth: 755, cols: 1, spacing: "xl" },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

export default APISetup