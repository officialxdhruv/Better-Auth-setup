import { SignIn } from "@/components/auth/AuthButtons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });
    if (!session) {
        return (
            <>
                <div>You are not authenticated</div>
                <SignIn />
            </>
        );
    }

    const user = session.user;

    return (
        <>
            <div>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </>
    );
}
