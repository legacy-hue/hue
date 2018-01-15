# Road Map

## Component Overview
- This is a list of what each component is responsible for rendering.

- Index: nav bar + some other component based on the url
- Home: main page
- Submit: submit new post page
- Login: login page
- NavBar: menu at the top
- UserProfile: profile page
- EntryList: the list of posts
- Entry: individual entries
- CommentList: a list of comments
- CommentEntry: individual comments
- CommentData: the title of the entry a comment was made on

## Auth

- Done using bcrypt
- Persistence achieved by adding username prop to session object

## Styling

- Most styling was done using semantic-ui
- The style.scss sheet was used to override a few semantic-ui styles
- Styled components were used on index.jsx for positioning

## React Router 4

- We found these docs to be very good
- https://reacttraining.com/react-router/web/guides/philosophy

- Helpful video explaining protected routes
- https://tylermcginnis.com/react-router-protected-routes-authentication/

## Karma Bug

- 1. Description:
- Karma aka prestige aka up/down votes do not always display correctly

- 2. Additional Info:
- Components that display karma rely on thumbsUp/thumbsDown state
- The thumbs state is updated using "getCommentVotes" function
- "getCommentVotes" is invoked whenever a user votes or on "componentWillReceiveProps"

- 3. Working Theory:
- The thumbs state is not always being updated when it should
- Specifically, it may need to be updated onComponentDidMount
