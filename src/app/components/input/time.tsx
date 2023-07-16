import InputMask from 'react-input-mask';
import { Input } from "./input";

export const TimeInput = ({ name, ...rest }) => {
  return (
    <InputMask mask="99:99" {...rest}>
      {(props: any) => <Input name={name} {...props} />}
    </InputMask>
  );
};
