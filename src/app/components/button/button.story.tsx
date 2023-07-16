import { Button } from './button';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = ({ children, ...props }: any) => (
  <Button {...props}>{children}</Button>
);

Default.args = {
  variant: 'primary',
  fullSize: false,
  children: 'Button',
};
