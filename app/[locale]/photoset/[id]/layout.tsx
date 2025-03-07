export default function PhotosetLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="layout-grid col-span-8 min-h-[101vh]">
        {children}
    </div>
  )
}
