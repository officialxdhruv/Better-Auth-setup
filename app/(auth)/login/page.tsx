import LoginForm from "./login-form";

export default function page() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-13.875rem)] md:h-[calc(100vh-8.125rem)]">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
