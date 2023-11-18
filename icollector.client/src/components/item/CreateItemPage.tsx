import { ChangeEvent, FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { useItemsApi } from "../../hooks/useItemsApi";
import { CollectionItemRequestType } from "../../services/ItemsApiService";

export function CreateItemPage() {
    const { state } = useLocation();
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const itemsApi = useItemsApi();
    const [name, setName] = useState<string>("");
    
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        itemsApi.post({
            collectionId: state?.collectionId ?? 0,
            name
        } as CollectionItemRequestType)
            .then(response => response.data)
            .then(data => {
                navigate("/item", {
                    replace: true,
                    state: {
                        id: data.id
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
                        <FormattedMessage id="add_new_item" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup floating>
                            <Input id="item-name"
                                name="name"
                                placeholder={formatMessage({ id: "item_name" })}
                                required
                                value={name}
                                onChange={handleNameChanged}
                            />
                            <Label for="item-name">
                                <FormattedMessage id="name" />
                            </Label>
                        </FormGroup>

                        <Button type="submit">
                            <FormattedMessage id="add" />
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}