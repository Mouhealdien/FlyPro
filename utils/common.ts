export const changeTime = (durations: string[]) => {
    let min = 60 * 24 - 1;
    let max = 0;
    for (const duration of durations) {
      const match = duration.match(/PT(\d+)H(\d+)M/);

      if (match) {
        const parsedHours = parseInt(match[1], 10);
        const parsedMinutes = parseInt(match[2], 10);
        const total = parsedHours * 60 + parsedMinutes;
        min = Math.min(min, total);
        max = Math.max(max, total);
      }
    }
    return [min, max];
  };

  export function checkTimeRange(time: string, startHour: number, endHour: number) {
    
    const start = new Date(time);
    start.setHours(startHour, 0, 0, 0);
  
    const end = new Date(time);
    end.setHours(endHour, 59, 59, 999);
    const date = new Date(time);
    return date >= start && date <= end;
  }
  export function checkDurationRange(duration, range) {
    const match = duration?.match(/PT(\d+)H(\d+)M/);
    if (match) {
      const totalMinutes = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
      return totalMinutes >= range[0] && totalMinutes <= range[1];
    }
    return true;
  }

  export function convertToHoursAndMinutes(value) {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours} hours ${minutes} minutes`;
  }