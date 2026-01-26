"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    MoreVertical,
    Pencil,
    FileImage,
    X,
    Palette,
} from "lucide-react";
import { DropdownMenu, Dialog, Toast } from "radix-ui";

import { useTranslations } from "@/lib/useTranslations";
import {
    Main,
    Header,
    Content,
    TitleSection,
    Title,
    Subtitle,
    MenuListContainer,
    MenuCard,
    MenuPreviewWrapper,
    MenuPreviewImage,
    MenuPreviewLoading,
    LoadingSpinner,
    MenuInfo,
    MenuName,
    MenuStatus,
    StatusDot,
    MenuActions,
    MenuActionButton,
    MenuDropdownContent,
    MenuDropdownItem,
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateText,
    HeaderNav,
    BackButton,
    InputWrapper,
    InputLabel,
    StyledInput,
    ModalOverlay,
    ModalContent,
    ModalTitle,
    ModalButtonGroup,
    ModalPrimaryButton,
    ModalSecondaryButton,
    ToastViewport,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ColorPickerContainer,
    ColorPickerRow,
    ColorPickerLabel,
    ColorPickerWrapper,
    ColorInput,
    ColorHexInput,
} from "@/styled_components";
import { isError } from "util";

interface Menu {
    id: string;
    name: string;
    previewUrl: string | null;
    isProcessing: boolean;
    createdAt: Date;
    backgroundColor: string;
    accentColor: string;
}

const mockMenus: Menu[] = [
    {
        id: "1",
        name: "Menu del dia",
        previewUrl: null,
        isProcessing: true,
        createdAt: new Date("2026-01-22T10:00:00"),
        backgroundColor: "#ffffff",
        accentColor: "#1a1a1a",
    },
    {
        id: "2",
        name: "Carta de vinos",
        previewUrl:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=128&h=128&fit=crop",
        isProcessing: false,
        createdAt: new Date("2026-01-22T09:30:00"),
        backgroundColor: "#ffffff",
        accentColor: "#1a1a1a",
    },
    {
        id: "3",
        name: "Carta de postres",
        previewUrl:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=128&h=128&fit=crop",
        isProcessing: false,
        createdAt: new Date("2026-01-21T15:00:00"),
        backgroundColor: "#fef3c7",
        accentColor: "#92400e",
    },
];

export default function MenusPage() {
    const [menus, setMenus] = useState<Menu[]>(mockMenus);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [newName, setNewName] = useState("");
    const [colorEditingMenu, setColorEditingMenu] = useState<Menu | null>(null);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [accentColor, setAccentColor] = useState("#1a1a1a");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: "",
        description: "",
        isError: false,
    });

    const { t } = useTranslations("ES");

    const sortedMenus = [...menus].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    const showToast = (title: string, description: string, isError = false) => {
        setToastMessage({ title, description, isError });
        setToastOpen(true);
    };

    const handleEditName = (menu: Menu) => {
        setEditingMenu(menu);
        setNewName(menu.name);
    };

    const handleSaveName = () => {
        if (!editingMenu || !newName.trim()) return;

        setMenus((prev) =>
            prev.map((menu) =>
                menu.id === editingMenu.id
                    ? { ...menu, name: newName.trim() }
                    : menu,
            ),
        );
        setEditingMenu(null);
        setNewName("");
        showToast(t("toast.successTitle"), t("mymenus.nameUpdated"));
    };

    const handleCancelEdit = () => {
        setEditingMenu(null);
        setNewName("");
    };

    const handleEditColors = (menu: Menu) => {
        setColorEditingMenu(menu);
        setBackgroundColor(menu.backgroundColor);
        setAccentColor(menu.accentColor);
    };

    const handleSaveColors = () => {
        if (!colorEditingMenu) return;

        setMenus((prev) =>
            prev.map((menu) =>
                menu.id === colorEditingMenu.id
                    ? { ...menu, backgroundColor, accentColor }
                    : menu,
            ),
        );
        setColorEditingMenu(null);
        showToast(t("toast.successTitle"), t("mymenus.colorsUpdated"));
    };

    const handleCancelColorEdit = () => {
        setColorEditingMenu(null);
        setBackgroundColor("#ffffff");
        setAccentColor("#1a1a1a");
    };

    const handleHexInputChange = (
        value: string,
        setter: (value: string) => void,
    ) => {
        const hex = value.startsWith("#") ? value : `#${value}`;
        if (/^#[0-9A-Fa-f]{0,6}$/.test(hex)) {
            setter(hex);
        }
    };

    return (
        <Toast.Provider swipeDirection="right" duration={4000}>
            <Main>
                <Header>
                    <HeaderNav>
                        <Link href="/" passHref>
                            <BackButton
                                as="a"
                                aria-label="Volver a la pagina principal"
                            >
                                <ChevronLeft size={20} />
                                {t("backButton")}
                            </BackButton>
                        </Link>
                    </HeaderNav>
                </Header>

                <Content>
                    <TitleSection>
                        <Title>{t("mymenus.title")}</Title>
                        <Subtitle>{t("mymenus.subtitle")}</Subtitle>
                    </TitleSection>

                    {sortedMenus.length === 0 ? (
                        <EmptyState>
                            <EmptyStateIcon>
                                <FileImage size={28} />
                            </EmptyStateIcon>
                            <EmptyStateTitle>
                                {t("mymenus.emptyTitle")}
                            </EmptyStateTitle>
                            <EmptyStateText>
                                {t("mymenus.emptySubtitle")}
                            </EmptyStateText>
                        </EmptyState>
                    ) : (
                        <MenuListContainer
                            role="list"
                            aria-label="Lista de menus"
                        >
                            {sortedMenus.map((menu) => (
                                <MenuCard
                                    key={menu.id}
                                    role="listitem"
                                    aria-label={`Menu: ${menu.name}`}
                                >
                                    <MenuPreviewWrapper>
                                        {menu.isProcessing ? (
                                            <MenuPreviewLoading aria-label="Procesando imagen">
                                                <LoadingSpinner />
                                            </MenuPreviewLoading>
                                        ) : menu.previewUrl ? (
                                            <MenuPreviewImage
                                                src={menu.previewUrl}
                                                alt={`Vista previa de ${menu.name}`}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <MenuPreviewLoading>
                                                <FileImage
                                                    size={24}
                                                    color="#737373"
                                                />
                                            </MenuPreviewLoading>
                                        )}
                                    </MenuPreviewWrapper>

                                    <MenuInfo>
                                        <MenuName>{menu.name}</MenuName>
                                        <MenuStatus
                                            $processing={menu.isProcessing}
                                        >
                                            <StatusDot
                                                $processing={menu.isProcessing}
                                            />
                                            {menu.isProcessing
                                                ? "Procesando..."
                                                : "Completado"}
                                        </MenuStatus>
                                    </MenuInfo>

                                    <MenuActions>
                                        <DropdownMenu.Root>
                                            <MenuActionButton
                                                disabled={menu.isProcessing}
                                                aria-label={
                                                    menu.isProcessing
                                                        ? "Opciones no disponibles mientras se procesa"
                                                        : `Opciones para ${menu.name}`
                                                }
                                                aria-disabled={
                                                    menu.isProcessing
                                                }
                                            >
                                                {menu.isProcessing ? (
                                                    <LoadingSpinner
                                                        style={{
                                                            width: 16,
                                                            height: 16,
                                                        }}
                                                    />
                                                ) : (
                                                    <MoreVertical size={20} />
                                                )}
                                            </MenuActionButton>
                                            {!menu.isProcessing && (
                                                <DropdownMenu.Portal>
                                                    <MenuDropdownContent
                                                        align="end"
                                                        sideOffset={5}
                                                    >
                                                        <MenuDropdownItem
                                                            onClick={() =>
                                                                handleEditName(
                                                                    menu,
                                                                )
                                                            }
                                                        >
                                                            <Pencil size={16} />
                                                            {t(
                                                                "mymenus.changeNameButton",
                                                            )}
                                                        </MenuDropdownItem>
                                                        <MenuDropdownItem
                                                            onClick={() =>
                                                                handleEditColors(
                                                                    menu,
                                                                )
                                                            }
                                                        >
                                                            <Palette
                                                                size={16}
                                                            />
                                                            {t(
                                                                "mymenus.changeColorsButton",
                                                            )}
                                                        </MenuDropdownItem>
                                                    </MenuDropdownContent>
                                                </DropdownMenu.Portal>
                                            )}
                                        </DropdownMenu.Root>
                                    </MenuActions>
                                </MenuCard>
                            ))}
                        </MenuListContainer>
                    )}
                </Content>

                <Dialog.Root
                    open={!!editingMenu}
                    onOpenChange={(open) => !open && handleCancelEdit()}
                >
                    <Dialog.Portal>
                        <ModalOverlay />
                        <ModalContent aria-describedby="edit-name-description">
                            <ModalTitle>
                                {t("mymenus.changeNameButton")}
                            </ModalTitle>
                            <InputWrapper
                                style={{
                                    marginTop: "1rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                <InputLabel htmlFor="edit-menu-name">
                                    {t("mymenus.newName")}
                                </InputLabel>
                                <StyledInput
                                    id="edit-menu-name"
                                    type="text"
                                    placeholder={t("mymenus.newName")}
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    aria-describedby="edit-name-description"
                                    autoFocus
                                />
                            </InputWrapper>
                            <ModalButtonGroup>
                                <ModalPrimaryButton
                                    onClick={handleSaveName}
                                    disabled={!newName.trim()}
                                >
                                    {t("saveButton")}
                                </ModalPrimaryButton>
                                <ModalSecondaryButton
                                    onClick={handleCancelEdit}
                                >
                                    {t("cancelButton")}
                                </ModalSecondaryButton>
                            </ModalButtonGroup>
                        </ModalContent>
                    </Dialog.Portal>
                </Dialog.Root>

                <Dialog.Root
                    open={!!colorEditingMenu}
                    onOpenChange={(open) => !open && handleCancelColorEdit()}
                >
                    <Dialog.Portal>
                        <ModalOverlay />
                        <ModalContent aria-describedby="edit-colors-description">
                            <ModalTitle>
                                {t("mymenus.changeColorsButton")}
                            </ModalTitle>
                            <ColorPickerContainer>
                                <ColorPickerRow>
                                    <ColorPickerLabel htmlFor="background-color">
                                        {t("mymenus.backgroundColorLabel")}
                                    </ColorPickerLabel>
                                    <ColorPickerWrapper>
                                        <ColorInput
                                            id="background-color"
                                            type="color"
                                            value={backgroundColor}
                                            onChange={(e) =>
                                                setBackgroundColor(
                                                    e.target.value,
                                                )
                                            }
                                            aria-label="Selector de color de fondo"
                                        />
                                        <ColorHexInput
                                            type="text"
                                            value={backgroundColor.toUpperCase()}
                                            onChange={(e) =>
                                                handleHexInputChange(
                                                    e.target.value,
                                                    setBackgroundColor,
                                                )
                                            }
                                            placeholder="#FFFFFF"
                                            maxLength={7}
                                            aria-label="Codigo hexadecimal del color de fondo"
                                        />
                                    </ColorPickerWrapper>
                                </ColorPickerRow>
                                <ColorPickerRow>
                                    <ColorPickerLabel htmlFor="accent-color">
                                        {t("mymenus.accentColorLabel")}
                                    </ColorPickerLabel>
                                    <ColorPickerWrapper>
                                        <ColorInput
                                            id="accent-color"
                                            type="color"
                                            value={accentColor}
                                            onChange={(e) =>
                                                setAccentColor(e.target.value)
                                            }
                                            aria-label="Selector de color de acento"
                                        />
                                        <ColorHexInput
                                            type="text"
                                            value={accentColor.toUpperCase()}
                                            onChange={(e) =>
                                                handleHexInputChange(
                                                    e.target.value,
                                                    setAccentColor,
                                                )
                                            }
                                            placeholder="#1A1A1A"
                                            maxLength={7}
                                            aria-label="Codigo hexadecimal del color de acento"
                                        />
                                    </ColorPickerWrapper>
                                </ColorPickerRow>
                            </ColorPickerContainer>
                            <ModalButtonGroup>
                                <ModalPrimaryButton onClick={handleSaveColors}>
                                    {t("saveButton")}
                                </ModalPrimaryButton>
                                <ModalSecondaryButton
                                    onClick={handleCancelColorEdit}
                                >
                                    {t("cancelButton")}
                                </ModalSecondaryButton>
                            </ModalButtonGroup>
                        </ModalContent>
                    </Dialog.Portal>
                </Dialog.Root>

                <ToastRoot open={toastOpen} onOpenChange={setToastOpen}>
                    <ToastTitle>{toastMessage.title}</ToastTitle>
                    <ToastDescription>
                        {toastMessage.description}
                    </ToastDescription>
                    <ToastClose aria-label="Cerrar notificacion">
                        <X size={16} />
                    </ToastClose>
                </ToastRoot>

                <ToastViewport aria-label="Notificaciones" />
            </Main>
        </Toast.Provider>
    );
}
