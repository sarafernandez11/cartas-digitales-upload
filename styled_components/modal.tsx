import styled, { keyframes } from "styled-components";
import { Dialog } from "radix-ui";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const dotPulse = keyframes`
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const ModalOverlay = styled(Dialog.Overlay)`
    position: fixed;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 50;
    animation: ${fadeIn} 200ms ease-out;
`;

export const ModalContent = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 400px;
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    z-index: 51;
    animation: ${scaleIn} 200ms ease-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

export const ModalTitle = styled(Dialog.Title)`
    font-family:
        "Futura", "Century Gothic", "Avant Garde", system-ui, sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.025em;
`;

export const ModalDescription = styled(Dialog.Description)`
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: 0.9375rem;
    color: #737373;
    line-height: 1.5;
    margin-bottom: 2rem;
`;

export const DotsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
`;

export const Dot = styled.span<{ $delay: number }>`
    width: 12px;
    height: 12px;
    background-color: #1a1a1a;
    border-radius: 9999px;
    animation: ${dotPulse} 1.4s ease-in-out infinite;
    animation-delay: ${(props) => props.$delay}ms;
`;

export const ModalButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
`;

export const ModalPrimaryButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    font-family:
        "Futura", "Century Gothic", "Avant Garde", system-ui, sans-serif;
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: opacity 150ms ease;

    &:hover {
        opacity: 0.9;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }
`;

export const ModalSecondaryButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    font-family:
        "Futura", "Century Gothic", "Avant Garde", system-ui, sans-serif;
    background-color: transparent;
    color: #1a1a1a;
    padding: 0.875rem 1.5rem;
    border: 2px solid #e5e5e5;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition:
        border-color 150ms ease,
        background-color 150ms ease;

    &:hover {
        border-color: #1a1a1a;
        background-color: #fafafa;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }
`;
