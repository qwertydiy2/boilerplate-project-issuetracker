'use strict';
let mongoose=require('mongoose')
module.exports = function (app) {
	const { MongoClient } = require("mongodb");
const username = encodeURIComponent("qwertydiy");
let password = encodeURIComponent('Thekillerbasslose2-0')
const cluster = "freecodecamp-cluster.gf1kd.mongodb.net";
let uri =
`mongodb+srv://${username}:${password}@${cluster}`;
mongoose.connect(uri)
let issueSchema = mongoose.Schema({
	        project: String,
					title: {type: String, required: true},
					text: {type: String, required: true},
					author: String,
					assigned: String,
					status: String			
				})
			let Issue=mongoose.model('Issue',issueSchema)
	app.route('/api/issues/:project')
    .get(function (req, res){
      let project = req.params.project;
			Issue.find({project:project})
					.select(-project)
					.exec()
					.then(doc => {
    				console.log(doc)
						res.json(doc)
  				})
  				.catch(err => {
   					 console.error(err)
  				})
		})
    
    .post(function (req, res){
      let project = req.params.project;
      let issue=new Issue({
				project: project,
				title: req.body.issue_title,
				text: req.body.issue_text,
				author: req.body.created_by,
				assigned: req.body.assigned_to,
				status: req.body.status_text
			})
			issue.save()
				.then(doc => {
     			console.log(doc)
					let json = {"id":issue[_id],"issue_title":issue[text],"text":issue[author]}
					if(issue.assigned){
						json.assigned=issue.assigned
					}
					if (issue.status) {
						json.status=issue.status
					}
					res.json(json)
   			})
   			.catch(err => {
     			console.error(err)
   			})
    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
}
