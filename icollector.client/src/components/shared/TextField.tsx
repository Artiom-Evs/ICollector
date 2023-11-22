import { ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FormGroup, Input, Label } from "reactstrap";

interface TextFieldProps {
    name: string,
    value: string | null,
    labelId: string,
    placeholderId: string,
}

export function TextField(props: TextFieldProps) {
    const [value, setValue] = useState<string>(props.value ?? "");
    const { formatMessage } = useIntl();

    function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    return (
        <FormGroup floating>
            <Input id={props.name}
                name={props.name}
                type="text"
                value={value}
                onChange={handleValueChange}
                placeholder={formatMessage({ id: props.placeholderId })}
                required
            />
            <Label for={props.name}>
                <FormattedMessage id={props.labelId} />
            </Label>
        </FormGroup>
    );
}
