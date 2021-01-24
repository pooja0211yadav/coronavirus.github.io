
function updateMap() {
    console.log("Updating map with realtime data")
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            // console.log(rsp.data)
            var arr_lat=[];
            var arr_lon=[];
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;
                arr_lat.push(latitude);

                arr_lon.push(longitude);
                
                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: "rgb(255,0,0)"
                }).setLngLat([longitude, latitude])
                .addTo(map); 
            });
        
            var lat2 = arr_lat.reduce((a, b) => {
                return Math.abs(b - lat1) < Math.abs(a - lat1) ? b : a;

            });
            var a = arr_lat.indexOf(lat2);
            var lon2 = arr_lon[a];
    // User Location             
            console.log(lat1);
            console.log(lon1);
    // hospital location 
            console.log(lat2);
            console.log(lon2);

            var dist=Math.sqrt(Math.pow((lat1-lat2),2)+Math.pow((lon1-lon2),2));
            console.log(dist*100+" km");
            
            var marker = new mapboxgl.Marker( {color: "rgb(255,255,0)"})
            .setLngLat([lon1,lat1])
            .addTo(map);
            
            var marker = new mapboxgl.Marker( {color: "rgb(0,255,0)"})
            .setLngLat([lon2,lat2])
            .addTo(map);
        })

}
let interval = 20000;
setInterval( updateMap, interval); 