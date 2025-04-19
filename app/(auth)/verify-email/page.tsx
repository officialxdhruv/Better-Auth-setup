"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/"); // change to your desired redirect route
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="text-center px-4 flex items-center flex-col justify-center h-full">
            <h1 className="text-2xl font-semibold text-green-600">
                Email verified successfully!
            </h1>
            <p className="text-gray-600 mt-2">
                Redirecting you to your dashboard...
            </p>
        </div>
    );
}
