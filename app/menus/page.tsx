"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, MoreVertical, Pencil, FileImage, X } from "lucide-react";
import { DropdownMenu, Dialog, Toast } from "radix-ui";
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
} from "@/styled_components";

interface Menu {
    id: string;
    name: string;
    previewUrl: string | null;
    isProcessing: boolean;
    createdAt: Date;
}

const mockMenus: Menu[] = [
    {
        id: "1",
        name: "Carta de vinos",
        previewUrl:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=128&h=128&fit=crop",
        isProcessing: false,
        createdAt: new Date("2026-01-22T10:00:00"),
    },
    {
        id: "2",
        name: "Menu del dia",
        previewUrl: null,
        isProcessing: true,
        createdAt: new Date("2026-01-22T09:30:00"),
    },
    {
        id: "3",
        name: "Carta de postres",
        previewUrl:
            "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=128&h=128&fit=crop",
        isProcessing: false,
        createdAt: new Date("2026-01-21T15:00:00"),
    },
];

export default function MenusPage() {
    const [menus, setMenus] = useState<Menu[]>(mockMenus);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [newName, setNewName] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: "",
        description: "",
    });

    const sortedMenus = [...menus].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

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
        setToastMessage({
            title: "Guardado",
            description: "El nombre del menu ha sido actualizado",
        });
        setToastOpen(true);
    };

    const handleCancelEdit = () => {
        setEditingMenu(null);
        setNewName("");
    };

    return (
        <Toast.Provider swipeDirection="right" duration={4000}>
            <Main>
                <Header>
                    <HeaderNav>
                        <Link href="/" passHref legacyBehavior>
                            <BackButton
                                as="a"
                                aria-label="Volver a la pagina principal"
                            >
                                <ChevronLeft size={20} />
                                Volver
                            </BackButton>
                        </Link>
                    </HeaderNav>
                </Header>

                <Content>
                    <TitleSection>
                        <Title>Mis menus</Title>
                        <Subtitle>Gestiona tus cartas digitalizadas</Subtitle>
                    </TitleSection>

                    {sortedMenus.length === 0 ? (
                        <EmptyState>
                            <EmptyStateIcon>
                                <FileImage size={28} />
                            </EmptyStateIcon>
                            <EmptyStateTitle>No tienes menus</EmptyStateTitle>
                            <EmptyStateText>
                                Sube imagenes de tu carta para empezar
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
                                                            Cambiar nombre
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
                            <ModalTitle>Cambiar nombre</ModalTitle>
                            <InputWrapper
                                style={{
                                    marginTop: "1rem",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                <InputLabel htmlFor="edit-menu-name">
                                    Nuevo nombre
                                </InputLabel>
                                <StyledInput
                                    id="edit-menu-name"
                                    type="text"
                                    placeholder="Nombre del menu..."
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
                                    Guardar
                                </ModalPrimaryButton>
                                <ModalSecondaryButton
                                    onClick={handleCancelEdit}
                                >
                                    Cancelar
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
