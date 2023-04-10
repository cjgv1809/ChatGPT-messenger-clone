import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import ClientProvider from "../components/ClientProvider";
import "../styles/globals.css";
// import ThemeProvider from '../providers/ThemeProvider'
// import dynamic from 'next/dynamic';

// // Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
// const DynamicContextProvider = dynamic(() => import('../providers/ThemeProvider').then(mod => mod.default), {
//   ssr: false
// });

// Server component can be async function but not a client side component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            // <DynamicContextProvider>
            <div className="flex">
              {/* SIDEBAR */}
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <Sidebar />
              </div>
              {/* CLIENT PROVIDER */}
              <ClientProvider />

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
            // </DynamicContextProvider>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
