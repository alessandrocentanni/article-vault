import { createSlice } from "@reduxjs/toolkit"

export interface WebdataState {
  loading: boolean
  url: string
  title: string
  description: string
  author: string
  content: string
}

const webdataSlice = createSlice({
  name: "webdata",
  initialState: {
    loading: false,
    url: "",
    title: "",
    description: "",
    author: "",
    content: ""
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    addWebdata(state, action) {
      state.author = action.payload.author
      state.url = action.payload.url
      state.title = action.payload.title
      state.description = action.payload.description
      state.content = action.payload.content
    },
    resetWebdata(state) {
      state.author = ""
      state.url = ""
      state.title = ""
      state.description = ""
      state.content = ""
    }
  }
})

export const { setLoading, addWebdata, resetWebdata } = webdataSlice.actions

export default webdataSlice.reducer
