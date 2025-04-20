"use client";

import { Toaster } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ToasterProvider() {
    const isMobile = useIsMobile();

    return (
        <Toaster
            richColors
            position={isMobile ? "top-center" : "bottom-right"}
        />
    );
}
