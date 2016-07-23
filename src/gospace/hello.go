package main

import (
  "log"
  "net/http"
  "fmt"
  "encoding/json"
)

type Question struct {
  Id string
  Name string
  Email string
  Content string
}

func getQuestionsHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Println(r)
  // TODO: need to retreive the data from DB instead of sending the static data
  questions := []Question{
    Question{Id: "1", Name: "Jinsoo", Email: "jan@newmarch.name", Content: "hjjdagjadgh adjhlajghejltjh"},
    Question{Id: "2", Name: "adge", Email: "j.newmarch@boxhill.edu.au", Content: "aegjlahkjeg"},
  }

  js, err := json.Marshal(questions)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(200)
  w.Write(js)
}

func askQuestion (w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
  
  if r.Method == "POST" {
    decoder := json.NewDecoder(r.Body)
    var q Question   
    err := decoder.Decode(&q)
    // TODO: need to change q.Id and put in in DB
    js, err := json.Marshal(q)
    if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(201)
    w.Write(js)
  }
}

func main() {
  mux := http.NewServeMux()

  getIndex := http.FileServer(http.Dir("../../dist"))
  getQuestions := http.HandlerFunc(getQuestionsHandler)
  
  mux.Handle("/", getIndex)
  mux.Handle("/getQuestions", getQuestions)
  mux.HandleFunc("/askQuestion", askQuestion)

  log.Println("Listening...")
  http.ListenAndServe(":3000", mux)
}
