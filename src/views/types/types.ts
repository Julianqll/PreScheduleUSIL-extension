export type ScheduleItem = {
    id: number;
      time: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
      color?: string;
      mondayData?: string;
      tuesdayData?: string;
      wednesdayData?: string;
      thursdayData?: string;
      fridayData?: string;
      saturdayData?: string;
      sundayData?: string;
}

export type HorarioCurso = {
    dia?: String;
    horas?: number[];
}

export type CursoItem = {
    id?: string;
    nombre?: string;
    color?: string;
    horario?: HorarioCurso[]
}
