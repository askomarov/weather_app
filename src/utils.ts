export const rounded = (value: number) => Math.round(value);

export const calculateDewPoint = (
  temperature: number,
  humidity: number
): number => {
  // Формула для расчета точки росы (в градусах Цельсия)
  const dewPoint: number = Number((temperature - (100 - humidity) / 5).toFixed(0));

  return dewPoint;
};
