import { persistor, store } from "~store"

export {}
console.log("HELLO WORLD FROM BGSCRIPTS")

persistor.subscribe(() => {
  console.log("State changed with: ", store?.getState())
})
