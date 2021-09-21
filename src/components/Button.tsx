import styled from "styled-components";

const Button = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  color: #333;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:hover {
    background-color: #e5e5e5;
    color: #333;
  }
`;

export default Button;
