export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-2xl w-full"
      style={{ padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
    >
      {children}
    </div>
  );
}
