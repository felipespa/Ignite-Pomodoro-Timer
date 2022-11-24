import styled from "styled-components";

// Base
const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["green-500"]};
  font-weight: bold;
  font-size: 1.123rem;
  padding: 0 0.5rem;
  color: ${(props) => props.theme["gray-100"]};

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme["gray-500"]};
  }
`;

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  gap: 0.5rem;

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;
  padding: 0;
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
