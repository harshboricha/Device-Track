const socket = io()//intilize the socket io it intializes a connection request to backend
console.log("heyyysss")

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
    const {latitude,longitude} = position.coords
    socket.emit("send-location",{latitude,longitude})
},(error)=>{
    console.error("error")
},{
    enableHighAccuracy:true, // high accurrancy 
    maximumAge:0, // no caching of the position thats why this is set as 0
    timeout:5000 // it will be only valid for 5 seconds then will ask the socket for another data sets

}
)
}

const map = L.map("map").setView([0,0],16) // we want 10 zoom and 0,0 are the cordinates where it should be placed in the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"OpenStreetMap"
}).addTo(map) // this the tile of the map and thats the url for it 


const markers ={}
//make a empty object of markers
socket.on("receive-location",(data)=>{
    const {id,latitude,longitude}=data
    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude])
        console.log(markers)
    }else{
    markers[id]=L.marker([latitude,longitude]).addTo(map)
    console.log(markers)// if the marker is empty we are seting the value and adding it to the map
    }

})


socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id]
    }
})