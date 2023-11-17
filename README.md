# ICollector #

## Overview #

Application project for managing public personal collections (books, stamps, whiskey, etc.). It is a course project at Itransition training courses

## Requirements # 

### Functional requirements #

*   Access
    *   ✅ Registration and authentication.
    *   Authorization by next roles:
        *   Guests
            *   Only view collections and collection items.
        *   Registered users
            *   View collections and collection items.
            *   Writing comments.
            *   Managing own collections and their items. 
        *   Administrators 
            *   Access to all collections and items as owner
            *   Writing comments. 
            *   Managing own collections and their items
            *   Access to administration panel. 
    *   UI
        *  Application home page 
            *   ✅ List of the last added collection items (name, collection, author).
            *   ✅ List 5 largest collections. 
            *   Tag cloud. Search page opens after clicking on the tag. 
        *   Personal user page
            *   Provides interface to manage own collections. 
        *   Collection page 
            *   Contains collection description and list of their items.
            *   Provides ability to manage collection and their items for owner and administrators.
        *   Administration panel
            *   Available only for administrators.
            *   Provides ability to manage application users and administrators. 
        *   ✅ Color schemes
            *   ✅ Web application should support light and dark color schemes..
            *   ✅ Theme settings are saved for each user. 
        *   ✅ Internationalization 
            *   ✅ Web application should support at least two languages, English and some other (Polish, German, Russian, etc.). 
            *   ✅ Language settings are saved for each user. 
*   Logical models
    *   Collection
        *   Has ID, name and description. 
        *   Description supports Markdown format. 
        *   Has theme field with a value from a fixed list of themes. Example: „Books”, „Signs”, „Silverware”, etc. 
        *   Has optional image (as image URL).
        *   Allows to dynamically configure a set of additional item fields. 
    *   Item
        *   Has ID, name and list of the tags.
        *   Contains a dynamic set of additional fields from the list of available properties. For example: number, string, multiline text, date, time, checkbox, etc.
        *   Names of additional fields are specified by the user. 
        *   Available adding no more then 3 fields of each field type. 
    *   Tags
        *   Autocomplete support when writing tags. 
    *   Comments
        *   Displayed at the bottom of the item page. 
        *   Comments are linear (add only on the bottom of the list of comments).
        *   List of comments should update automatically (at least once every 5 seconds) without page reload. 
    *   Likes
        *   Added for items.
        *   Given only by registered users or administrators. 
        *   Only one like for one item from one user. 
*   Search
    *   Located in the site header.
    *   Search results are separated by categories: collections, items, comments.
    *   Use search engine. 

### Non-functional requirements #

*   ✅ Use CSS framework (for example, bootstrap).
*   ✅ Support for different screen resolutions, including mobiles (adaptive layout). 
*   ✅ Use ORM as a data access layer. 
*   Use full text search engine, external or built into database (DB cannot be scanned using SELECT’s for search purposes). Search engine examples: Lucen, Elastic Search.

### Additional requirements (after completing the main) #

*   Authentication via social networks.. 
*   Implement field with select from a list of options (with ability to edit list of options). 
*   Export the collection as a CSV-file. 

## Notes #

*   ✅ Local storage of authorization data is desirable. 
*   Functionality of adding a set of additional fields to items is desirable.. 
*   Maximum functionality should be implemented using ready-made external or built-in functions (full text search, tag cloud, Markdown editor and etc.).

## Start the project #

Run the following commands to create the database schema:

    dotnet ef database update -c AppIdentityDbContext
    dotnet ef database update -c ApplicationDbContext 
