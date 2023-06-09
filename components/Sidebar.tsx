"use client";

import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function Sidebar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <aside className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="space-y-6">
          {/* NewChat* */}
          <NewChat />

          <div className="hidden sm:inline">
            {/*Model Selection*/}
            <ModelSelection />
          </div>

          {loading && (
            <div className="animate-pulse text-center text-white">
              <p>Loading Chats...</p>
            </div>
          )}

          {/* Map through all the ChatRows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </div>
      </div>

      {session && (
        <img
          title="Click here to Sign out"
          onClick={() => signOut()}
          src={
            session?.user?.image ||
            `https://ui-avatars.com/api/?name=${session?.user?.name!}`
          }
          alt="Profile picture"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 transition-opacity duration-200 ease-in-out"
        />
      )}
    </aside>
  );
}

export default Sidebar;
