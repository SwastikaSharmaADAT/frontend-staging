import React, { memo } from "react"
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps"
import { useRouter } from 'next/router'
import { exhibitionCountriesList } from '../../../utilities/exhibitionCountriesList'
import { useTranslation } from 'next-i18next'


// import world from '../../../public/assets/world.json'


const MapChart = ({ setTooltipContent }) => {

  // const loadData = () => JSON.parse(JSON.stringify(world));


  

  const router = useRouter()
  const { t } = useTranslation('countries')
  const countries = exhibitionCountriesList(t)

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 160 }}>
          <Geographies geography={'/assets/world-110m.json'}>
            {({ geographies }) =>
              geographies.map(geo => {
                if (geo.properties.NAME === 'Antarctica'){
                    return null
                }

                var hasExhibition = countries.find(function(o){ return geo.properties.NAME.includes(o.mapValue) })?.mapValue;
                
                return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onFocus={() => {
                    router.push({ pathname: '/exhibition', query: { country: hasExhibition } })
                  }}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: hasExhibition ? "#fff" : "#ccc",
                      stroke: "#222",
                      strokeWidth: '0.5',
                      cursor: "pointer",
                      pointerEvents: hasExhibition ? "all" : "none",
                    },
                    hover: {
                      fill: "#f5f5f5",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#fff",
                      outline: "none"
                    }
                  }}
                />
              )})
            }
          </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
