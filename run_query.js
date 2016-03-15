'use strict'
let gcloud = require('gcloud')
let fs = require('fs')
let bigquery = gcloud.bigquery({projectId: "scenic-helper-123908"})
fs.readFile(process.argv[2], 'utf8', (err, data) => {
  bigquery.startQuery(data, (err, job) => {
    if (!err) {
      job.getQueryResults((err,rows) => {
        if (!err) {
          let firsts = rows.map((d) => {return JSON.stringify(d['first_body'])})
          let lasts = rows.map((d) => {return JSON.stringify(d['last_body'])})
          fs.appendFileSync("firsts.txt", firsts.join("\n"))
          fs.appendFileSync("lasts.txt", lasts.join("\n"))
        }
      })
    } else {
      console.log(err)
    }
  })
})

