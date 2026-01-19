import styled from "styled-components";

export const ThumbnailContainer = styled.div`
    position: relative;
    background-color: #f5f5f5;
    border-radius: 0.75rem;
    aspect-ratio: 1 / 1;
    overflow: hidden;
`;

export const ThumbnailImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: scale-down;
`;

export const ThumbnailPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
`;

export const GridContainer = styled.div`
    position: relative;
`;

export const ThumbnailList = styled.div`
    display: flex;
    gap: 0.75rem;
    padding-bottom: 0.75rem;
    touch-action: pan-x;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
`;

export const ThumbnailItem = styled.div`
    flex-shrink: 0;
    width: 100px;
    scroll-snap-align: start;
`;
