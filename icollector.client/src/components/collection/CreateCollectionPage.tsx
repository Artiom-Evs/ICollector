import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { FormattedMessage, useIntl } from "react-intl";

export function CreateCollectionPage() {
    const { formatMessage } = useIntl();
    const navigate = useNavigate();
    const collectionsApi = useCollectionsApi();
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        collectionsApi.post({
            name, description
        } as UserCollectionType)
            .then(response => response.data)
            .then(data => {
                navigate("/collection", {
                    replace: true,
                    state: {
                        id: data.id
                    }
                });
            })
    }

    function handleNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }

    function handleDescriptionChanged(e: ChangeEvent<HTMLInputElement>) {
        setDescription(e.currentTarget.value);
    }

    return (
        <div>
            <div className="card">
                <div className="card-header d-flex justify-content-center">
                    <h1>
                        <FormattedMessage id="create_new_collection" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup floating>
                            <Input id="collection-name"
                                name="name"
                                placeholder={formatMessage({ id: "collection_name" })}
                                required
                                value={name}
                                onChange={handleNameChanged}
                            />
                            <Label for="collection-name">
                                <FormattedMessage id="name" />
                            </Label>
                        </FormGroup>

                        <FormGroup floating>
                            <Input id="collection-description"
                                name="description"
                                placeholder={formatMessage({ id: "collection_description" })}
                                required
                                value={description}
                                onChange={handleDescriptionChanged}
                            />
                            <Label for="collection-description">
                                <FormattedMessage id="description" />
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