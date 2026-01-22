"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, X, Plus, List, FileText } from "lucide-react";
import { DropdownMenu, Toast, Dialog } from "radix-ui";

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
    InputWrapper,
    InputLabel,
    StyledInput,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastViewport,
    ToastRoot,
    ToastRootError,
    ModalOverlay,
    ModalContent,
    ModalTitle,
    ModalDescription,
    DotsContainer,
    Dot,
    ModalButtonGroup,
    ModalPrimaryButton,
    ModalSecondaryButton,
    ViewMenusButton,
    HeaderNav,
} from "@/styled_components";

const languages = [
    { code: "ES", label: "Español" },
    { code: "EN", label: "English" },
    { code: "CA", label: "Català" },
];

export default function Home() {
    const [images, setImages] = useState<File[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("ES");
    const [menuName, setMenuName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: "",
        description: "",
        isError: false,
    });
    const [processingModalOpen, setProcessingModalOpen] = useState(false);

    const router = useRouter();
    const { t } = useTranslations(selectedLanguage as "ES" | "EN" | "CA");

    const handleImagesSelected = (files: File[]) => {
        setImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const showToast = (title: string, description: string, isError = false) => {
        setToastMessage({ title, description, isError });
        setToastOpen(true);
    };

    const handleSend = () => {
        if (!isFormValid) {
            return;
        }
        console.log("Enviando imágenes:", images, "Menu:", menuName);
        setProcessingModalOpen(true);
    };

    const handleCreateNewMenu = () => {
        setProcessingModalOpen(false);
        setImages([]);
        setMenuName("");
        showToast("Listo", "Puedes crear un nuevo menú", false);
    };

    const handleViewMenus = () => {
        setProcessingModalOpen(false);
        router.push("/menus");
    };

    const isFormValid = menuName.trim().length > 0 && images.length > 0;

    const ToastComponent = toastMessage.isError ? ToastRootError : ToastRoot;

    return (
        <Toast.Provider swipeDirection="right" duration={4000}>
            <Main>
                <Header>
                    <HeaderNav>
                        <DropdownMenu.Root>
                            <StyledDropdownTrigger>
                                {selectedLanguage}
                                <ChevronDown size={16} />
                            </StyledDropdownTrigger>
                            <DropdownMenu.Portal>
                                <StyledDropdownContent
                                    align="start"
                                    sideOffset={5}
                                >
                                    {languages.map((lang) => (
                                        <StyledDropdownItem
                                            key={lang.code}
                                            onClick={() =>
                                                setSelectedLanguage(lang.code)
                                            }
                                        >
                                            {lang.label}
                                        </StyledDropdownItem>
                                    ))}
                                </StyledDropdownContent>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                        <Link href="/menus" passHref>
                            <ViewMenusButton as="a" aria-label="Ver mis menus">
                                <FileText size={14} />
                                Mis menus
                            </ViewMenusButton>
                        </Link>
                    </HeaderNav>
                </Header>

                <Content>
                    <TitleSection>
                        <Title>{t("upload.title")}</Title>
                        <Subtitle>{t("upload.subtitle")}</Subtitle>
                    </TitleSection>

                    <InputWrapper>
                        <InputLabel htmlFor="menu-name">
                            {t("upload.inputLabel")}
                        </InputLabel>
                        <StyledInput
                            id="menu-name"
                            type="text"
                            placeholder={t("upload.inputPlaceholder")}
                            value={menuName}
                            onChange={(e) => setMenuName(e.target.value)}
                            aria-describedby="menu-name-hint"
                        />
                    </InputWrapper>

                    <Section>
                        <ImageUploadZone
                            onImagesSelected={handleImagesSelected}
                            selectedLanguage={selectedLanguage}
                        />
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
                                handleImagesSelected(
                                    Array.from(e.target.files),
                                );
                                e.target.value = "";
                            }
                        }}
                    />
                </Content>

                <Footer>
                    <SendButton
                        onClick={handleSend}
                        disabled={!isFormValid}
                        aria-disabled={!isFormValid}
                        aria-describedby="send-button-hint"
                    >
                        {" "}
                        {t("upload.sendButton")}
                        <ArrowRight size={16} strokeWidth={2.5} />
                    </SendButton>
                </Footer>
                <ToastComponent open={toastOpen} onOpenChange={setToastOpen}>
                    <ToastTitle>{toastMessage.title}</ToastTitle>
                    <ToastDescription>
                        {toastMessage.description}
                    </ToastDescription>
                    <ToastClose aria-label="Cerrar notificación">
                        <X size={16} />
                    </ToastClose>
                </ToastComponent>

                <ToastViewport aria-label="Notificaciones" />

                <Dialog.Root
                    open={processingModalOpen}
                    onOpenChange={setProcessingModalOpen}
                >
                    <Dialog.Portal>
                        <ModalOverlay />
                        <ModalContent
                            aria-describedby="processing-description"
                            onEscapeKeyDown={(e) => e.preventDefault()}
                            onPointerDownOutside={(e) => e.preventDefault()}
                        >
                            <ModalTitle>{t("processing.title")}</ModalTitle>
                            <ModalDescription id="processing-description">
                                {t("processing.subtitle")}
                            </ModalDescription>
                            <DotsContainer
                                role="status"
                                aria-label="Procesando"
                            >
                                <Dot $delay={0} />
                                <Dot $delay={160} />
                                <Dot $delay={320} />
                            </DotsContainer>
                            <ModalButtonGroup>
                                <ModalPrimaryButton
                                    onClick={handleCreateNewMenu}
                                >
                                    <Plus size={16} strokeWidth={2.5} />
                                    {t("processing.newMenuButton")}
                                </ModalPrimaryButton>
                                <ModalSecondaryButton onClick={handleViewMenus}>
                                    <List size={16} strokeWidth={2.5} />
                                    {t("processing.viewMenuListButton")}
                                </ModalSecondaryButton>
                            </ModalButtonGroup>
                        </ModalContent>
                    </Dialog.Portal>
                </Dialog.Root>
            </Main>
        </Toast.Provider>
    );
}
