import { useRouter } from "next/router";
// import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { Fragment } from "react";

import { getAllEvents } from "@/helpers/api-util";

import Head from 'next/head';


function AllEventsPage(props) {

    // const events = getAllEvents();
    const router = useRouter();

    const { events } = props;

        
    function findEventsHandler(year, month) {
        
        const fullPath = `/events/${year}/${month}`;
        
        router.push(fullPath);
    }



    return (
        <Fragment>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Great events!" />
            </Head>

            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={props.events} />
        </Fragment>
    );
}


export async function getStaticProps() {
    
    const eventsList = await getAllEvents();

    return {
        props: {
            events: eventsList
        }, 
        revalidate: 100
    }
}


export default AllEventsPage;