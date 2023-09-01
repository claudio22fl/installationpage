function getStartOfWeekFormatted(date: Date): string {
    const d = new Date(date);
    const day = d.getDay() || 7; // 0 es domingo, 1 es lunes, ..., 6 es sábado
    d.setDate(d.getDate() - day + 1); // Establece la fecha al primer día de la semana (lunes)
    
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const dayOfMonth = d.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${dayOfMonth}`;
  }

 
  const newDate = new Date();
  const d = new Date(new Date());

  const newDay = newDate.getDate();
  const newMonth = newDate.getMonth() + 1; // Los meses en JavaScript son base 0
  const newYear = newDate.getFullYear();


  d.setDate(d.getDate() - 1); // Obtener el día anterior
  
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const dayOfMonth = d.getDate().toString().padStart(2, '0');
  
 

  export const today =  `${newYear}-${newMonth}-${newDay}`;
  export const yesterday = `${year}-${month}-${dayOfMonth}`;
  export const week = getStartOfWeekFormatted(new Date());
  export const incialHours = "00:00:00";