export default function Footer() {
    return (
        <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col md:flex-row mx-auto justify-between items-center md:h-14 gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Blazecode. All right reserved.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <a href="#" className="hover:text-foreground">Terms</a>
                    <a href="#" className="hover:text-foreground">Privacy</a>
                    <a href="#" className="hover:text-foreground">Contact</a>
                </div>
            </div>
        </footer>
    );
}