import { SignOut } from "@/components/auth/AuthButtons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/login");
    }

    const user = session.user;

    return (
        <>
            <div>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
            <SignOut />
        </>
    );
}
