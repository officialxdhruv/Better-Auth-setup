import LoginForm from "./login-form";

export default function page() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-xs">
                <LoginForm />
            </div>
        </div>
    );
}
