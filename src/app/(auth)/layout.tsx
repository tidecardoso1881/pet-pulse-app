import AuthBrand from "@/components/auth/AuthBrand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AuthBrand />
      <div className="flex-1 bg-[#FAF9F7] flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
}
