import { FormattedMessage } from "react-intl";
import { ItemCommentType } from "../../services/ItemCommentsApiService";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface ItemCommentSearchResultProps {
    comment: ItemCommentType
}

export function ItemCommentSearchResult(props: ItemCommentSearchResultProps) {
    const navigate = useNavigate();

    function handleItemClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/item", { state: { id: props.comment.item.id } });
    }

    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", { state: { id: props.comment.authorId } });
    }

    return (
        <div className="card mb-2">
            <div className="card-body row">
                <div className="col-sm-8">
                    <Link to="#" onClick={handleItemClicked}>
                        {props.comment.item.name}
                    </Link>
                    <br />

                    {props.comment.text}
                </div>
                <div className="col-sm-4">
                    <FormattedMessage id="author_with_name" values={{ n: "" }} />
                    <Link to="#" onClick={handleUserClicked}>
                        {props.comment.authorName}
                    </Link>
                    <br />
                    <FormattedMessage id="created_with_date" values={{ d: new Date(props.comment.created) }} />
                </div>
            </div>
        </div>
    );
}