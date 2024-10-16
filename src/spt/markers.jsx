import mapboxgl from 'mapbox-gl';
import '../App.css';

export const addMarker = (mapRef) => {
    mapRef.current.on('load', () => {
        mapRef.current.addSource('places', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {
                            description:
                                '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                            icon: 'theatre'
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-77.038659, 38.931567]
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            description:
                                '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                            icon: 'theatre'
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-77.003168, 38.894651]
                        }
                    },
                    {
                        type: 'Feature',
                        properties: {
                            description:
                                '<strong>HELLO FUTURE</strong><p><a href="https://www.hashinals.com/" target="_blank" title="Opens in a new window">Hashinals</a></p>',
                            icon: 'bar'
                        },
                        geometry: {
                            type: 'Point',
                            coordinates: [-77.090372, 38.881189]
                        }
                    },
                ]
            }
        });

        mapRef.current.addLayer({
            id: 'places',
            type: 'symbol',
            source: 'places',
            layout: {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            }
        });

        mapRef.current.on('click', 'places', (e) => {
            if (e.features.length > 0) {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<div class="custom-popup">${description}</div>`) // Add a custom class
                    .addTo(mapRef.current);
            }
        });

        mapRef.current.on('mouseenter', 'places', () => {
            mapRef.current.getCanvas().style.cursor = 'pointer';
        });

        mapRef.current.on('mouseleave', 'places', () => {
            mapRef.current.getCanvas().style.cursor = '';
        });
    });
};
