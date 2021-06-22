import {Fragment} from 'react';
import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import Head from 'next/head'
function MeetupDetails(props){
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta 
                    name='description'
                    content='all your data'
                />
            </Head>
        <MeetupDetail image={props.meetupData.image}
                      title={props.meetupData.title}
                      address={props.meetupData.address}
                      description={props.meetupData.description} />
        </Fragment>
    )
}
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://sandesh-user:sandesh-user@cluster0.gex2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id: 1}).toArray();
    client.close();
    return {
        fallback : false,
        paths : meetups.map( meetup => ({
            params : {
                meetupId : meetup._id.toString()
            }
        }))
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://sandesh-user:sandesh-user@cluster0.gex2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedmeetup = await meetupsCollection.findOne({_id : ObjectId(meetupId)});
    client.close();
    return {
        props : {
            meetupData : {
                id : selectedmeetup._id.toString(),
                title : selectedmeetup.title,
                image : selectedmeetup.image ,
                address : selectedmeetup.address,
                description : selectedmeetup.description
            }
        }
    }
}
export default MeetupDetails;