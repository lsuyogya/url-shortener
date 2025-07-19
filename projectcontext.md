My thought process for the url shortener app system:

## i. Assumptions

- Runs on localhost, users can paste a url and shorten it.
- User login, unique id address for each user.
- Stack next js cuz familiar and comes with builtin features
- Has a login/register page, can register as guest
- DB will simply have user id, time generated, url and shortened url
- Time cuz you can delete after inactivity
- User login so you can track usage and have ads / monetization later down the line
- show 404 page if user sends invalid app
- User metrics from log dumps? database?
- URLs are unique to user. Same url by 2 users is shortened to different short urls.

## ii. User Flow

- User regisetrs / logs in
- User can add a url
  - Potentially show links with usage metrics and etc dashboard
- User can share the link (browser share api)

- User enters a shortened link
- User gets shown an app screen and potential ad or some coontent for 2-5 sec and redirects to the other site.

## iii. App flow

- Authenticate User
- On input form submit
  - Check if the user has entered the url before
    - If has, return that url
    - Else generate new URL and add to database

psql -U postgres -d url-shortener -h localhost -p 5433
