export const picFilms = {
    methods: {
        picFilms(param) {
            setTimeout(() => {
                this.films = [];
                let url;
                this.picked = param.picked;
                if (param.picked == "movie") {
                    url = `http://api.themoviedb.org/3/discover/${param.picked}?api_key=8089a6eb2db7e1328d6cacafa1b57a70&sort_by=popularity.asc&include_adult=false&include_video=false&year=${param.currentYear}`
                } else {
                    url = `http://api.themoviedb.org/3/discover/${param.picked}?api_key=8089a6eb2db7e1328d6cacafa1b57a70&sort_by=popularity.asc&first_air_date_year=${param.currentYear}&include_null_first_air_dates=false`
                }

                fetch(url)
                    .then((response) => response.json())
                    .then((answer) => {
                        //перебираем полученные с сервера данные
                        for (let i in answer.results) {
                            //сортируем полученный массив на основании популярности
                            const sorted = answer.results.sort((prev, curr) => prev.popularity - curr.popularity);
                            //пушим полученный массив в массив вывода фильмов для отображения на стрнанице
                            this.films.push(sorted[i])
                        }                        
                    });

            })
        }
    },
}
