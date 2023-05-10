import { collection, orderBy, query, where } from "firebase/firestore";
import { auth, store } from "../App";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function Pending({ pendingCollection }) {
  const q = query(
    pendingCollection,
    where("uid", "!=", auth.currentUser.uid),
    orderBy("uid", "timestamp")
  );
  const [pendings] = useCollectionData(q);

  return (
    <div>
      {pendings &&
        pendings.map((pending) => <span>{pending.name} is writing...</span>)}
    </div>
  );
}
