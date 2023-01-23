# DET_SBK_NFT
This is a simple UI used for displaying our NFT collection in a NFT Challenge.
For use the application. Do the following
1. Clone the Repo
2. Create a .env file.
3. In your .env has the following variable set.
PORT= 3000
SESSION_SECRET = See number 4
BCRYPT_SALT = 10
ACCESS_TOKEN_SECRET = See number 4
REFRESH_TOKEN_SECRET = See number 4
4. Generate 64 Bytes random numbers for the above by doing the following
  a. At any prompt where node is available type node and hit enter.
  b. Use this command to generate required random number - "require('crypto').randomBytes(64).toString('hex')"
5. Open the packge.json file to see the configuration and to know what dependencies to install usin -> npm install "name of package" ...at the prompt for the root directory of the project. (i.e. DET_SBK_NFT)
6. a. In index.js routes folder, point/pass the location of the user.json file into fs.writeFile function on line 83.
   b. Ensure user.json in the data folder is not empty, at the very least it must contain [ ] 
In this form - C:/Users/XXXX/NFT_Challenge/DET_SBK_NFT/data/users.json
7. At a termimal prompt set at the root directory run . -> npm run serve-json
8. At another termimal prompt set at the root directory run . -> npm run start

Sign up to use interface and sign in... Note: UI only allows one user. 
A search of "ALL" displays all NFT...while fulltext search is also possible.

Note that the search is made possible by leveraging JSON Server API.
