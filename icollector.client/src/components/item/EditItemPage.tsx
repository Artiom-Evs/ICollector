import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { useItemsApi } from "../../hooks/useItemsApi";
import { CollectionItemRequestType } from "../../services/ItemsApiService";

export function EditItemPage() {
    const { formatMessage } = useIntl();
    const { state } = useLocation();
    const navigate = useNavigate();
    const itemsApi = useItemsApi();
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [collectionId, setCollectionId] = useState<number>();

    useEffect(() => {
        if (!state?.id)
            return;
        itemsApi.get(state.id)
            .then(response => response.data)
            .then(data => {
                setId(data.id);
                setName(data.name);
                setCollectionId(data.collection.id);
            });
    }, [state, itemsApi]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        itemsApi.put(id, {
            id, name, collectionId
        } as CollectionItemRequestType)
            .then(() => {
                navigate("/item", {
                    replace: true,
                    state: {
                        id
                    }
                });
            })
            .catch(error => console.error(error));
    }

    function handleNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }
    
    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <h1>
                        <FormattedMessage id="edit_item" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup floating>
                            <Input id="collection-name"
                                name="name"
                                placeholder={formatMessage({ id: "item_name" }) }
                                required
                                value={name}
                                onChange={handleNameChanged}
                            />
                            <Label for="collection-name">
                                <FormattedMessage id="name" />
                            </Label>
                        </FormGroup>

                        <Button type="submit">
                            <FormattedMessage id="save" />
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}