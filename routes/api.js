"use strict";
let mongoose = require("mongoose");
module.exports = function (app) {
  const { MongoClient } = require("mongodb");
  const username = encodeURIComponent("qwertydiy");
  let password = encodeURIComponent("Thekillerbasslose2-0");
  const cluster = "freecodecamp-cluster.gf1kd.mongodb.net";
  let uri = `mongodb+srv://${username}:${password}@${cluster}`;
  mongoose.connect(uri);
  let issueSchema = mongoose.Schema({
    project: String,
    title: { type: String, required: [true, "This is required"] },
    text: { type: String, required: [true, "This is required"] },
    author: String,
    assigned: String,
    status: String,
  });
  let Issue = mongoose.model("Issue", issueSchema);
  app
    .route("/api/issues/:project")
    .get(function (req, res) {
      let project = req.params.project;
      Issue.find({ project: project })
        .select("-project, -__v")
        .exec()
        .then((doc) => {
          console.log(doc);
          res.json(doc);
        })
        .catch((err) => {
          console.error(err);
        });
      })

      .post(function (req, res) {
        let project = req.params.project;
      let IssueToSave = new Issue({
        project: project,
        title: req.body.issue_title,
        text: req.body.issue_text,
        author: req.body.created_by,
        assigned: req.body.assigned_to,
        status: req.body.status_text,
      });
      IssueToSave.save()
        .then((doc) => {
          console.log(doc);
          res.json({
            title: doc.title,
            text: doc.text,
            created_by: doc.created_by,
            assigned: doc.assigned,
            status: doc.status,
            created_on: new Date.now(),
            updated_on: new Date.now(),
            open: false,
          });
        })
        .catch((err) => {
          console.error(err);
          if (err == "This is required") {
            res.text({ error: "required field(s) missing" });
          }
        });
    })

    .put(function (req, res) {
      let project = req.params.project;
      if (req.body.open) {
        Issue.findByIdAndRemove(req.body._id)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        let updateIssueInformation = {};
        if (req.body.issue_title) {
          updateIssueInformation.issue = req.body.issue_title;
        }
        if (req.body.issue_text) {
          updateIssueInformation.issue_text = req.body.issue_text;
        }
        if (req.body.created_by) {
          updateIssueInformation.author = req.body.created_by;
        }
        if (req.body.assigned_to) {
          updateIssueInformation.assigned = req.body.assigned_to;
        }
        if (req.body.status_text) {
          updateIssueInformation.status = req.body.status_text;
        }
        Issue.findOneAndUpdate({ _id: req.body._id }, updateIssueInformation)
          .then((doc) => {
            console.log(doc);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })

    .delete(function (req, res) {
      let project = req.params.project;
      Issue.findByIdAndRemove(req.body._id)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        });
    });
};
