import { useState } from "react";
import { useFetchDevice } from "../services/Device";

export const useDataDevice = () => {
    const { device } = useFetchDevice();
    const [devices, setDevices] = useState({
        label: "",
        cost: "",
        value: "",
        imeigps: "",
        tipochip: "",
        numerochip: "",
      });

      const autocompleteChagueDevice = (name: string, value: any) => {
     
        let parsedValue;
        parsedValue = value;
    
        if (typeof parsedValue === "object") {
          // value es un JSON
          for (const key in parsedValue) {
            if (Object.hasOwnProperty.call(parsedValue, key)) {
              const element = parsedValue[key];
    
              if (key === name) {
                const upperCaseValue = element.toUpperCase();
                setDevices({
                  ...devices,
                  [key]: upperCaseValue,
                });
              }
            }
          }
        } else {
          const upperCaseValue = value.toUpperCase();
          setDevices({
            ...devices,
            [name]: upperCaseValue,
          });
        }
      };

      const handleChancheDevice = (e: {
        target: { name: string; value: string };
      }) => {
        const upperCaseValue = e.target.value.toUpperCase();
        setDevices({
          ...devices,
          [e.target.name]: upperCaseValue,
        });
      };
      

      return {devices, device,setDevices, autocompleteChagueDevice, handleChancheDevice}
    
}