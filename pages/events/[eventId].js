// import { useRouter } from "next/router";
// import { getEventById } from "@/dummy-data";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";

import { getEventById, getAllEvents, getFeaturedEvents } from '@/helpers/api-util';

import Head from "next/head";


function EventDetailPage(props) {

    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);

    const event = props.event


    if (!event) {
        return (
            <div className="center">
                <ErrorAlert>
                    <p>No events found</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button> 
                </div>
            </div>
        );
    }
        
    return (
        <div>
            <Fragment>
                <Head>
                    <title>{event.title}</title>
                    <meta name="description" content={event.description} />
                </Head>

                <EventSummary title={event.title} />
                <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
                <EventContent>
                    <p>
                        {event.description}
                    </p>
                </EventContent>
            </Fragment>
        </div>
    );
}




export async function getStaticPaths() {

    // const events = await getAllEvents();
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({ params : { eventId : event.id }}));

    return {
        paths: paths,
        fallback: 'blocking'
    };
}



export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    if (!event) {
        return {
            props: {
                hasError: true
            }
        }
    }

    return {
        props: {
            event: event
        },
        revalidate: 30
    }
}






export default EventDetailPage;