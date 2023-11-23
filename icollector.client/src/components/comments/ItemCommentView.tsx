import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { ItemCommentType } from "../../services/ItemCommentsApiService";

interface ItemCommentViewProps{
    comment: ItemCommentType
}

export function ItemCommentView(props: ItemCommentViewProps) {
    const navigate = useNavigate();
    
    function handleUserClicked(e: MouseEvent) {
        e.preventDefault();
        navigate("/user", { state: { id: props.comment.authorId } });
    }

    return (
        <div className="col-sm-12 col-md-8 col-lg-6 mb-3 mt-3 border-top">
            <div className="row">
                <div className="col-sm-4" style={{ textAlign: "right" }}>
                    <Link to="#" onClick={handleUserClicked}>
                        {props.comment.authorName}
                    </Link>
                    <br />
                    <FormattedMessage id="created_with_date" values={{ d: new Date(props.comment.created) }} />
                </div>
                <div className="col-sm-8">
                    {props.comment.text}
                </div>
            </div>
        </div>
    )
}
