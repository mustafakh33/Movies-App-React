import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    movies:[],
    movie:[],
    totalPages: null,
    pageCount: 0,
    loading: true,
    error: null,
}
// fetch data from Api
export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=07e569bcb453d0d4afd418b1a2957fea&language=en-US&page=1");
        const data = await res.json();
        return data.results;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
// get current page
export const getPage = createAsyncThunk(
    "movies/getPage",
    async (number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=07e569bcb453d0d4afd418b1a2957fea&language=en-US&page=${number}`);
        const data = await res.json();
        return data.results;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
// get total page
export const totalPage = createAsyncThunk(
    "movies/totalPage",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=07e569bcb453d0d4afd418b1a2957fea&language=en-US&page=1");
        const data = await res.json();
        return data.total_pages;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
// get movie by details
export const getMovieDatails = createAsyncThunk(
    "movies/getMovieDatails",
    async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=07e569bcb453d0d4afd418b1a2957fea&language=en-US`);
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
// to search in api
export const searchMovies = createAsyncThunk(
    "movies/searchMovies",
    async (word, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      if (word === "") {
        fetchMovies();
      } else{
          try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=07e569bcb453d0d4afd418b1a2957fea&query=${word}&language=en-US`);
            const data = await res.json();
            console.log("movies")
            console.log(data.results);
            return data.results;
          } catch (error) {
            return rejectWithValue(error.message);
          }
      }
    }
  );

export const moviesReducer = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //fetch movies
        builder.addCase(fetchMovies.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
          state.loading = false;
          state.movies = action.payload;
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
        // get current page
        builder.addCase(getPage.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
        builder.addCase(getPage.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
          });
        builder.addCase(getPage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        // get total page
        builder.addCase(totalPage.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
        builder.addCase(totalPage.fulfilled, (state, action) => {
            state.loading = false;
            state.totalPages = action.payload;
          });
        builder.addCase(totalPage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        // get movie by details
        builder.addCase(getMovieDatails.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
        builder.addCase(getMovieDatails.fulfilled, (state, action) => {
            state.loading = false;
            state.movie = action.payload;
          });
        builder.addCase(getMovieDatails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
        // to search in api
        builder.addCase(searchMovies.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
        builder.addCase(searchMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
          });
        builder.addCase(searchMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
  })


  export const { allMovies } = moviesReducer.actions
  export default moviesReducer.reducer