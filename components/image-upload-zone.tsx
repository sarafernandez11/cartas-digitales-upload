"use client";

import type React from "react";
import { useRef, useState } from "react";
import Image from "next/image";

import {
    UploadContainer,
    UploadContent,
    UploadText,
    HiddenInput,
    StyledVisuallyHidden,
} from "@/styled_components";

interface ImageUploadZoneProps {
    onImagesSelected: (files: File[]) => void;
}

export default function ImageUploadZone({
    onImagesSelected,
}: ImageUploadZoneProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onImagesSelected(Array.from(e.target.files));
            e.target.value = "";
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files) {
            onImagesSelected(
                Array.from(e.dataTransfer.files).filter((f) =>
                    f.type.startsWith("image/"),
                ),
            );
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
        }
    };

    return (
        <UploadContainer
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Zona de carga de imágenes. Haz clic o arrastra imágenes aquí."
            $isDragOver={isDragOver}
        >
            <UploadContent>
                <div aria-hidden="true">
                    <Image src="/upload.svg" alt="" width={60} height={60} />
                </div>
                <UploadText>
                    Sube imágenes desde la
                    <br />
                    cámara o desde la galería
                </UploadText>
                <StyledVisuallyHidden>
                    Presiona Enter o Espacio para abrir el selector de archivos,
                    o arrastra y suelta imágenes aquí.
                </StyledVisuallyHidden>
            </UploadContent>
            <HiddenInput
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                aria-hidden="true"
            />
        </UploadContainer>
    );
}
