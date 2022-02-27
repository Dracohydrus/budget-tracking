import styled from 'styled-components';

export const Button = styled.button`
  background-color: black;
  color: white;
  width: 100px;
  height: 40px;
`;

export const PrimaryButton = styled(Button)`
  background-color: green;
`;

export const DangerButton = styled(Button)`
  background-color: red;
`;
