## App Description &#128209;

This API based on NodeJS (ExpressJS) and provides endpoints for signIn/signUp with JWT, editing and viewing users profile.

## Launch instructions &#128190;
  
&#9881; **Backend**:

- ExpressJS;
- PostgreSQL;
- Sequelize;
- Docker;

<div style="display: flex; justify-content: end;">
  <p>Git and Docker should be installed locally on Your PC.</p>
</div>

---

1. Clone repository to Your local path:

  ```sh
  cd <your_local_path> && git clone <http/ssh-link>
  ```

2. Run compose:

  ```sh
  cd SimpleAuth2 && docker compose  --env-file ./.env.public -f ./compose.yaml up --build   
  ```

3. After the installation is complete the web-app will start on: `0.0.0.0:<EXPRESS_SERVER_PORT>`:

- `<EXPRESS_SERVER_PORT>` - is defined in `./.env.public`;

4. Stop the web-app press in current terminal:

  ```sh
  Ctrl + C
  # or
  docker compose --env-file ./.env.public stop
  ```

5. Start again the web-app:

  ```sh
  docker compose --env-file ./.env.public start
  ```

6. To completely remove all related docker containers, docker images, volumes and related data:

  ```sh
  docker compose --env-file ./.env.public down --volumes --rmi all
  ```

  <span style="color: rgb(255, 0, 0)">After this step, it is need to go back to point №2 to run web-app again.</span>

---

### p.s

- Local environment variables can be changed in the `./.env.public`<br/>

## API routes &#128190;

1. **/test** - receive test message from server;

2. **/api/v1/auth/signup** - sign up for new users;

3. **/api/v1/auth/signout** - sign out;

4. **/api/v1/auth/signin** - sign in for registered users with access token in response, refresh token is set by oto-relation in database;

5. **/api/v1/auth/refresh** - refresh access token;

6. **/api/v1/users/profile** - receive information about user's profile according to provided payload in JWT;

7. **/api/v1/users/profile** - partially update user's profile;

8. **/api/v1/users/profile** - soft delete users's profile;

9. **/api/v1/users/profile/restore** - restore previously deleted user's profile;

<br>

---
