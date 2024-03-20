import './App.css';
import * as React from 'react'
import {Map, Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {format} from 'timeago.js'
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pinAddSuccess = () => {
  toast.success("Added pin!")
}

const userNotLoggedIn = () => {
  toast.warning("Login to account to set pins!")
}
const userLoggedOut = (users) => {
  toast.warning("Logout from " + users)
}

const pinAddFailure = () => {
  toast.error("Couldn't add pin. Please fill all data")
}

function App() {

  const [pins,setPins]=React.useState([])
  const [newPlace,setNewPlace]=React.useState(null)

  const[viewPort,setViewPort]=React.useState({

  })

  const[currentPlaceID,setCurrentPlaceID]=React.useState(null)
  const[title,setTitle]=React.useState(null)
  const[descr,setDescr]=React.useState(null)
  const[rating,setRating]=React.useState(1)
  const[currentUser,setCurrentUser]=React.useState(null)
  const[showRegister,setShowRegister]=React.useState(false)
  const[showLogin,setShowLogin]=React.useState(false)
  
  const handleLogout = () => {
    userLoggedOut(currentUser)
    setCurrentUser(null)
  }

  const handlePinSubmit = async (e) => {
    e.preventDefault()

    const newPin = {
      userName : currentUser,
      title : title,
      descr : descr,
      rating : rating,
      lat : newPlace.lat,
      lon : newPlace.lng
    }

    try {
      if(!currentUser)
      {
        userNotLoggedIn()
      }
      else{
        const response = await axios.post("/pins",newPin)
        setPins([...pins,response.data])
        setNewPlace(null)
        pinAddSuccess()
        setRating(1)
        setDescr(null)
        setTitle(null)
        
      }
      

    } catch(err){
      console.log(err)
      pinAddFailure()
    }
  }
  const handleAddClick=(e)=>{
    console.log(e)
    let lat=e.lngLat.lat
    let lon=e.lngLat.lng

    setNewPlace({
      lat:lat,
      lng:lon
    })
  }

  const handleMarkerClicked=(id,lat,lon)=>{
    console.log(lat)
    console.log(lon)
    setCurrentPlaceID(id)
  }

  //////////////
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axios.post("/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        const imageUrl = response.data.imageUrl;
        // Set the imageUrl state or use it as needed
    } catch (error) {
        console.error("Error uploading image:", error);
    }
};

  ///////////////

  React.useEffect(()=>{
    const getPins=async()=>{
      try{
        const response=await axios.get("/pins")
        setPins(response.data)
      }
      catch(err){
        console.log(err)
      }
    }

    getPins()
  },[])

  return (
    <div>

      <Map
        container={'map'}
        projection={'globe'}
        initialViewState={viewPort}
        mapboxAccessToken={process.env.REACT_APP_TOKEN} 
        style={{width:"100vw",height:"100vw"}}
        mapStyle="mapbox://styles/selenag96/cltzo5pui00ni01quel1o2xid" 
        onDblClick={handleAddClick}
      >
      <ToastContainer position='top-left' theme='dark'/>

      <NavigationControl/>

      {
        pins.map(p=>(
          <>
            <Marker
              longitude={p.lon}
              latitude={p.lat}
              anchor='center'>

            <LocationOnIcon
            className='icon'
            onClick={()=>handleMarkerClicked(p._id,p.lat,p.lon)}
            style={{fontSize:viewPort.zoom*2,color:p.userName === currentUser ? "tomato" : "slateblue"}}
            />
            

            </Marker>

          {
            p._id===currentPlaceID&&
            (
              <Popup
              longitude={p.lon}
              latitude={p.lat}
              closeOnClick={false}
              closeOnMove={false}
              anchor='left'
              >
                <div className='card'>
                  <label>Place</label>
                  <h4 className='place'>{p.title}</h4>
                  <label>Review</label>
                  <p className='descr'>{p.descr}</p>
                  <label>Rating</label>
                  <div className='start'>
                    {Array(p.rating).fill(<StarIcon className='star'/>)}

                  </div>

              

                  <label>Information</label>
                  

                  <div className='info'>
                    <span className='username'>Created by<b>{p.userName}</b></span>
                    <span className='date'>{format(p.createdAt)}</span>

                  </div>


                </div>
              </Popup>
            )
          }

          </>
        ))
      }
      
      {
        newPlace &&
        <Popup
        longitude={newPlace.lng}
        latitude={newPlace.lat}
        closeOnClick={false}
        closeOnMove={false}
        onClose={()=>setNewPlace(null)}
        anchor='left'
        >

            <div>
                <form onSubmit={handlePinSubmit}> 
                  <label>Title</label>
                  <input placeholder='Enter a title...'
                  onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Review</label>
                  <textarea placeholder='Say something about this place...'
                  onChange={(e) => setDescr(e.target.value)}
                   />
                  <label>Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value= "1">1 </option>
                    <option value= "2">2 </option>
                    <option value= "3">3 </option>
                    <option value= "4">4 </option>
                    <option value= "5">5 </option>
                  </select>

                  ///////////

                  <label>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />

                  ///////////



                  <button className='submitButton' type = "submit">Add Pin</button>
                </form>
              </div>


        </Popup>
      }

      </Map>

      <div className='footer'>
        <div className='footer_down'>
          {
            currentUser ? (<button className='button logout' onClick={handleLogout}>Log out</button>)
            :
            (
              <div>
                 <button className='button login'
                 onClick={()=>{setShowLogin(true)}}
                 >
                    Login
                  </button> 

                  <button className='button register'
                  onClick={()=>{setShowRegister(true)}}>
                    Register
                  </button>
              </div>
            )
          }
        </div>
      </div>
      
        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser}/>}

    </div>
  );
}

export default App;
