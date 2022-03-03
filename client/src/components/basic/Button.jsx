import styled from 'styled-components';

export const Button = styled.button`
  background-color: lightgray;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const PrimaryButton = styled(Button)`
  background-color: #67ac67;
`;

export const DangerButton = styled(Button)`
  background-color: #e45858;
`;