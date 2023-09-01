export function calculateRotation(
  prevLat: number,
  prevLng: number,
  currentLat: number,
  currentLng: number,
  type: string
) {
  if (type == "rotating") {
    const deltaY = currentLat - prevLat;
    const deltaX = currentLng - prevLng;
    let rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    rotation += 90; 
   
    if (rotation < 0) {
      rotation += 360;
    } else if (rotation >= 360) {
      rotation -= 360;
    }

    return rotation;
  } else {
    return 0;
  }
}

export function calculateRotationDevices(prevLat: number, type: string) {
  if (type == "rotating") {
    return `${prevLat}deg`;
  } else {
    return "0deg";
  }
}
