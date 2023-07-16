import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DateInput } from './date';
import { TimeInput } from './time';

const TemplateTime: ComponentStory<typeof TimeInput> = (args) => <TimeInput {...args} />

export const Time: ComponentStory<typeof TimeInput> = TemplateTime.bind({});

Time.args = {
};

const TemplateDate: ComponentStory<typeof DateInput> = (args) => <DateInput {...args} />

export const Date: ComponentStory<typeof DateInput> = TemplateDate.bind({});

Date.args = {
};

export default {
  title: 'Components/DateTime',
  component: TimeInput,
} as ComponentMeta<typeof TimeInput>;
