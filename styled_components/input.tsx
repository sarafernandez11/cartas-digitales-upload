import styled from "styled-components"

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

export const InputLabel = styled.label`
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #525252;
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 1rem;
  color: #1a1a1a;
  background-color: #f5f5f5;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: #a3a3a3;
  }

  &:hover {
    background-color: #efefef;
  }

  &:focus {
    background-color: #ffffff;
    border-color: #1a1a1a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
