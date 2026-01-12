import CustomSidebar from "../_components/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full min-h-screen ">

<CustomSidebar></CustomSidebar>
<div className="w-full ">        {children}</div>
</div>
 
  );
}
