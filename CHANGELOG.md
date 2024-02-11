# Release Notes


## 2.8.1 (2024-02-11)

- Allow to configure thumbnail storage path via config
- Fix content preview #171
- Update Vue to 3.4.18

## 2.8.0 (2024-01-31)

- Lazy loading of asset preview images
- Update Vue to version 3.4.15
- Require PHP >=8.2
- Add vips config option for more performant thumbnail generation
- Add ffmpeg config option for more video thumbnail generation support
- Fix download file / folder (Finder)
- Add alt text info for image assets
- Render asset field with multiple values as grid
- Add support for ${ENV_VAR} in config values
- Allow custom database settings on space creation
- Spaces groups
- Add account verification before deleting a space
- Add assets sorting
- Add quick sort tree item (move first or last)

## 2.7.2 (2023-12-30)

- Refactor fields renderer to support custom actions on fields
- Update Vue to version 3.4.0
- Sort content models alphabetically on overview page
- Add config option to store content models in database
- Fix table field scrollposition jump on editing data
- Filter also assets folder on simple string based search queries
- Add assets view limit setting (assets manger view)
- Trigger upload dialog when dragging files into assets manager
- Upload assets one by one to overcome max upload size limit

## 2.7.1 (2023-10-08)

- Fix broken assets loading for asset field with multiple values
- Fix referenced assets updates for content tree items
- Fix mime type of generated thumbnails in assets manager
- Add tower web console availability check
- Add fields outline for better navigation

## 2.7.0 (2023-09-15)

- Fix mime type detection on asset upload
- Fix possible Cross-site Scripting (XSS) in Rest/GraphQL viewer
- Add src setting for slect and tag fields to load options from internal sources
- Sanitize space name during installation
- Multiselect & delete of assets
- Add thumbhash to image assets on upload
- Move buckets code to system module
- Add support for custom meta data for asset fields
- Support for multiple assets selection (eg asset field with multiple values)
- Add color field value render function to show color in items list
- Add table view to assets manager

## 2.6.3 (2023-08-15)

- Prevent uploading .phps + .(x)html files in assets manager
- Require verification for updating user data
- Support post field projection after content population (via ..{fieldname})
- Extract width + height and colors from uploaded svg files
- Implement HTTP caching when using response cache (via rspc parameter)
- Resolve `{field}:locale` in filter and sort parameters
- Optimize icon font size
- Add missing meta fields to GraphQL model definitions @filipmiik
- Fix long text expanding grid items

## 2.6.2 (2023-07-31)

- Add video frame preview (assets manager)
- Fix `$not` for MongoLite
- Add `app.system.install` event trigger on initial installation
- Add support for closing dialogs via `Escape`
- Add cached modules loading
- Update icon font
- Fix global error handler when using spaces
- Auto map :{space}/storage/* to .spaces/{space}/storage/* (Apache)

## 2.6.1 (2023-06-24)

- Fix api token checking

## 2.6.0 (2023-06-21)

- Try to auto-generate meaningful linked content preview if display setting is missing
- Update Vue to v3.3.4
- Add missing permission settings @raffaelj
- Improve role permissions UI
- Show locale value picker only if multiple locales are available
- Use `crypto.randomUUID()` only if available
- Populate only allowed models in content api (thanks @Ccamm)
- Fix possible content `models` permission naming collision (thanks @raffaelj)
- Fix internal content find/populate api exposing data to users without required rights (thanks @raffaelj)
- Fix empty settings screen
- Add csrf token validation to internal api calls to improve security (thanks @Ccamm)
- Add clone functionality to tree content items
- Add additional checks to `/api/system/healthcheck`
- Fix disabling asset picker in wysiwyg field
- Improve fields projection (eg nested fields) when using MongoLite as data storage
- Use AG Grid instead of Tabulator.js as a foundation for the table field
- Limit number of files to upload in admin ui based on php setting `max_file_uploads`

## 2.5.2 (2023-05-18)

- Fix link content item dialog
- Update vendor libs

## 2.5.1 (2023-05-15)

- Fix js error thrown in dialog component
- Remove 2FA info from internal users/load api
- Update icons
- Minor UI improvements
- add `content.remove.before` event
- Refactor `kiss-popoutmenu` component to `kiss-popout`
- Introduce `user-info` component
- Update Vue to v3.3.2
- Update vendor libs

## 2.5.0 (2023-04-15)

- Fix initial item position on tree item creation
- Add avif image type support (depending on used GD lib)
- Add experimental natural language to mongo query support (only for admin ui filtering collection items and assets)
- Add lightweight indexing library (for full-text search)
- Make logged login data configurable
- Add filter models feature on role permission page
- Fix populate option singleton data queries via GraphQL
- Clone / duplicate collection items
- Refactor admin ui language loading
- Add `content:field:remove` and `content:field:rename` tower cli commands to cleanup content data after model changes


## 2.4.1 (2023-03-20)

- Add field preview renderer for boolen field
- Fix tag field
- Add display meta property support for tree content models
- Add active property to field-nav items
- Add additional security check when uploading files
- Fix assets image cache check
- Add thumbnail api usage to internal bucket storage file previews
- Improve revisions display performance

## 2.4.0 (2023-03-08)

- Add additional security check editing php files in finder
- Fix base64 encoding data not in latin char range
- Add internal bucket storage container feature
- Add /content/tree/{model} api endpoint
- Batch edit content items
- Update vendor libs

## 2.3.9 (2023-02-13)

- Fix batch state update (when using MongoLite) #75
- Fix min/max settings for number fields #76
- Set X-Frame-Options to prevent possible clickjacking via iframe layer
- Allow to load linked content items in display previews #78
- Allow to load thumbnails from linked assets in display previews

## 2.3.8 (2023-02-04)

- Fix not allowed user role modification by intercepting request
- Fix tree item view #72
- Update Vue to v3.2.47
- Improve svg loading for <kiss-svg /> elements
- Update vendor libs

## 2.3.7 (2023-01-31)

- Batch update collection items state
- Add state filter to collection items view
- Fix possible infinite content population loop
- Fix filter option for collection link field
- Add content view aside event triggers
- Deep clone data object for preview interpolation
- Update vendor libs

## 2.3.6 (2023-01-03)

- Fix tree model nesting items
- Fix table preview for repeatable wysiwyg fields
- Fix clearing readonly fields
- Fix filter option for collection link field
- Update vendor libs

## 2.3.5 (2022-12-15)

- Fix getallheaders keys
- Improve assets api error message on missing parameters
- Add placeholder container if empty nav field
- Add autofocus to app search field on show
- Add current locale context to fields in fields renderer component
- Invalidate opcache for edited php files via finder
- Remove avif support due to unpredictable server configurations
- Fix PHP 8.2 related issues
- Fix `maxlevel` meta property if value is 0
- Define default sorting of items in collection model meta settings
- Auto-resolve $DATE() values in db queries

## 2.3.4 (2022-11-25)

- Fix user settings updating for users without admin role
- Update vendor libs
- Update Vue to 3.2.45
- Cache loaded icons in admin view
- Add drag'n drop upload of files support (finder module)
- Fix cross-origin error (content previews) @isemog

## 2.3.3 (2022-11-02)

- Add ESC + auto focus support for dialogs
- Update Vue to 3.2.41
- Add finder module (only for super admin users)
- Set default value to false for boolean fields
- Update vendor libs

## 2.3.2 (2022-10-24)

- Add clear cache action
- Fix spaces load error if spaces folder does not exists


## 2.3.1 (2022-10-21)

- Fix return type for Utils::parseSize
- Update Uppy.js to v3.0.1
- Resolve nested linked content items on content item population
- Auto-populate content item for content previews
- Fix response cache
- Fix time field error (list option)
- Refactor CORS preflight handling
- Add spaces feature (beta)

## 2.3.0 (2022-09-16)

- Update vendor libs
- Fix field-object js error
- Don't apply default content fields on update (saveItem)
- Fix GraphQL error when numeric field names are used
- Fix wysiwyg field (Safari) #24
- Fix enter on selected result in app search
- Update Vue to 3.2.39
- Improve custom api endpoint resolving
- Fix updating items via API #27 @o-


## 2.2.2 (2022-08-20)

- Add `./tower app:update` cli command to update Cockpit to the latest or specific version
- Fix exposing 2FA secret in JWT token on login
- Enable keyboard navigation in search modal #14 @raffaelj
- Prevent double loading of field-code.js #15 @raffaelj
- Fix 2fa for login modal #13 @raffaelj

## 2.2.1 (2022-08-10)

- Fix linked tree content item display resolver
- Refactor content models index page

## 2.2.0 (2022-08-08)

- Add create|update|delete endpoints content item to REST API
- Add GraphQL mutation saveContentItem to create|update content items
- Add GraphQL mutation deleteContentItem to delete content items
- Add app side panel (admin layout)
- Stop execution of code after redirecting

## 2.1.2 (2022-08-04)

- 🚨 Fix typo field-contentItemtLink -> Need to re-assign field type contentItemLink 🚨
- General cleanup + fix typos
- Add content tree items reorder permission
- Refactor app layout header
- Show more detailed error message if saving user settings fail
- Hide publish state configuration ui if missing permission to mange publish state
- Fix selected item link of tree model
- Fix missing assets folders permission checks

## 2.1.1 (2022-08-02)

- Fix tree model route in app search results
- Fix loosing nested level on saving tree item

## 2.1.0 (2022-08-01)

- Add initial global app search implementation (alt|option + f)
- Minor fixes on closing html tag + uninitialized variable #11 @remluben
- Update lib/vendor
- Update vendor assets sortablejs v1.15, uppy v2.13.1, tinyMCE v6.1.2
- Add model type tree - organize content items as tree

## 2.0.2 (2022-07-20)

- Fix select boxes in dark theme (chrome on windows) #8
- Change login (noun) to log in (verb)
- Fix required field check on nested repeatable items
- Enable picking item by clicking on empty placeholder area (Asset + Content Link field)
- Open api playground with preselected api key
- Enable clear field function also in nested fields
- Make fields-manger + fields-renderer component available by default
- Set content model icon

## 2.0.1 (2022-07-17)

- Refactor admin ui localization
- Object.freeze App._vars + App._paths
- Make logged in user information available on the client side (App.user)
- Update .htaccess file to deny public access to php files except router entry index.php
- Add visual hover state to content item tables

## 2.0.0 (2022-07-13)

- Initial release 🍾🥳