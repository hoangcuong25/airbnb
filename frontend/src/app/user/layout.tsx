import NavbarUser from "@/components/user/NavbarUser";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <NavbarUser />
            <div className='mt-6'>
                {children}
            </div>
        </div>
    );
}