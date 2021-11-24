import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [edit, setEdit] = useState(false);
  const [person, setPerson] = useState({
    img: '/img/worker.jpg',
    name: 'Kirk Douglas',
    position: 'Front-end developer',
    status: 'On vacation'
  });

  const ref = useRef(null);

  const statusList = ['On vacation', 'Absent', 'On business trip', 'Active']

  const outsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setEdit(false)
    }
  };

  useEffect(()=> {
    document.addEventListener('click', outsideClick);

    return () => document.removeEventListener('click', outsideClick);
  }, []);

  const updatePerson = (field, value) => {
    setPerson({...person, [field]: value})
  };  

  return (
    <div ref={ref} className={'widget ' + (edit ? 'active' : '')}>
      <div className={'window'} onClick={()=> setEdit(!edit)}>
        <span className={'img'} style={{backgroundImage: `url(${person.img})`}}/>
        <div>          
          <div className='name'>{person.name}</div>
          <div className='position'>{person.position}</div>
          <div className='status'>{person.status}</div>
        </div>
      </div>
      {edit && (
        <div className={'popover'}>
          <span>Name</span>
          <input type="text" value={person.name} onChange={(e) => updatePerson('name', e.target.value)}/>
          <span>Position</span>
          <input type="text" value={person.position} onChange={(e) => updatePerson('position', e.target.value)}/>
          <span>Status</span>
          <ul>
            {statusList.map(status => <li className={person.status === status ? 'active' : ''} key={status} onClick={() => updatePerson('status', status)}>{status}</li>)}
          </ul>
        </div> 
      )}       
    </div>
  );
}

export default App;