import styled from "styled-components";

export const SendButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family:
        "Futura", "Century Gothic", "Avant Garde", system-ui, sans-serif;
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition:
        background-color 150ms ease,
        opacity 150ms ease;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }

    &:disabled {
        background-color: #d4d4d4;
        color: #a3a3a3;
        cursor: not-allowed;
    }
`;

export const NavButton = styled.button<{ $position: "left" | "right" }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${(props) => (props.$position === "left" ? "left: 0;" : "right: 0;")}
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(26, 26, 26, 0.8);
    color: #ffffff;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    transition: background-color 150ms ease;
    z-index: 10;

    &:hover {
        background-color: #1a1a1a;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1a1a1a;
    color: #ffffff;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    padding: 0;
    transition: opacity 150ms ease;

    &:hover {
        opacity: 0.8;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }
`;
