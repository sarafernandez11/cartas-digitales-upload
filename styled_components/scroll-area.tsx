import styled from "styled-components";
import { ScrollArea } from "radix-ui";

export const StyledScrollAreaRoot = styled(ScrollArea.Root)`
    width: 100%;
    overflow: hidden;
`;

export const StyledScrollAreaViewport = styled(ScrollArea.Viewport)`
    width: 100%;
    height: 100%;
`;

export const StyledScrollbar = styled(ScrollArea.Scrollbar)`
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    background-color: transparent;
    transition: background-color 150ms ease;
    height: 8px;
    flex-direction: column;

    &:hover {
        background-color: #f5f5f5;
    }
`;

export const StyledScrollThumb = styled(ScrollArea.Thumb)`
    flex: 1;
    background-color: #e5e5e5;
    border-radius: 9999px;
    position: relative;

    &:hover {
        background-color: #737373;
    }
`;
