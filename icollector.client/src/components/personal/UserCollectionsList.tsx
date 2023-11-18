import { MouseEvent } from "react";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { UserCollectionListItem } from "./UserCollectionListItem";

interface UserCollectionsListProps {
    collections: UserCollectionType[],
    onCollectionClick: (e: MouseEvent) => void
}

export function UserCollectionsList(props: UserCollectionsListProps) {
    const content = props.collections === undefined || props.collections.length === 0
        ? <p><em>No collections.</em></p>
        : <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {props.collections.map(collection =>
                <UserCollectionListItem key={collection.id} collection={collection} onCollectionClick={props.onCollectionClick} />
            )}
        </div>;

    return content;
}
