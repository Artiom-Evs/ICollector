import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { Button, Form, FormGroup, Input, Label, } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { TextField } from "../shared/TextField";

interface CollectionDynamicFormProps {
    collection: UserCollectionType,
    onSubmit: (collection: UserCollectionType) => void,
    onCancel: () => void
}

interface FieldDeclarationType {
    name: string,
    value: string | null,
    labelId: string,
    placeholderId: string,
    required?: boolean
}

const defaultFields: FieldDeclarationType[] = [
    {
        name: "name",
        value: "",
        labelId: "name",
        placeholderId: "collection_name",
        required: true
    },
    {
        name: "description",
        value: "",
        labelId: "description",
        placeholderId: "collection_description",
        required: true
    },
    {
        name: "number1Name",
        value: null,
        labelId: "numeric_field_1",
        placeholderId: "field_name",
    },
    {
        name: "number2Name",
        value: null,
        labelId: "numeric_field_2",
        placeholderId: "field_name",
    },
    {
        name: "number3Name",
        value: null,
        labelId: "numeric_field_3",
        placeholderId: "field_name",
    },
    {
        name: "text1Name",
        value: null,
        labelId: "text_field_1",
        placeholderId: "field_name",
    },
    {
        name: "text2Name",
        value: null,
        labelId: "text_field_2",
        placeholderId: "field_name",
    },
    {
        name: "text3Name",
        value: null,
        labelId: "text_field_3",
        placeholderId: "field_name",
    },
    {
        name: "multiline1Name",
        value: null,
        labelId: "multiline_field_1",
        placeholderId: "field_name",
    },
    {
        name: "multiline2Name",
        value: null,
        labelId: "multiline_field_2",
        placeholderId: "field_name",
    },
    {
        name: "multiline3Name",
        value: null,
        labelId: "multiline_field_3",
        placeholderId: "field_name",
    }
];

function renderOptionalFieldsSelector(fields: FieldDeclarationType[], rerender: () => void) {
    function reverseFieldState(e: ChangeEvent<HTMLInputElement>) {
        const fieldName = e.currentTarget.name.slice(0, e.currentTarget.name.indexOf("-checkbox"));
        const field = fields.find(f => f.name === fieldName);
        if (field) field.value = field.value === null || field.value === undefined ? "" : null;
        rerender();
    }
    
    return (
        <div>
            {fields.filter(f => !f.required).map(f => <FormGroup key={f.name} check>
                <Input type="checkbox"
                    name={`${f.name}-checkbox`}
                    checked={f.value != null}
                    onChange={reverseFieldState}
                />
                <Label check>
                    <FormattedMessage id={f.labelId} />
                </Label>
            </FormGroup>)}
        </div>
    )
}

function initializeFields(collection: UserCollectionType) {
    defaultFields[0].value = collection.name;
    defaultFields[1].value = collection.description;
    defaultFields[2].value = collection.number1Name;
    defaultFields[3].value = collection.number2Name;
    defaultFields[4].value = collection.number3Name;
    defaultFields[5].value = collection.text1Name;
    defaultFields[6].value = collection.text2Name;
    defaultFields[7].value = collection.text3Name;
    defaultFields[8].value = collection.multiline1Name;
    defaultFields[9].value = collection.multiline2Name;
    defaultFields[10].value = collection.multiline3Name; 
}

function extractCollectionFromForm(form: HTMLFormElement) {
    const data = new FormData(form);
    const obj = {} as UserCollectionType;

    obj.name = data.get("name")?.toString() ?? "";
    obj.description = data.get("description")?.toString() ?? "";
    obj.number1Name = data.get("number1Name")?.toString() ?? null;
    obj.number2Name = data.get("number2Name")?.toString() ?? null;
    obj.number3Name = data.get("number3Name")?.toString() ?? null;
    obj.text1Name = data.get("text1Name")?.toString() ?? null;
    obj.text2Name = data.get("text2Name")?.toString() ?? null;
    obj.text3Name = data.get("text3Name")?.toString() ?? null;
    obj.multiline1Name = data.get("multiline1Name")?.toString() ?? null;
    obj.multiline2Name = data.get("multiline2Name")?.toString() ?? null;
    obj.multiline3Name = data.get("multiline3Name")?.toString() ?? null;

    return obj;
}

export function CollectionDynamicForm(props: CollectionDynamicFormProps) {
    const [fields, setFields] = useState<FieldDeclarationType[]>([]);
    
    useEffect(() => {
        initializeFields(props.collection);
        setFields([...defaultFields]);
    }, [props.collection]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const collection = extractCollectionFromForm(e.currentTarget);
        collection.id = props.collection.id;
        props.onSubmit(collection);
    }

    function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        props.onCancel();
    }

    if (fields.length === 0)
        return <p><em><FormattedMessage id="loading" /></em></p>;

    const optionalFieldsSelector = renderOptionalFieldsSelector(fields, () => setFields(prev => [...prev]));

    return (
        <Form onSubmit={handleSubmit}>
            {optionalFieldsSelector}
            <br /> 

            {fields.filter(f => f.value != null || f.required).map(field => 
                <TextField key={field.name} {...field} />
            )}

            <Button type="submit" className="me-1">
                <FormattedMessage id="save" />
            </Button>

            <Button type="button" onClick={handleCancel}>
                <FormattedMessage id="cancel" />
            </Button>
        </Form>
    );
}