import { FormEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, FormGroup, Input, Label } from "reactstrap";

interface SendCommentFormProps {
    onSendClick: (message: string) => void
}

export function CommentForm(props: SendCommentFormProps) {
    const { formatMessage } = useIntl();
    const [message, setMessage] = useState<string>("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.onSendClick(message);
        setMessage("");
    }

    return (<div className="card">
        <div className="card-body">
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="message">
                        <FormattedMessage id="write_comment" />
                    </Label>
                    <Input id="message"
                        name="message"
                        type="textarea"
                        rows="5"
                        placeholder={formatMessage({ id: "your_comment" })}
                        value={message}
                        onChange={(e) => setMessage(e.currentTarget.value)}
                        required />
                </FormGroup>
                <Button type="submit">
                    <FormattedMessage id="send" />
                </Button>
            </form>
        </div>
    </div>);
}
