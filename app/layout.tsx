import type React from "react";
import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Sube Imágenes de la Carta",
    description: "Carga y revisa imágenes para digitalizar tu carta",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={montserrat.variable}>
                <Theme>
                    <StyledComponentsRegistry>
                        {children}
                    </StyledComponentsRegistry>
                </Theme>
            </body>
        </html>
    );
}
