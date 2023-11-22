import { ChangeEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { FormGroup, Input, Label } from "reactstrap";

interface NumericFieldProps {
    name: string,
    value: number | null,
    labelId?: string,
    placeholderId?: string,
    labelText?: string,
    placeholderText?: string
}

export function NumericField(props: NumericFieldProps) {
    const [value, setValue] = useState<number>(props.value ?? 0);
    const { formatMessage } = useIntl();
    
    function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
        const newNumber = parseInt(e.currentTarget.value === "" ? "0" : e.currentTarget.value);
        setValue(newNumber);
    }

    return (
        <FormGroup floating>
            <Input id={props.name}
                name={props.name}
                type="number"
                value={value?.toString() ?? "0"}
                onChange={handleValueChange}
                placeholder={props.placeholderId
                    ? formatMessage({ id: props.placeholderId })
                    : props.placeholderText }
                required
            />
            <Label for={props.name}>
                {props.labelId
                    ? <FormattedMessage id={props.labelId} />
                    : props.labelText }
            </Label>
        </FormGroup>
    );
}
