import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Button,
} from '@mantine/core';
import { IconCookie, IconMessage2, IconLock, TablerIcon, IconTestPipe2, IconTestPipe, IconArrowRightCircle, IconCopyOff, IconFilter } from '@tabler/icons';

export const MOCKDATA = [
  {
    icon: IconArrowRightCircle,
    title: 'Sync',
    description:
      'Perform two-way sync between Notion and Todoist',
  },
  {
    icon: IconCopyOff,
    title: 'Remove Duplicates',
    description:
      'Identify and remove duplicate entries within Notion',
  },
  {
    icon: IconFilter,
    title: 'Log Filters',
    description:
      'Collect all filters from Notion',
  },
  {
    icon: IconLock,
    title: 'Lock Database',
    description:
      'Lock and unlock databases within Notion',
  },
];

interface FeatureProps {
  icon: TablerIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={25} stroke={2.25} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}  size={"xl"}>{title}</Text>
      <Text size="md" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
      <br />
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="xl" compact>
        {title}
      </Button>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

export function FeaturesGrid({ title, description, data = MOCKDATA }: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = data.map((feature, index) => <Feature {...feature} key={index} />);

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
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
        >
        {features}
      </SimpleGrid>
    </Container>
  );
}