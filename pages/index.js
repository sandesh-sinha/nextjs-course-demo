import {Fragment} from 'react';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import {MongoClient} from 'mongodb';
// const DUMMY_MEETUPS =  [
//     {
//         id : 'm1',
//         title : 'A first meetup',
//         image : 'https://www.telegraph.co.uk/content/dam/insurance/2016/04/06/amsterdam.jpg?imwidth=1400',
//         address : 'Amsterdam',
//         description : 'Awesome meetup',
//     },
//     {
//         id: 'm2',
//         title : 'Second meetup',
//         image : 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/25/13/74.jpg',
//         address : 'New York',
//         description : 'Love meetup',
//     }
// ]
function HomePage(props){
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta 
                    name='description'
                    content='Browse a huge list of meetups'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context){
//     // fetch data
//     const req = context.req ;
//     const res = context.res ;

//     return {
//         props: {
//             meetups : DUMMY_MEETUPS
//         },
//     }
// }
export async function getStaticProps(){
    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://sandesh-user:sandesh-user@cluster0.gex2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    console.log(meetups);
    client.close();
    return {
        props: {
            meetups : meetups.map(meetup => ({
                title : meetup.title,
                image : meetup.image,
                address : meetup.address,
                id : meetup._id.toString()
            })),
        },
        revalidate : 1
    };
}

export default HomePage;