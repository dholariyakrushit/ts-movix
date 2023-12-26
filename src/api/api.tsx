// export const fetchDataFromApi = async (
//   res: string,
//   search: string | null = null,
//   page: number = 1
// ) => {
//   // console.log(search);
//   const res1 = await fetch(
//     `https://api.themoviedb.org/3/${res}?api_key=fd57b735f9afe7a3542de3cc195afa4e&language=en-US&query=${search}&page=${page}&include_adult=false`
//   );

//   const data = await res1.json();
//   console.log(data);
//   return data;
// };

export const fetchDataFromApi = async (
  res: string,
  search: string | null = null,
  page: number = 1
): Promise<any> => {
  // console.log(res, search, page);
  const res1 = await fetch(
    `https://api.themoviedb.org/3/${res}?api_key=fd57b735f9afe7a3542de3cc195afa4e&language=en-US&query=${search}&page=${page}&include_adult=false`
  );

  const data = await res1.json();
  // console.log(res, search, page,data);
  return data;
};
