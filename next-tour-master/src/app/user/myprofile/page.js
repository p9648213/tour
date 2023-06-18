// import dynamic from "next/dynamic";

// const UserPanel = dynamic(() => import("@/components/user-info/UserPanel"), {
//   ssr: false,
//   loading: () => (
//     <div className="loading-container">
//       <h1 className="loading" style={{ color: "gray" }}>
//         Loading...
//       </h1>
//     </div>
//   ),
// });

import UserPanel from "@/components/user-info/UserPanel";

export default function UserPage() {
  return (
    <main className="main">
      <div className="user-view">
        <UserPanel />
      </div>
    </main>
  );
}
