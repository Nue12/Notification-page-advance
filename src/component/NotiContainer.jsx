import React from 'react'
import DataNoti from '../../data.json'
import Noti from './Noti'
import '../styles/NotiContainer.css'

export default function NotiContainer() {

  // individual noti parts
  const [noti, setNoti] = React.useState(DataNoti);
  
  function handleChecked(user) {
    setNoti(prevNoti => {
      const newNoti = [];
      for (let i = 0; i < prevNoti.length; i++) {
        const currentNoti = prevNoti[i];
        if (currentNoti.userName === user) {
          const updatedNoti = {
            ...currentNoti,
            checked: true,
          }
          newNoti.push(updatedNoti);
        } else {
          newNoti.push(currentNoti);
        }
      }
      return newNoti;
    })
  }
  
  // Noti props for interface from (database) data.json called DataNoti
  const notiSection = noti.map(notiData => {
    return(
    <Noti 
      handleChecked={handleChecked}
      key={notiData.userName}
      avatar={notiData.avatar}
      userName={notiData.userName}
      event={notiData.event}
      eventTarget={notiData.eventTarget}
      time={notiData.time}
      message={notiData.message}
      checked={notiData.checked}
      image={notiData.image}
    />
    )
  })

  // counting noti unread amount
  const [notiCount, setNotiCount] = React.useState(0);

  React.useEffect(() => {
    // If you don't know JavaScript reduce, learn it first.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let count = noti.reduce((previousCount, currentNotificationData) => {
      // If unread
      if (!currentNotificationData.checked) {
        return previousCount + 1;
      }
      // If read, do nothing
      return previousCount;
    }, 0) // Initial count is 0

    // Although the useEffect is ran twice, the count will be the same because it's re-calculated on every render.
    console.log('Count is ' + count);

    setNotiCount(count);
  }, [handleChecked])

  function markReadHandler() {
    const newDataNoti = [];
    noti.map(dataNoti => {
      const updatedNoti = {
        ...dataNoti,
        checked: true
      }
      newDataNoti.push(updatedNoti);
    })
    setNoti(newDataNoti);
    setNotiCount(0);
  }

  return (
    <main>  
      <div className='header-container'>
            <header>
                <h2>Notifications</h2>
                <h2 className='noti-amount'>{notiCount}</h2>
            </header>
            <button onClick={markReadHandler}>Mark all as read</button>
        </div>
      {notiSection}
    </main>
  )
}
