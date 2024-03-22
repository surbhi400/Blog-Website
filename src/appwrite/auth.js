import conf from "../config/conf";
import { client, Account, ID} from  "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('65f895506bf25ef12de3');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

export class AuthService{
    client= new client();
    account;
    constructor(){
        this.client
                  .setEndpoint(conf.appwriteUrl)
                  .setProject(conf.appwriteprojectId);
                  this.account = new Account(this.client);
                //   .setKey(conf.apiKey);
    }
    async createAccount( email, password,name){
      try {
        const userAccount = await this.account. create(ID.unique() ,email,password,name);
       if(!userAccount){
          return this.login({email,password});
       }
       else{
           return userAccount;
       }  
      } catch (error) {
        throw error;
      }
   } 
    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();

        } catch (error) {
            throw error;
        }
        return null;
    }
    async logout(){
        try {
            let response =await this.client.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout :: error",error);
        }
    }
}
const authService = new AuthService();

export default AuthService();
