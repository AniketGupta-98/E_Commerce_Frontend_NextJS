// import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//       <div className="text-red-500 text-3xl font-bold">
//         TAILWIND TEST
//       </div>
//     </>
//   );
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}