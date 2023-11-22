import { FormEvent, Fragment, MouseEvent } from "react";
import { CollectionItemRequestType, CollectionItemType } from "../../services/ItemsApiService";
import { Button, Form } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { NumericField } from "../shared/NumericField";
import { TextField } from "../shared/TextField";

interface ItemDynamicFormProps {
    item: CollectionItemType,
    collection: UserCollectionType,
    onSubmit: (item: CollectionItemRequestType) => void, 
    onCancel: () => void,
}

function extractItemFromForm(form: HTMLFormElement) {
    const item = {} as CollectionItemRequestType;
    const data = new FormData(form);

    item.name = data.get("name")?.toString() ?? "";
    item.number1 = parseInt(data.get("number1")?.toString() ?? "0");
    item.number2 = parseInt(data.get("number2")?.toString() ?? "0");
    item.number3 = parseInt(data.get("number3")?.toString() ?? "0");

    return item;
}

function renderNumericFields(item: CollectionItemType, collection: UserCollectionType) {
    return (<Fragment>
        {collection.number1Name && <NumericField
            name="number1"
            value={item.number1}
            labelText={collection.number1Name}
            placeholderId="numeric_value" />}

        {collection.number2Name && <NumericField
            name="number2"
            value={item.number2}
            labelText={collection.number2Name}
            placeholderId="numeric_value" />}

        {collection.number3Name && <NumericField
            name="number3"
            value={item.number3}
            labelText={collection.number3Name}
            placeholderId="numeric_value" />}
    </Fragment>);
}

export function ItemDynamicForm(props: ItemDynamicFormProps) {
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const item = extractItemFromForm(e.currentTarget);
        item.id = props.item.id ?? 0;
        item.collectionId = props.collection.id;

        props.onSubmit(item);
    }

    function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        props.onCancel();
    }

    const numericFields = renderNumericFields(props.item, props.collection);

    return (
        <Form onSubmit={handleSubmit}>
            <TextField 
                name="name"
                value={props.item.name}
                labelId="name"
                placeholderId="item_name" />

            {numericFields}

            <Button type="submit">
                <FormattedMessage id="save" />
            </Button>

            <Button type="button" onClick={handleCancel}>
                <FormattedMessage id="cancel" />
            </Button>
        </Form>
    )
}
