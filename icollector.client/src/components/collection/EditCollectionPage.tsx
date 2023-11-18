import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useCollectionsApi } from "../../hooks/useCollectionsApi";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { FormattedMessage, useIntl } from "react-intl";

export function EditCollectionPage() {
    const { formatMessage } = useIntl();
    const { state } = useLocation();
    const navigate = useNavigate();
    const collectionsApi = useCollectionsApi();
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    

    useEffect(() => {
        if (!state?.id)
            return;
        collectionsApi.get(state.id)
            .then(response => response.data)
            .then(data => {
                setId(data.id);
                setName(data.name);
                setDescription(data.description);
            });
    }, [state, collectionsApi]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        collectionsApi.update(id, {
            id, name, description
        } as UserCollectionType)
            .then(() => {
                navigate("/collection", {
                    state: {
                        id
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
                        <FormattedMessage id="edit_collection" />
                    </h1>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup floating>
                            <Input id="collection-name"
                                name="name"
                                placeholder={formatMessage({ id: "collection_name" }) }
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