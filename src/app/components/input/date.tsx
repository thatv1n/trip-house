import InputMask from 'react-input-mask';
import { Input } from "./input";

export const DateInput = ({ name, ...rest }) => {
  return (
    <InputMask mask="99.99.9999" {...rest}>
      {(props: any) => <Input name={name} {...props} />}
    </InputMask>
  );
};
