import React, { useEffect, useState } from "react";

const MyEvents = () => {

const [events,setEvents] = useState([]);

useEffect(()=>{

const fetchEvents = async () => {

try{

const res = await fetch(
"http://localhost:8000/api/v1/events/my-events",
{
method:"GET",
credentials:"include"
}
);

const data = await res.json();

if(data?.data){
setEvents(data.data)
}

}catch(err){
console.log(err)
}

}

fetchEvents()

},[])


const formatDate = (date) => {
return new Date(date).toLocaleDateString("en-IN",{
day:"numeric",
month:"short",
year:"numeric"
})
}

return (

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
My Registered Events
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{events.map((event)=>{

const registeredCount = event.registrations?.length || 0

return(

<div
key={event._id}
className="bg-white shadow rounded-xl overflow-hidden"
>

<img
src={`http://localhost:8000/${event.image}`}
className="h-40 w-full object-cover"
/>

<div className="p-4">

<h2 className="font-bold text-lg">
{event.title}
</h2>

<p className="text-sm text-gray-500">
📍 {event.location}
</p>

<p className="text-sm text-gray-500">
📅 {formatDate(event.eventDate)}
</p>

<p className="text-sm mt-2">
Seats: {registeredCount} / {event.maxParticipants}
</p>

<button
className="mt-3 w-full bg-green-600 text-white py-2 rounded"
disabled
>
Registered ✓
</button>

</div>

</div>

)

})}

</div>

</div>

)

}

export default MyEvents