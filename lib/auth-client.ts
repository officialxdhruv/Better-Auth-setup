import { createAuthClient } from "better-auth/react" // make sure to import from better-auth/react
 
export const authClient =  createAuthClient({
    //you can pass client configuration here
})

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "github"
    })
}