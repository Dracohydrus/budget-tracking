import styled from 'styled-components';

const Btn = ({ ...props }) => (
  <button {...props} />
)

export const Button = styled(Btn)`
  background-color: lightgray;
  color: black;
  width: 100px;
  height: 40px;
  border-radius: 5px;
`;

export const PrimaryButton = styled(Button)`
  background-color: #67ac67;
`;

export const DangerButton = styled(Button)`
  background-color: #e45858;
`;