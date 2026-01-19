"use client";

import { useState, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { useTranslations } from "@/lib/useTranslations";
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
    const { t } = useTranslations(selectedLanguage as "ES" | "EN" | "CA");

    const handleImagesSelected = (files: File[]) => {
        setImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSend = () => {
        if (images.length === 0) {
            alert(t("upload.atLeastOneImage"));
            return;
        }
        console.log(t("upload.sendingImages"), images);
        alert(t("upload.sendingCount", { count: images.length }));
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
                    <Title>{t("upload.title")}</Title>
                    <Subtitle>{t("upload.subtitle")}</Subtitle>
                </TitleSection>

                <Section>
                    <ImageUploadZone onImagesSelected={handleImagesSelected} selectedLanguage={selectedLanguage} />
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
                    {t("upload.sendButton")}
                    <ArrowRight size={16} strokeWidth={2.5} />
                </SendButton>
            </Footer>
        </Main>
    );
}
