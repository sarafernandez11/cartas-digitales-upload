import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

export const runtime = "nodejs"; // important: Azure SDK needs Node, not Edge

function sanitizeMenuName(input: string) {
    // Avoid weird paths and illegal chars. Keep it simple.
    const trimmed = (input || "").trim();
    const safe = trimmed
        .replace(/[\\?#%*:|"<>]/g, "-")
        .replace(/\s+/g, "_")
        .replace(/\/+/g, "-");
    return safe || "menu";
}

export async function POST(req: Request) {
    try {
        const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const containerName =
            process.env.AZURE_STORAGE_CONTAINER_NAME || "ocr-images";
        if (!connStr) {
            return NextResponse.json(
                { error: "Missing AZURE_STORAGE_CONNECTION_STRING" },
                { status: 500 },
            );
        }

        const formData = await req.formData();
        const menuNameRaw = String(formData.get("menuName") || "");
        const menuName = sanitizeMenuName(menuNameRaw);

        const files = formData.getAll("images") as File[];

        if (!menuNameRaw.trim()) {
            return NextResponse.json(
                { error: "menuName is required" },
                { status: 400 },
            );
        }
        if (!files?.length) {
            return NextResponse.json(
                { error: "No images provided" },
                { status: 400 },
            );
        }

        const blobService = BlobServiceClient.fromConnectionString(connStr);
        const containerClient = blobService.getContainerClient(containerName);

        await containerClient.createIfNotExists();

        const uploaded: Array<{ blobName: string }> = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const blobName = `${menuName}/${i + 1}`;

            const blockBlobClient =
                containerClient.getBlockBlobClient(blobName);

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await blockBlobClient.uploadData(buffer, {
                blobHTTPHeaders: {
                    blobContentType: file.type || "application/octet-stream",
                },
            });

            uploaded.push({ blobName });
        }

        return NextResponse.json({
            ok: true,
            container: containerName,
            menuName,
            uploaded,
        });
    } catch (err: unknown) {
        console.error(err);

        const message = err instanceof Error ? err.message : "Upload failed";

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
