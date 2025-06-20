import ChatBox from "@/components/ChatBox";
import NavbarGuest from "@/components/guest/NavbarGuest";
import SidebarInbox from "@/components/SidebarInbox";

export default function MessagesPage() {
  const selfId = 1;   // user đăng nhập
  const partnerId = 2; // người đang chat cùng

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar nằm trên cùng, full width */}
      <NavbarGuest />

      {/* Main content: sidebar + chat */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: cố định chiều rộng, có scrollbar nếu nội dung dài */}
        <aside className="w-80 bg-gray-100 border-r border-gray-300 overflow-y-auto">
          <SidebarInbox />
        </aside>

        {/* Chat area: chiếm phần còn lại, full height, có padding */}
        <main className="flex-1 bg-white p-4 overflow-y-auto">
          <ChatBox />
        </main>
      </div>
    </div>
  );
}
