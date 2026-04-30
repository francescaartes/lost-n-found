import SidebarContent from "./SidebarContent";

export default function Sidebar() {
    return (
        <aside className="w-64 h-[calc(100vh-64px)] bg-background border-r border-border hidden md:flex flex-col shrink-0 sticky top-16">
            <SidebarContent />
        </aside>
    );
}
