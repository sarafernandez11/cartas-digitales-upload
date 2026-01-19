import styled from "styled-components";
import { DropdownMenu } from "radix-ui";

export const StyledDropdownTrigger = styled(DropdownMenu.Trigger)`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    border: none;
    background-color: transparent;
    color: #1a1a1a;
    font-family: "Futura", "Century Gothic", "Avant Garde", system-ui,
        sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 150ms ease;

    &:hover {
        opacity: 0.7;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }
`;

export const StyledDropdownContent = styled(DropdownMenu.Content)`
    min-width: 120px;
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 0.25rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    border: 1px solid #e5e5e5;
    z-index: 50;
    animation: fadeIn 200ms ease-out;
`;

export const StyledDropdownItem = styled(DropdownMenu.Item)`
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
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
`;
