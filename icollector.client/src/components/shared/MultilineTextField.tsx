import { ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FormGroup, Input, Label } from "reactstrap";

interface MultilineTextFieldProps {
    name: string,
    value: string | null,
    labelId?: string,
    placeholderId?: string,
    labelText?: string,
    placeholderText?: string
}

export function MultilineTextField(props: MultilineTextFieldProps) {
    const [value, setValue] = useState<string>(props.value ?? "");
    const { formatMessage } = useIntl();

    function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    return (
        <FormGroup>
            <Label for={props.name}>
                {props.labelId
                    ? <FormattedMessage id={props.labelId} />
                    : props.labelText}
            </Label>
            <Input id={props.name}
                name={props.name}
                type="textarea"
                rows="5"
                value={value}
                onChange={handleValueChange}
                placeholder={props.placeholderId
                    ? formatMessage({ id: props.placeholderId })
                    : props.placeholderText}
                required
            />
        </FormGroup>
    );
}
