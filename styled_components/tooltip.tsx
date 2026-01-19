import styled from "styled-components";
import { Tooltip } from "radix-ui";

export const StyledTooltipContent = styled(Tooltip.Content)`
    background-color: #1a1a1a;
    color: #ffffff;
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    font-family: var(--font-montserrat), system-ui, sans-serif;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    z-index: 50;
    animation: slideUpAndFade 200ms ease-out;
`;

export const StyledTooltipArrow = styled(Tooltip.Arrow)`
    fill: #1a1a1a;
`;
