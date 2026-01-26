import styled, { keyframes, css } from "styled-components"
import { DropdownMenu } from "radix-ui"

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`

const pulseAnimation = css`
  animation: ${pulse} 1.5s ease-in-out infinite;
`

export const MenuListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const MenuCard = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 0.75rem;
  transition: background-color 150ms ease;
`

export const MenuPreviewWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #e5e5e5;
`

export const MenuPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const MenuPreviewLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
`

export const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #d4d4d4;
  border-top-color: #737373;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const MenuInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const MenuName = styled.h3`
  font-family: "Futura", "Century Gothic", "Avant Garde", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const MenuStatus = styled.p<{ $processing?: boolean }>`
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.75rem;
  color: ${(props) => (props.$processing ? "#d97706" : "#22c55e")};
  margin: 0.25rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`

export const StatusDot = styled.span<{ $processing?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.$processing ? "#d97706" : "#22c55e")};
  ${(props) => props.$processing && pulseAnimation}
`

export const MenuActions = styled.div`
  flex-shrink: 0;
`

export const MenuActionButton = styled(DropdownMenu.Trigger)<{ disabled?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "#d4d4d4" : "#737373")};
  transition: background-color 150ms ease, color 150ms ease;

  &:hover:not(:disabled) {
    background-color: #e5e5e5;
    color: #1a1a1a;
  }

  &:focus-visible {
    outline: 2px solid #a3a3a3;
    outline-offset: 2px;
  }

  &:disabled {
    pointer-events: none;
  }
`

export const MenuDropdownContent = styled(DropdownMenu.Content)`
  min-width: 160px;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  border: 1px solid #e5e5e5;
  z-index: 50;
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const MenuDropdownItem = styled(DropdownMenu.Item)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  font-family: var(--font-montserrat), system-ui, sans-serif;
  color: #1a1a1a;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: background-color 150ms ease;

  &:hover,
  &:focus,
  &[data-highlighted] {
    background-color: #f5f5f5;
  }

  svg {
    color: #737373;
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
`

export const EmptyStateIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 9999px;
  margin-bottom: 1rem;
  color: #737373;
`

export const EmptyStateTitle = styled.h3`
  font-family: "Futura", "Century Gothic", "Avant Garde", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
`

export const EmptyStateText = styled.p`
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.875rem;
  color: #737373;
  margin: 0;
`

export const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  margin-left: -0.5rem;
  border: none;
  background-color: transparent;
  color: #1a1a1a;
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 150ms ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus-visible {
    outline: 2px solid #a3a3a3;
    outline-offset: 2px;
  }
`

export const ViewMenusButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e5e5e5;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 9999px;
  transition: background-color 150ms ease, border-color 150ms ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #d4d4d4;
  }

  &:focus-visible {
    outline: 2px solid #a3a3a3;
    outline-offset: 2px;
  }
`

export const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`

export const ColorPickerRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const ColorPickerLabel = styled.label`
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const ColorPickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const ColorInput = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 48px;
  height: 48px;
  border: 2px solid #e5e5e5;
  border-radius: 0.75rem;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  background-color: transparent;
  transition: border-color 150ms ease;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 0.5rem;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 0.5rem;
  }

  &:hover {
    border-color: #a3a3a3;
  }

  &:focus-visible {
    outline: 2px solid #a3a3a3;
    outline-offset: 2px;
  }
`

export const ColorHexInput = styled.input`
  flex: 1;
  font-family: var(--font-montserrat), system-ui, sans-serif;
  font-size: 0.875rem;
  color: #1a1a1a;
  background-color: #f5f5f5;
  border: none;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  text-transform: uppercase;
  transition: background-color 150ms ease;

  &:hover {
    background-color: #ebebeb;
  }

  &:focus {
    outline: none;
    background-color: #e5e5e5;
  }

  &::placeholder {
    color: #a3a3a3;
    text-transform: none;
  }
`

export const ColorPreviewBox = styled.div<{ $color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  background-color: ${(props) => props.$color};
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`
