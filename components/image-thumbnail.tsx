"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Tooltip } from "radix-ui";

import {
    ThumbnailContainer,
    ThumbnailImage,
    ThumbnailPlaceholder,
    RemoveButton,
    StyledVisuallyHidden,
    StyledTooltipContent,
    StyledTooltipArrow,
} from "@/styled_components";

interface ImageThumbnailProps {
    file: File | null;
    onRemove?: () => void;
}

export default function ImageThumbnail({
    file,
    onRemove,
}: ImageThumbnailProps) {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview("");
        }
    }, [file]);

    return (
        <ThumbnailContainer>
            {preview ? (
                <>
                    <ThumbnailImage
                        src={preview || "/placeholder.svg"}
                        alt={`Vista previa de ${file?.name}`}
                    />
                    <StyledVisuallyHidden>
                        Imagen cargada: {file?.name}
                    </StyledVisuallyHidden>
                </>
            ) : (
                <ThumbnailPlaceholder aria-hidden="true" />
            )}

            {onRemove && (
                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <RemoveButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove();
                                }}
                                aria-label={`Eliminar imagen ${file?.name}`}
                            >
                                <X size={12} strokeWidth={3} />
                            </RemoveButton>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <StyledTooltipContent side="bottom" sideOffset={5}>
                                <p>Eliminar</p>
                                <StyledTooltipArrow />
                            </StyledTooltipContent>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
            )}
        </ThumbnailContainer>
    );
}
