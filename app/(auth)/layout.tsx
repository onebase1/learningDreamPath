//package: app/auth/layout.tsx

// File: app/auth/layout.tsx

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full bg-gradient-to-tl from-indigo-950 to-black flex items-center justify-center">
      {children}
    </div>
  );
}
 
export default AuthLayout;
