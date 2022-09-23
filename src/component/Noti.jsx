import React from 'react'
import '../styles/Noti.css'

export default function Noti(props) {

  const { avatar, userName, event, time, eventTarget, message, checked, image } = props;

  function convertLongNote(event) {
    if ( event === "react" ) {
        return "reacted to your recent post";
    } else if ( event === "follow" ) {
        return "followed you";
    } else if ( event === "join group" ) {
        return "has joined your group";
    } else if ( event === "sent private message" ) {
        return "sent you a private message";
    } else if ( event === "comment" ) {
        return "commented on your picture";
    } else if ( event === "leave" ) {
        return "left the group";
    }
}

  return (
    <section 
        key={userName} 
        onClick={() => props.handleChecked(userName)}
        className={checked ? "noti-containerChecked": "noti-containerNoChecked"}
    >
        <div className='avatarAndNoti'>
            <img src={avatar} alt={`${userName}'s avatar`} className='avatar' />
            <div>
                <div className='noti-line'>
                    <p>
                        <strong className='userName'>{userName} </strong>
                        {convertLongNote(event)}
                        {
                            eventTarget &&
                            <strong className='eventTarget'> {eventTarget}</strong>
                        }
                        <span className={!checked ? "uncheckedDot" : ""}></span>
                    </p>
                </div>
                <p>{time}</p>
                {
                    message && <div className='message'>{message}</div>
                }
            </div>
        </div>
        {
            image && <img srcSet={image} alt="img" className='img' />
        }
    </section>
  )
}
