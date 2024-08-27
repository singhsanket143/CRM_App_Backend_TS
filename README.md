# Instructions to setup the app

1. Clone the repository

```
git clone https://github.com/singhsanket143/CRM_App_Backend_TS.git
```

2. Move into the directory

```
cd CRM_App_Backend_TS
```

3. Install the dependencies

```
npm i
```

4. Create a new file with the file name as `.env` in the root directory and add the following environment variables
```
PORT=3000
SALT_ROUNDS=10
JWT_SECRET='crm_app_123'
MAIL_FROM='singh.sanket1103@gmail.com'
SENDGRID_API_KEY='SG.--Yourapikey'
DATABASE_URL="mongodb+srv://singh143sanket:DAAYB4Tiy1PJICfc@cluster0.zizai0c.mongodb.net/crm_dev_db_ts?retryWrites=true&w=majority"
```

Note: Make sure you change the sendgrid api key and Database url with your own account's api key and url else all the apis of the app might not work but for the sake of the Deployment using CI CD even if you don't change then also you can test the basic ping api which is a GET request to `localhost:3000/ping`

5. Move to the src folder
   
```
cd src/
```

6. Generate prisma models

```
npx prisma init
```

7. Run the server

```
npm run dev
```

Great you have the server running on you local machine, you can now test the app by making a GET request to `localhost:3000/ping`
