package main

import (
  "log"
  "net/http"
  "fmt"
  "encoding/json"
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

type Question struct {
  Name string
  Email string
  Content string
}

type Reply struct {
  Id int
  Answer string
}

type UnansweredQuestion struct {
  Id int
  Name string
  Email string
  Content string
  Answer sql.NullString
  Created string
  Updated sql.NullString
}

type AnsweredQuestion struct {
  Id int
  Name string
  Email string
  Content string
  Answer string
  Created string
  Updated string
}

func checkErr(err error) {
  if err != nil {
      panic(err)
  }
}

// func sendErr(err  error, w http.ResponseWriter) {
//   if err != nil {
//     http.Error(w, err.Error(), http.StatusInternalServerError)
//     return
//   }
// }

func getQuestions(w http.ResponseWriter, r *http.Request) {
  fmt.Println(r)

  rows, err := db.Query("SELECT * FROM questions ORDER BY created desc")
  checkErr(err)
  
  answers := []UnansweredQuestion{}
  for rows.Next() {
    a := UnansweredQuestion{}
    err = rows.Scan(&a.Id, &a.Name, &a.Email, &a.Content, &a.Answer, &a.Created, &a.Updated)
    checkErr(err)
    answers = append(answers, a)
  }
  
  js, err := json.Marshal(answers)
  checkErr(err)

  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(200)
  w.Write(js)
}

func getAnsweredQuestions(w http.ResponseWriter, r *http.Request) {
  fmt.Println(r)
  
  rows, err := db.Query("SELECT * FROM questions WHERE answer IS NOT NULL ORDER BY created desc")
  checkErr(err)
  
  answers := []AnsweredQuestion{}
  for rows.Next() {
    a := AnsweredQuestion{}
    err = rows.Scan(&a.Id, &a.Name, &a.Email, &a.Content, &a.Answer, &a.Created, &a.Updated)
    checkErr(err)
    answers = append(answers, a)
  }
  
  js, err := json.Marshal(answers)
  checkErr(err)

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
    checkErr(err)

    stmt, err := db.Prepare("INSERT questions SET name=?,email=?,content=?")
    checkErr(err)
    
    res, err := stmt.Exec(q.Name, q.Email, q.Content)
    checkErr(err)
    
    id, err := res.LastInsertId()
    checkErr(err)
    
    js, err := json.Marshal(id)
    checkErr(err)
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(201)
    w.Write(js)
  }
}

func answerQuestion (w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
  
  if r.Method == "POST" {
    decoder := json.NewDecoder(r.Body)
    var rp Reply   
    err := decoder.Decode(&rp)
    checkErr(err)

    stmt, err := db.Prepare("update questions set answer=? where id=?")
    checkErr(err)

    res, err := stmt.Exec(rp.Answer, rp.Id)
    checkErr(err)

    affect, err := res.RowsAffected()
    checkErr(err)

    js, err := json.Marshal(affect)
    checkErr(err)
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(201)
    w.Write(js)
  }
}

func main() {
  var err error
  db, err = sql.Open("mysql", "root:1111@/ama")
  checkErr(err)
  defer db.Close()

  mux := http.NewServeMux()

  getIndex := http.FileServer(http.Dir("../../dist"))
  
  mux.Handle("/", getIndex)
  mux.HandleFunc("/getQuestions", getQuestions)
  mux.HandleFunc("/getAnsweredQuestions", getAnsweredQuestions)
  mux.HandleFunc("/askQuestion", askQuestion)
  mux.HandleFunc("/answerQuestion", answerQuestion)

  log.Println("Listening...")
  http.ListenAndServe(":3000", mux)
}

