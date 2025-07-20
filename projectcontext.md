My thought process for the url shortener app system:

## i. Assumptions

- Shortened url by user is tored on app db and used to redirect users.
- users can input a url and shorten it..
- Stack next js cuz familiar and comes with builtin features.
- Defaults to a login/register page.
- User login so you can track usage and have ads / monetization later down the line.
- Show 404 page if user sends invalid url.
- User metrics (Visits) in database.
- URLs are unique to user. Same url by 2 users is shortened to different short urls.

## ii. Client User Flow

- User regisetrs / logs in
- User can add a url
  - Potentially show links with usage metrics and etc dashboard
- User can share the link (browser share api)
- User enters a shortened link, gets shown an app screen and potential ad or some content for x sec.s and redirects to the other site.
- User enters invalid share url, gets redirected to 404 page.
