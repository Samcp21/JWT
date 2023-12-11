import axios from "axios";

export const findById = async (id) => {
  // const entry = diaries.find((d) => d.id === id);
  console.log("findById", id);
  const { data } = await axios({
    method: "get",
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
  });
  const { name, abilities } = data;
  if (data) {
    return {
      nombre: name,
      habilidades: abilities,
    };
  } else {
    return undefined;
  }
  // if (entry != null) {
  //   const { comment, ...restOfDiary } = entry;
  //   return restOfDiary;
  // }
};

export const getEntriesWithoutSensitiveInfo = () => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility,
    };
  });
};

export const addDiary = (newDiaryEntry) => {
  const newDiary = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  };
  diaries.push(newDiary);
  return newDiary;
};
