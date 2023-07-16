import { FC } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TabContext } from './tab-context';
import { Tabs } from './tabs';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';

interface TemplateProps {
  values: string[]
}

const Story: FC<TemplateProps> = ({ values }) => {
  return (
    <TabContext defaultValue={values[0]}>
      <Tabs>
        {values.map((value) => <Tab key={value} value={value}>{value} label</Tab>)}
      </Tabs>
      {values.map((value) => (
        <TabPanel key={`${value}Panel`} value={value}>
          Content of {value}
        </TabPanel>
      ))}
    </TabContext>
  );
};

const Template: ComponentStory<typeof Story> = (args) => <Story {...args} />

export const Default: ComponentStory<typeof Story> = Template.bind({});

Default.args = {
  values: ['Tab 1', 'Tab 2', 'Tab 3'],
};

export default {
  title: 'Components/Tab',
  component: Story,
} as ComponentMeta<typeof Story>;
