## Linkr Backend

The Linkr is the best new social media to save and share links.

This project is the backend with PostgreSQL for [Linkr](https://linkr-rust.vercel.app/). You can check the [frontend repository](https://github.com/AntonioGMN/Linkr_frontend) for more information.

You can use the [endpoint deployed to heroku](https://linkr390.herokuapp.com)
Below are the implemented features:

- [x] Sign-up, log-in, and logout
- [x] Get posts
- [x] Get trending
- [ ] Follow/unfollow
- [ ] Like posts
- [x] Search users

## Endpoints

### All following needs token authorization

<details>
    <summary>
        <strong >Authorization</strong>
    </summary>
- send a Bearer token on headers like this:

```json
{
  "headers": {
    "authorization": "Bearer 1cf7cccf-48ad-4edd-8b9d-121b1199aaf4"
  }
}
```

- it returns <strong>400</strong> for empty auth, without Bearer or token not uuid

- it returns <strong>401</strong> for unauthorized

</details>

<details>
    <summary>
        <strong>POST</strong> /posts
    </summary>
send body request like this:

```json
{
  "link": "https://www.google.com/",
  "text": "awesome #search engine"
}
```

- text is optional

- it returns status <strong>201</strong> for success

and object like this

```json
{
  "post": {
    "id": 49,
    "link": "https://www.google.com/",
    "text": "awesome #search engine",
    "time": "2022-03-29T23:48:56.636Z",
    "linkTitle": "Google",
    "linkDescription": "Link doesn't have a description",
    "linkImage": "/images/branding/googleg/1x/googleg_standard_color_128dp.png"
  },
  "user": {
    "id": 2,
    "email": "goku@kame.com",
    "name": "goku",
    "pictureUrl": "https://dragonball.com/goku.jpeg"
  },
  "like": []
}
```

</details>
<details>
    <summary>
        <strong>GET</strong> /hashtags/trending
    </summary>

- it returns status <strong>200</strong> for success

and array like this

```json
[
  {
    "count": "10",
    "name": "#topTrending",
    "id": 13
  },
  {
    "count": "5",
    "name": "miranha",
    "id": 12
  }
]
```

- count is the number of mentions

</details>

<details>
    <summary>
        <strong>GET</strong> /hashtags/HASHTAG/posts
    </summary>

- it returns status <strong>200</strong> for success

- change HASHTAG to the hashtag you're looking for

and array like this

```json
[
  {
    "id": 27,
    "text": "testing is cool #teste",
    "link": "https://www.google.com/",
    "linkTitle": "Google",
    "linkDescription": "Link doesn't have a description",
    "linkImage": "/images/branding/googleg/1x/googleg_standard_color_128dp.png",
    "authorId": 2,
    "name": "goku",
    "pictureUrl": "https://dragonball.com/goku.jpeg",
    "likes": [],
    "hashtags": []
  },
]
```

- count is the number of mentions

</details>

<details>
    <summary>
        <strong>GET</strong> /posts
    </summary>

- it returns status <strong>404</strong> if there are no follows or posts of follows

- it returns status <strong>200</strong> for success

and array like this

```json
[
  {
    "id": 3,
    "link": "https://www.google.com/",
    "text": "",
    "authorId": 1,
    "linkTitle": "Google",
    "linkDescription": "Link doesn't have a description",
    "linkImage": "/images/branding/googleg/1x/googleg_standard_color_128dp.png",
    "name": "cat",
    "pictureUrl": "https://http.cat/411.jpg",
    "likes": [
      {
        "postId": 1,
        "userId": 2,
        "userName": "simpson"
      }
    ]
  },
]
```

- count is the number of mentions

</details>

## Technologies

<div style="display: flex; gap: 10px; height: 40px;">
  <a title="JavaScript" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" height="40"/>
  </a>
  <a title="Node JS" href="https://nodejs.org" target="_blank" rel="noreferrer"> 
      <img style="background: white;" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" height="40"/> 
  </a>
  <a title="Express JS" href="https://expressjs.com/" target="_blank" rel="noreferrer"> 
      <img style="background: white;" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="expressjs" height="40"/> 
  </a>
  <a title="PostgreSQL" href="https://www.postgresql.org/" target="_blank" rel="noreferrer"> 
      <img style="background: white;" src="https://www.postgresql.org/media/img/about/press/elephant.png" alt="postgresql" height="40"/> 
  </a>
</div>

## Requirements

### [npm](https://www.npmjs.com/)

<details>
    <summary>install npm</summary>

```bash
wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh> | bash

## Or this command
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# Close and open terminal
nvm install --lts
nvm use --lts
# Verify node version
node --version # Must show v14.16.1
# Verify npm version
npm -v
```

</details>

### [postgreSQL](https://www.postgresql.org/)

<details>
    <summary>install postgres</summary>

```bash
sudo apt install postgresql postgresql-contrib
```

</details>

## How to run

1. Clone this repository
2. Install dependencies

```bash
npm i
```

3. Create database with given script

- open ./database and run sql scripts

4. set your .env file

5. Run the project with

```bash
npm run start (deploy)
```

6. Run the project in development mode (nodemon)

```bash
npm run start:dev
```
