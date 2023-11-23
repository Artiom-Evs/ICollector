import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useItemCommentsApi } from "../../hooks/useItemCommentsApi";
import { ItemCommentRequestType, ItemCommentType } from "../../services/ItemCommentsApiService";
import { CommentForm } from "./CommentForm";
import useAuth from "../../hooks/useAuth";
import { ItemCommentView } from "./ItemCommentView";

interface CommentsPanelProps {
    itemId: number
}

function renderCommentsList(comments: ItemCommentType[]) {
    if (!comments || comments.length === 0)
        return <p><em><FormattedMessage id="no_comments" /></em></p>;

    return (
        <div>
            {comments.map((c, i) => <div key={i}>
                <ItemCommentView comment={c} />
            </div>)}
        </div>
    )
}

export function CommentsPanel(props: CommentsPanelProps) {
    const { isAuthorized } = useAuth();
    const commentsApi = useItemCommentsApi();
    const [comments, setComments] = useState<ItemCommentType[]>();

    useEffect(() => {
        commentsApi.getAll(props.itemId ?? 0)
            .then(response => response.data)
            .then(data => setComments(data))
            .catch(error => console.error(error));
    }, [commentsApi, props.itemId]);

    function handleSendClick(message: string) {
        const newComment = { itemId: props.itemId, text: message };
        commentsApi.post(newComment as ItemCommentRequestType)
            .catch(error => console.error(error));
    }

    if (comments === undefined)
        return <p><em><FormattedMessage id="loading" /></em></p>;
    
    const commentsList = renderCommentsList(comments);
    const commentForm = isAuthorized
        ? <CommentForm onSendClick={handleSendClick} />
        : <p><em><FormattedMessage id="only_authorized_users_can_write_comments" /></em></p>;

    return (<div>
        {commentsList}
        {commentForm}
    </div>)
}
