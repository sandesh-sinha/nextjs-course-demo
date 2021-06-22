import {MongoClient} from 'mongodb';
async function handler (req, res) {
    if(req.method === 'POST'){
        const data = req.body; 
        console.log('making the request');
        const client = await MongoClient.connect('mongodb+srv://sandesh-user:sandesh-user@cluster0.gex2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message : 'Meetup inserted !'});
    } 
}
export default handler ;