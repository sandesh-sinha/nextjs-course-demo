import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {Fragment} from 'react';
function NewMeetUpPage () {
    const router  = useRouter();
    async function addMeetupHandler(enteredMeetupData){
        console.log(enteredMeetupData);
        const response = await fetch('/api/new-meetup', {
            method : 'POST',
            body : JSON.stringify(enteredMeetupData),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    }
    return (
        <Fragment>
            <Head>
                <title>Add a new meetup</title>
                <meta 
                    name='description'
                    content='add your meetup'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}
export default NewMeetUpPage;