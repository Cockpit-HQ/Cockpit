# Release Notes

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