"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Tooltip } from "radix-ui";
import ImageThumbnail from "./image-thumbnail";
// Import styled components from dedicated folder
import {
    GridContainer,
    ThumbnailList,
    ThumbnailItem,
    NavButton,
    StyledScrollAreaRoot,
    StyledScrollAreaViewport,
    StyledScrollbar,
    StyledScrollThumb,
    StyledTooltipContent,
    StyledTooltipArrow,
} from "@/styled_components";

interface ImageThumbnailGridProps {
    images: File[];
    onRemove: (index: number) => void;
    onAddMore: () => void;
}

export default function ImageThumbnailGrid({
    images,
    onRemove,
}: ImageThumbnailGridProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            if (scrollContainerRef.current) {
                const { scrollWidth, clientWidth, scrollLeft } =
                    scrollContainerRef.current;
                setShowLeftButton(scrollLeft > 10);
                setShowRightButton(
                    scrollWidth > clientWidth &&
                        scrollLeft < scrollWidth - clientWidth - 10
                );
            }
        };
        checkScroll();
        const container = scrollContainerRef.current;
        container?.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);
        return () => {
            container?.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [images]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -120,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 120,
                behavior: "smooth",
            });
        }
    };

    const displayCount = Math.max(3, images.length);
    const slots = Array.from(
        { length: displayCount },
        (_, i) => images[i] || null
    );

    return (
        <GridContainer>
            <Tooltip.Provider>
                <StyledScrollAreaRoot>
                    <StyledScrollAreaViewport ref={scrollContainerRef}>
                        <ThumbnailList>
                            {slots.map((file, index) => (
                                <ThumbnailItem key={index}>
                                    <ImageThumbnail
                                        file={file}
                                        onRemove={
                                            file
                                                ? () => onRemove(index)
                                                : undefined
                                        }
                                    />
                                </ThumbnailItem>
                            ))}
                        </ThumbnailList>
                    </StyledScrollAreaViewport>
                    <StyledScrollbar orientation="horizontal">
                        <StyledScrollThumb />
                    </StyledScrollbar>
                </StyledScrollAreaRoot>

                {showLeftButton && (
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <NavButton
                                onClick={scrollLeft}
                                $position="left"
                                aria-label="Desplazar a la izquierda"
                            >
                                <ChevronLeft size={20} />
                            </NavButton>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <StyledTooltipContent side="bottom" sideOffset={5}>
                                <p>Anterior</p>
                                <StyledTooltipArrow />
                            </StyledTooltipContent>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                )}

                {showRightButton && (
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <NavButton
                                onClick={scrollRight}
                                $position="right"
                                aria-label="Desplazar a la derecha"
                            >
                                <ChevronRight size={20} />
                            </NavButton>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <StyledTooltipContent side="bottom" sideOffset={5}>
                                <p>Siguiente</p>
                                <StyledTooltipArrow />
                            </StyledTooltipContent>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                )}
            </Tooltip.Provider>
        </GridContainer>
    );
}
