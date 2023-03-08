import React from 'react';
import { Table} from '@mantine/core';

type ScheduleItem = {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

const schedule: ScheduleItem[] = [
  { time: '7:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '8:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '9:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '10:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '11:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '12:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '1:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '2:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '3:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '4:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '5:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '6:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '7:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '8:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '9:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '10:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '11:00pm', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
  { time: '12:00am', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
];

const WeekSchedule = () => {
  return (
    <div style={{ maxWidth: "1000px", overflowX: "auto" }}>
    <Table highlightOnHover withBorder withColumnBorders  
    style={{ backgroundColor: "#ffffff", margin: "auto"}}
    
    >
    <thead>
    <tr>
    <th style={{ width: '10%' }}>Time</th>
    <th style={{ width: '15%' }}>Monday</th>
    <th style={{ width: '15%' }}>Tuesday</th>
    <th style={{ width: '15%' }}>Wednesday</th>
    <th style={{ width: '15%' }}>Thursday</th>
    <th style={{ width: '15%' }}>Friday</th>
    <th style={{ width: '15%' }}>Saturday</th>
    <th style={{ width: '15%' }}>Sunday</th>
    </tr>
    </thead>
    <tbody>
    {schedule.map((item, index) => (
    <tr key={index}>
    <td>{item.time}</td>
    <td>{item.monday}</td>
    <td>{item.tuesday}</td>
    <td>{item.wednesday}</td>
    <td>{item.thursday}</td>
    <td>{item.friday}</td>
    <td>{item.saturday}</td>
    <td>{item.sunday}</td>
    </tr>
    ))}
    </tbody>
    </Table>
    </div>
    );
    };
    
export default WeekSchedule;
