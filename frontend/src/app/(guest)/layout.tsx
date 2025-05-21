import NavbarGuest from "@/components/guest/NavbarGuest";

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavbarGuest />
            {children}
        </div>
    );
}