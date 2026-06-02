import { useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const demoNotifications = [
  { _id: "1", msg: "New agency 'Mahmudul Hasan' has been registered successfully.", createdAt: new Date(Date.now() - 2 * 60000).toISOString() },
  { _id: "2", msg: "Visitor count reached 500 for the Tech Summit 2025 event.", createdAt: new Date(Date.now() - 45 * 60000).toISOString() },
  { _id: "3", msg: "Payment failed for booking #TK-00293. Please review.", createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
  { _id: "4", msg: "Group 'Dhaka Travelers' has been created by Rakib Hasan.", createdAt: new Date(Date.now() - 1 * 86400000).toISOString() },
  { _id: "5", msg: "System maintenance scheduled for Sunday 2:00 AM – 4:00 AM.", createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { _id: "6", msg: "New leader assigned to group 'Cox's Bazar Tour 2025'.", createdAt: new Date(Date.now() - 6 * 86400000).toISOString() },
];

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const NotificationDrawer = ({ open, onClose }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-20 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#1a1a1a] border-l border-[#2a2a2a] z-30 flex flex-col transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-base font-bold">Notifications</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#fecd38] text-white text-xs font-semibold">
              {demoNotifications.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2a2a2a] text-gray-400 hover:text-white hover:border-[#444] transition-colors"
          >
            <IoClose size={18} />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#242424]">
          {demoNotifications.map((notif) => (
            <div
              key={notif._id}
              className="flex items-start gap-3 px-5 py-4 hover:bg-[#222] transition-colors"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-[#2a2a2a]">
                <MdNotificationsNone size={16} className="text-[#fecd38]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#e0e0e0] leading-relaxed">{notif.msg}</p>
                <p className="text-xs text-[#555] mt-1.5">{formatTime(notif.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-[#2a2a2a]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#2a2a2a] text-sm font-semibold text-gray-400 hover:text-white hover:border-[#444] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

const Header = ({ toggleSidebar }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const notifCount = demoNotifications.length;

  return (
    <>
      <div className="w-full px-5 py-3.5 bg-[#161616] flex justify-between items-center border-b border-white/10 text-white sticky top-0 left-0 z-10">
        {/* Left — welcome */}
        <div>
          <h2 className="text-2xl font-semibold">Welcome, Enrique</h2>
          <p className="text-[#fecd38] text-sm">Have a nice day!</p>
        </div>

        {/* Mobile hamburger */}

        {/* Right — bell + avatar */}
        <div className="flex items-center gap-3">
          <button className="md:hidden text-white text-3xl" onClick={toggleSidebar}>
            <FiMenu />
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          >
            <MdNotificationsNone className="size-7 text-gray-400" />
            {notifCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-white text-[10px] font-bold flex items-center justify-center bg-red-600 rounded-full">
                {notifCount > 9 ? "9+" : notifCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1">
            <img
              className="w-11 h-11 rounded-full border-2 border-[#fecd38] object-cover cursor-pointer"
              src="https://faisal5000.merinasib.shop/images/User_Avatar.png"
              alt="User Profile"
            />

            <div className="hidden md:block">
              <h1 className="text-sm font-semibold">Enrique</h1>
              <span className="text-xs text-gray-400 ">Admin</span>
            </div>
          </div>
        </div>
      </div>

      <NotificationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Header;