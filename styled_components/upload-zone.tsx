import styled from "styled-components";
import { VisuallyHidden } from "radix-ui";

export const UploadContainer = styled.div<{ $isDragOver: boolean }>`
    background-color: ${(props) => (props.$isDragOver ? "#e5e5e5" : "#f5f5f5")};
    border-radius: 1rem;
    padding: 3rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: background-color 150ms ease;
    outline: ${(props) => (props.$isDragOver ? "2px solid #1a1a1a" : "none")};

    &:hover {
        background-color: #e5e5e5;
    }

    &:focus-visible {
        outline: 2px solid #a3a3a3;
        outline-offset: 2px;
    }
`;

export const UploadContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
`;

export const UploadText = styled.p`
    font-family: var(--font-montserrat), system-ui, sans-serif;
    font-size: 0.875rem;
    color: #737373;
    line-height: 1.4;
`;

export const StyledVisuallyHidden = styled(VisuallyHidden.Root)``;
