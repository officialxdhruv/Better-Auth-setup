"use Client";
import { User } from "better-auth";
import { authClient } from "./auth-client";

export type WithAuthProps = {
    user: User;
};

export function withAuthClient<P extends WithAuthProps>(
    WrappedComponet: React.ComponentType<P>
) {
    return function AuthenticatedComponent(
        props: Omit<P, keyof WithAuthProps>
    ) {
        const {
            data: session,
            isPending, //loading state
            error, //error object
            refetch, //refetch the session
        } = authClient.useSession();

        const user = session?.user;

        return <WrappedComponet {...(props as P)} user={user} />;
    };
}
