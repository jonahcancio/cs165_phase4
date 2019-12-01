# Pokemon Team Building CRUD App

This project assumes the ff:
* Your OS is Windows 10
* You have MySQL 8 or higher installed
* You have NodeJS installed and npm is fully functional
* Your browser can run ES5 Javascript properly


## Steps for running the program

1. Extract the everything from the zip

2. Open command prompt in the **/database** directory and run the ff:
   
   Inside /database directory:
   ```
   mysql -u root -p
   ```
   Type your root password to enter the mysql console  

   Inside mysql console:
   ```
   source final_db.sql
   ```
   Wait for Mysql to finish executing all the queries

3. Open a **separate** command prompt in the **/server** directory and run the ff:

   Inside /server directory:
   ```
   npm install
   npm run dev
   ```
   You should see a line saying: `Am running at port 3000`.

   The backend is now up and running.

4. Open **separate** command prompt in the **/client** directory and run the ff:

   Inside /client directory:
   ```
   npm install
   npm run serve
   ```
   You should see a few lines saying: 
   ```
   App running at: 
     - Local:   http://localhost:8080/
     - Network: http://192.168.1.143:8080/
   ```

   The frontend is now up and running.

5. Open your browser and enter the url: <http://localhost:8080/#/pokemon>