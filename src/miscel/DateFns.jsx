import { format, parseISO, addDays, differenceInMinutes } from 'date-fns';



const date = new Date();

format(date, 'yyyy-MM-dd');       // 2025-01-24
format(date, 'dd MMM yyyy, hh a');      // 24 Jan 2025
format(date, 'hh:mm a');          // 03:45 PM
format(date, 'EEEE');             // Friday