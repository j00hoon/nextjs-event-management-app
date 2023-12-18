// import { getFeaturedEvents } from "../dummy-data";

import Head from 'next/head';

import { getAllEvents, getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/event-list";

function HomePage(props) {

    
   
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Great events!" />
            </Head>

            <EventList items={props.events} />
        </div>
    );
}


export async function getStaticProps() {

    const eventsList = await getAllEvents();

    return {
        props: {
            events: eventsList
        },
        revalidate: 1800
    }
}

export default HomePage;