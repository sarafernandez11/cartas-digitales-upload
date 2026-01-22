"use client";

import styled, { keyframes } from "styled-components";
import { Toast } from "radix-ui";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const swipeOut = keyframes`
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(100%);
  }
`;

export const ToastViewport = styled(Toast.Viewport)`
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 320px;
    max-width: calc(100vw - 48px);
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 9999;
    outline: none;

    @media (max-width: 480px) {
        bottom: 16px;
        right: 16px;
        left: 16px;
        width: auto;
        max-width: none;
    }
`;

export const ToastRoot = styled(Toast.Root)`
    background-color: #1a1a1a;
    color: #ffffff;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow:
        0 10px 38px -10px rgba(0, 0, 0, 0.35),
        0 10px 20px -15px rgba(0, 0, 0, 0.2);
    font-family: "Montserrat", system-ui, sans-serif;

    &[data-state="open"] {
        animation: ${slideIn} 200ms ease-out;
    }

    &[data-state="closed"] {
        animation: ${slideOut} 150ms ease-in;
    }

    &[data-swipe="move"] {
        transform: translateX(var(--radix-toast-swipe-move-x));
    }

    &[data-swipe="cancel"] {
        transform: translateX(0);
        transition: transform 200ms ease-out;
    }

    &[data-swipe="end"] {
        animation: ${swipeOut} 100ms ease-out;
    }
`;

export const ToastTitle = styled(Toast.Title)`
    font-family: "Futura", "Century Gothic", "Avant Garde", sans-serif;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
`;

export const ToastDescription = styled(Toast.Description)`
    font-family: "Montserrat", system-ui, sans-serif;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.4;
`;

export const ToastAction = styled(Toast.Action)`
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    font-family: "Futura", "Century Gothic", "Avant Garde", sans-serif;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #ffffff;
    cursor: pointer;
    margin-top: 8px;
    align-self: flex-end;
    transition: background-color 150ms ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.25);
    }

    &:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
    }
`;

export const ToastClose = styled(Toast.Close)`
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition:
        color 150ms ease,
        background-color 150ms ease;

    &:hover {
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
    }
`;

// Success variant
export const ToastRootSuccess = styled(ToastRoot)`
    background-color: #166534;
`;

// Error variant
export const ToastRootError = styled(ToastRoot)`
    background-color: #991b1b;
`;

// Warning variant
export const ToastRootWarning = styled(ToastRoot)`
    background-color: #92400e;
`;
