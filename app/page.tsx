"use client";

import { useState, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ImageUploadZone from "@/components/image-upload-zone";
import ImageThumbnailGrid from "@/components/image-thumbnail-grid";
import {
    Main,
    Header,
    Content,
    TitleSection,
    Title,
    Subtitle,
    Section,
    HiddenInput,
    Footer,
    SendButton,
    StyledDropdownTrigger,
    StyledDropdownContent,
    StyledDropdownItem,
} from "@/styled_components";

const languages = [
    { code: "ES", label: "Español" },
    { code: "EN", label: "English" },
    { code: "CA", label: "Català" },
];

export default function Home() {
    const [images, setImages] = useState<File[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("ES");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImagesSelected = (files: File[]) => {
        setImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSend = () => {
        if (images.length === 0) {
            alert("Por favor, sube al menos una imagen");
            return;
        }
        console.log("Enviando imágenes:", images);
        alert(`Enviando ${images.length} imagen(es)...`);
    };

    return (
        <Main>
            <Header>
        <DropdownMenu.Root>
          <StyledDropdownTrigger>
            {selectedLanguage}
            <ChevronDown size={16} />
          </StyledDropdownTrigger>
          <DropdownMenu.Portal>
            <StyledDropdownContent align="start" sideOffset={5}>
              {languages.map((lang) => (
                <StyledDropdownItem key={lang.code} onClick={() => setSelectedLanguage(lang.code)}>
                  {lang.label}
                </StyledDropdownItem>
              ))}
            </StyledDropdownContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Header>

            <Content>
                <TitleSection>
                    <Title>Sube imágenes de la carta</Title>
                    <Subtitle>Nosotros la digitalizaremos por ti</Subtitle>
                </TitleSection>

                <Section>
                    <ImageUploadZone onImagesSelected={handleImagesSelected} />
                </Section>

                <Section>
                    <ImageThumbnailGrid
                        images={images}
                        onRemove={removeImage}
                        onAddMore={() => fileInputRef.current?.click()}
                    />
                </Section>

                <HiddenInput
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            handleImagesSelected(Array.from(e.target.files));
                            e.target.value = "";
                        }
                    }}
                />
            </Content>

            <Footer>
                <SendButton onClick={handleSend}>
                    Enviar
                    <ArrowRight size={16} strokeWidth={2.5} />
                </SendButton>
            </Footer>
        </Main>
    );
}
