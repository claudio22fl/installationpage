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
          setDevices({
            ...devices,
            ["label"]: parsedValue.label,
            ["cost"]: `${parsedValue.cost}`,
            ["value"]: `${parsedValue.value}`,
          });

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