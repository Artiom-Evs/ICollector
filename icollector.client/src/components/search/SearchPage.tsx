import { FormEvent, useState } from "react";
import { useSearchApi } from "../../hooks/useSearchApi";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { CollectionItemType } from "../../services/ItemsApiService";
import { ItemCommentType } from "../../services/ItemCommentsApiService";
import { UserCollectionType } from "../../services/CollectionsApiService";
import { ItemSearchResult } from "./ItemSearchResult";
import { FormattedMessage, useIntl } from "react-intl";
import { CollectionSearchResult } from "./CollectionSearchResult";

function renderItemsResult(items: CollectionItemType[]) {
    return (<div>
        <h2><FormattedMessage id="items" /></h2>
        {items.map(i =>
            <ItemSearchResult key={i.id} item={i} />
        )}
    </div>)
}

function renderCollectionsResult(collections: UserCollectionType[]) {
    return (<div>
        <h2><FormattedMessage id="collections" /></h2>
        {collections.map(c =>
            <CollectionSearchResult key={c.id} collection={c} />
        )}
    </div>)
}

function renderItemCommentsResult(itemComments: ItemCommentType[]) {
    return (<div>
        <h2><FormattedMessage id="in_comments" /></h2>
        <p>
            And {itemComments.length} in the different item comments.
        </p>
    </div>)
}

function renderResultsList(items: CollectionItemType[], itemComments: ItemCommentType[], collections: UserCollectionType[]) {
    return (<div>
        {collections.length === 0 ? <span /> : renderCollectionsResult(collections)}<br/>
        {items.length === 0 ? <span /> : renderItemsResult(items)}<br />
        {itemComments.length === 0 ? <span /> : renderItemCommentsResult(itemComments)}<br />
    </div>)
}

export function SearchPage() {
    const { formatMessage } = useIntl();
    const searchApi = useSearchApi();
    const [text, setText] = useState<string>("");
    const [items, setItems] = useState<CollectionItemType[]>([]);
    const [itemComments, setItemComments] = useState<ItemCommentType[]>([]);
    const [collections, setCollections] = useState<UserCollectionType[]>([]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        searchApi.searchItems(text)
            .then(response => response.data)
            .then(data => setItems(data))
            .catch(error => console.error(error));
        searchApi.searchItemComments(text)
            .then(response => response.data)
            .then(data => setItemComments(data))
            .catch(error => console.error(error));
        searchApi.searchCollections(text)
            .then(response => response.data)
            .then(data => setCollections(data))
            .catch(error => console.error(error));
    }

    const resultsList = renderResultsList(items, itemComments, collections);

    return (<div>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="text">
                    <FormattedMessage id="search_something" />
                </Label>
                <Input id="text"
                    name="text"
                    type="text"
                    placeholder={formatMessage({ id: "enter_text_to_search" })}
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
            </FormGroup>

            {resultsList}
        </Form>
    </div>)
}