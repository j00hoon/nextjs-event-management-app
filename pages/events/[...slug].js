import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
// import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import { getFilteredEvents } from "@/helpers/api-util";

import Head from "next/head";



function FilteredEventPage (props) {

    // const router = useRouter();

    // const filterData = router.query.slug;
    
    // if (!filterData) {
    //     return (
    //         <p className='center'>Loading...</p>
    //     );
    // }








    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

//     if (props.hasError) {
//         return (
//             <Fragment>
//                 <ErrorAlert>
//                     <p>Invalid filter.</p>
//                 </ErrorAlert>
//                 <div className='center'>
//                     <Button link='/events'>Show all events</Button> 
//                 </div>
//             </Fragment>
//         );
//     }






    const filteredEvents = props.events;


    const pageHeadData = (
        <Head>
            <title>{filteredEvents.title}</title>
            <meta name="description" content={`All events for ${props.date.year}/${props.date.month}.`} />
        </Head>
    );


    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show all events</Button> 
                </div>
            </Fragment>
        );
    }




    

    const date = new Date(props.date.year, props.date.month - 1);

    console.log('year : ' + props.date.year + ' month : ' + props.date.month);
    console.log('event : ' + filteredEvents);

    

    
    return (
        <Fragment>
            {pageHeadData}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}




// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filterData = params.slug;

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (isNaN(numYear) || 
//         isNaN(numMonth) || 
//         numYear > 2030 || 
//         numYear < 2021 || 
//         numMonth < 1 || 
//         numMonth > 12) {
//         return {
//             props: { hasError: true }
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }
//         }
//     }
    
//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }











export default FilteredEventPage;


export async function getServerSideProps(context) {

    const { params } = context;

    const filteredData = params.slug;

    const filterYear = filteredData[0];
    const filterMonth = filteredData[1];

    const numYear = +filterYear;
    const numMonth = +filterMonth;

    if (isNaN(numYear) || 
        isNaN(numMonth) || 
        numYear > 2030 || 
        numYear < 2021 || 
        numMonth < 1 || 
        numMonth > 12) {
        return {
            props: { hasError: true }
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    return {
        props: {
            events: filteredEvents,
            date : {
                year: filterYear,
                month: filterMonth
            }
        }
    }


}