import NavbarUser from "@/components/guest/NavbarGuest";

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavbarUser />
            {children}
        </div>
    );
}