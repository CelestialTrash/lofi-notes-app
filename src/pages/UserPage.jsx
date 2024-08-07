import "./UserPage.css";
import { useState } from "react";
import supabase from "../supabase/config";
import { useEffect } from "react";
import WarningEvent from "../components/WarningEvent";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import trashcanIcon from "../assets/trashcan-icon.png"
import base2 from "../assets/base2.png";
import cloud from "../assets/cloud.png";
import cloud2 from "../assets/cloud2.png";

function UserPage() {
  
  const [events, setEvents] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const { userId } = useParams();

  function getEvents() {
    supabase
      .from("events")
      .select()
      .eq("user_id", userId)
      .then((response) =>{ 
        console.log(response);
        if (response.data) {
          
          setEvents(response.data)}
        }
      )
        
      .catch((error) => {
        console.error(error)
      });
  }

  useEffect(() => {
    getEvents();
  }, []);

  function deleteEvent(id) {
    // First, delete all the tasks that reference the event
    supabase
      .from("tasks")
      .delete()
      .eq("event", id)
      .then(() => {
        // Once the tasks have been deleted, delete the event
        supabase
          .from("events")
          .delete()
          .eq("id", id)
          .then(() => {
            setShowWarning(false);
            getEvents();
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  const displayWarning = (id) => {
    console.log("Display warning");
    setShowWarning(true);
    setIdToDelete(id);
  };

  /*  in the UserPage (maybe also Event details page ) add the code:
<button onClick={() => displayWarning(id)}>🗑️</button> */

  return (
    <>
    <section className="user-page-section">
      <div className="create-event-container">
        <Link to={`/users/${userId}/events/create`}>
          <button>Create New Event</button>
        </Link>
      </div>

      <ul className="events-container">
        {events.map((eachEvent) => {
          return (
            <div className="event-relative" key={eachEvent.id}>
              <Link
                
                to={`/users/${userId}/events/${eachEvent.id}`}
              >
                <li className="event-card">
                  <div>
                    <h2>{eachEvent.title}</h2>
                    <h3>{eachEvent.date}</h3>
                    <div className="user-page-participants-container">
            {eachEvent.participants?.map((eachparticipant) => {
              return (
                <span key={eachparticipant} className="event-user-page-participants">
                  {eachparticipant}
                </span>
              );
            })}
          </div>
                    {/* <h3 className="participants">{eachEvent.participants}</h3> */}
                    {/* <p>{eachEvent.description}</p> */}
                  </div>
                </li>
              </Link>
              <button
                className="delete-button"
                onClick={() => displayWarning(eachEvent.id)}
              >
                <img src={trashcanIcon} alt="delete event" />
              </button>
            </div>
          );
        })}
      </ul>
      
      <img id="user-page-cloud1" src={cloud} alt="cloud" />
      <img id="user-page-cloud3" src={cloud} alt="cloud" />
      <img id="user-page-cloud2" src={cloud2} alt="cloud" />
      <img id="cat-base" src={base2} alt="cat base" />
      
    </section>
    {showWarning && (
      <WarningEvent
        deleteEvent={deleteEvent}
        idToDelete={idToDelete}
        setShowWarning={setShowWarning}
      />
    )}


    </>
  );
}

export default UserPage;
