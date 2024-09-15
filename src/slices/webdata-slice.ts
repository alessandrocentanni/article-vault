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
    loading: false
  },
  reducers: {
    setLoading(state, action) {
      console.log("setting loading to ", action.payload)
      state.loading = action.payload || false
    }
  }
})

export const { setLoading } = webdataSlice.actions

export default webdataSlice.reducer
