<h1> RESTFull API ArtTos E-Wallet </h1>

<h2> About </h2>
<hr>
ArTTos backend is architectural for an application program interface (API) that uses HTTP requests to access and use data.

<h2> Built With </h2>
<hr>

![Node](/assets/images/node.png)
![Node](/assets/images/express.png)

<h2>Requirements</h2>
<hr>

- Node Js
- Cloudynary (for storage pictures)
- Json Web Token 
- .etc You can see other requirements at pacakage.json

<h2> How to use This Resfull API </h2>
<hr>

1. Clone this project
2. Open this project using the code editor
3. Type npm install on your terminal (on the folder this project)
4. Set up .env (if the file doesn't exist, create a .env file)
5. Export Database, you can download Database [here](https://drive.google.com/file/d/1g_Nu5OFJLDflH_SVjtUiMxJEOpTMralY/view?usp=sharing)
6. Export postman file you can use file [this](https://drive.google.com/file/d/1zepZsElMKeAFdM6v8GAoOFKrE2MvtmxL/view?usp=sharing)
7. You can also access this RESTFull API in url https://fw9-backend-tau.vercel.app/

<h2> Endpoint </h2>
<hr>
<table>
  <tr>
    <th>URL</th>
    <th>Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/auth/register</td>
    <td>POST</td>
    <td>Register new user</td>
  </tr>
  <tr>
    <td>/auth/login</td>
    <td>POST</td>
    <td>Login into the app</td>
  </tr>
  <tr>
    <td>/auth/createPin</td>
    <td>POST</td>
    <td>Create PIN for new User</td>
  </tr>
  <tr>
    <td>/auth/logout</td>
    <td>POST</td>
    <td>Logout app (but still, have an issue)</td>
  </tr>
  <tr>
    <td>/profile/createphone</td>
    <td>POST</td>
    <td>Create Phone Number for new user</td>
  </tr>
  <tr>
    <td>/transactions/transfer</td>
    <td>POST</td>
    <td>Transfer Amount to other users</td>
  </tr>
  <tr>
    <td>/transactions/top-up</td>
    <td>POST</td>
    <td>Top Up balance</td>
  </tr>
  <tr>
    <td>/profile/updatephone</td>
    <td>PATCH</td>
    <td>Change user phone number</td>
  </tr>
  <tr>
    <td>/profile/updateprofile</td>
    <td>PATCH</td>
    <td>Change profile name, picture .etc</td>
  </tr>
  <tr>
    <td>/profile/updatepassword</td>
    <td>PATCH</td>
    <td>Change Password user</td>
  </tr>
  <tr>
    <td>/profile/updatepin</td>
    <td>PATCH</td>
    <td>Change PIN user</td>
  </tr>
  <tr>
    <td>/users/getallusers</td>
    <td>GET</td>
    <td>Show All users except logged in users</td>
  </tr>
  <tr>
    <td>/profile/getprofile</td>
    <td>GET</td>
    <td>Show Profile user</td>
  </tr>
  <tr>
    <td>/transactions/trans/:id</td>
    <td>GET</td>
    <td>Show transaction by ID</td>
  </tr>
   <tr>
    <td>/transactions/trans-history</td>
    <td>GET</td>
    <td>Show Transactions History (Limit default 5 users)</td>
  </tr>
   <tr>
    <td>/users/getuserdetail/:id</td>
    <td>GET</td>
    <td>Show user by ID</td>
  </tr>

</table>

<h2> Set Up .env </h2>
<hr>

PORT= //Your Port

DATABASE_URL= // Your DATABASE_URL

CLOUD_NAME = //Your Clodinary CLOUD_NAME

API_KEY = // Your clodinary API_KEY

API_SECRET = // Your clodinary API_SECRET

DATA_LIMIT = // Data Limit for limit show data

SIZE_IMG_LIMIT = //size file picture

APP_SECRET = // your random for APP_SECRET

