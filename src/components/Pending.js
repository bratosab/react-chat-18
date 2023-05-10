import { collection, orderBy, query } from "firebase/firestore";
import { store } from "../App";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function Pending({pendingCollection}) {
    const q = query(pendingCollection, orderBy("timestamp"));
    const [pendings] = useCollectionData(q);

    return (
        <div>
            { pendings && pendings.map(pending => <span>{pending.name} is writing...</span>) } 
        </div>
    )
}