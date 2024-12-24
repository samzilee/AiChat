import { Permission } from "appwrite";
import { Client, Databases, ID, Role } from "node-appwrite";
const project = import.meta.env.VITE_AUT_PROJECT;
const apiKey = import.meta.env.VITE_APP_WRITE_SECRET_API_KEY;
const databaseId = import.meta.env.VITE_DATABASE_ID;

const createCollection = async (collectionId, name) => {
  console.log("working...createCollection");
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(project) 
    .setKey(apiKey);
   
  return await databases.createCollection(databaseId, collectionId, name, [
    Permission.update(Role.any()),
    Permission.read(Role.any()),
    Permission.delete(Role.any()),
    Permission.create(Role.any()),
  ]);
};

const createAttribute = async(collectionId) => {
  console.log("working...createAttribute");
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(project) 
    .setKey(apiKey);

 return await databases.createStringAttribute(databaseId, collectionId, "chats", 5000000, false, "[]", false, false)
}

const createDocuments = async (collectionId) =>{
  console.log("working...createDocuments");
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(project)
    .setKey(apiKey)

  const databases = new Databases(client);
  return await databases.createDocument(
    databaseId,
    collectionId,
    collectionId,
    {"chats" : "[]"}
  );
}


const updateDocument = async (collectionId, document) =>{
  console.log("working...updateDocument");
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(project)
    .setKey(apiKey)

  const databases = new Databases(client);
  await databases.updateDocument(databaseId, collectionId, collectionId, document)
}

const listDocument = async (collectionId) =>{
  console.log("working...listDocument");
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(project)
    .setKey(apiKey)

  const databases = new Databases(client);
 return await databases.listDocuments(databaseId, collectionId)
}


export {createCollection, createAttribute,createDocuments, listDocument, updateDocument}
