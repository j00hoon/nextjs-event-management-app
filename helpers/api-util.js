// export async function getAllEvents() {
//     const response = await fetch('https://nextjs-app-practice-1b753-default-rtdb.firebaseio.com/events.json');
//     const data = await response.json();

//     const eventList = [];

//     for (const key in data) {
//         eventList.push({
//             id: key,
//             ...data[key]
//         });
//     }

//     return eventList;
// }


export async function getFeaturedEvents() {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
  }






export async function getAllEvents() {
    const response = await fetch(
        'https://nextjs-app-practice-1b753-default-rtdb.firebaseio.com/events.json'
    );

    const data = await response.json();
    
    const eventsList = [];
    
    for (const key in data) {
        eventsList.push({
            id: key, 
            ...data[key]
        })
    }

    // return eventsList.filter((event) => event.isFeatured);
    return eventsList;
}


export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
  }




  export async function getFilteredEvents(dateFilter) {
    const allEvents = await getAllEvents();
    const { year, month } = dateFilter;
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }