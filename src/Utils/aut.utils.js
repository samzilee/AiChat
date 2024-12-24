import { Client, Account } from "appwrite";
const project = import.meta.env.VITE_AUT_PROJECT;

 const LogInAppWrite = (email, password) => {
    console.log("working...logIn")
    const client = new Client()
        .setProject(project); // Your project ID
    const account = new Account(client);
    return account.createEmailPasswordSession(email, password);

}

 const signUpAppWrite = (id, email, password, name) => {
    console.log("working...signUp");
    const client = new Client()
        .setProject(project); // Your project ID
    const account = new Account(client);
  return  account.create(id, email, password, name);
}

const logOut = async() => {
    console.log("working...logOut");
    
    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(project); // Your project ID

    const account = new Account(client);

    return await account.deleteSession(
        "current"
    );
}


export {LogInAppWrite, signUpAppWrite, logOut}