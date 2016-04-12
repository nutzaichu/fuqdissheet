// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

Meteor.methods({
	addTask(text,deadline,priority) {
		if (! Meteor.userId()) {
	    	alert("Please log in");
	    	throw new Meteor.Error("not-authorized");
	    }
	    else if(text==''){
	    	alert("Please fill task description");
	    	throw new Meteor.Error("no-description");
	    }
	    else if(deadline==''){
	    	alert("Please select deadline");
	    	throw new Meteor.Error("invalid-deadline");
	    }
	   Tasks.insert({
	    	text: text,
	    	createdAt: new Date(),
	    	deadline: deadline,
	    	priority: priority,
	    	owner: Meteor.userId(),
	    	username: Meteor.user().username || Meteor.user().profile.name,
	    	progress: 0,
	    	worker: [String]
	    });
	},

	addWorker(taskId){
		if (! Meteor.userId()) {
	    	throw new Meteor.Error("not-authorized");
	    }
	    var duplicate = false;
	    const task = Tasks.findOne(taskId);
	    var newWorker  = Meteor.user().username || Meteor.user().profile.name;
		for(var i=0; i<task.worker.length; i++){
			if(task.worker[i]===newWorker) {
				duplicate = true;
				break;
			}
		}
		if(!duplicate) Tasks.update(taskId,{$push: { worker: newWorker}});
	},

	updateProgress(taskId,newProgress){
		if (! Meteor.userId()) {
			alert("Please log in")
	    	throw new Meteor.Error("not-authorized");
	    }

 		var isWorker = false;
	    const task = Tasks.findOne(taskId);
	    var thisWorker  = Meteor.user().username || Meteor.user().profile.name;
	    for(var i=0; i<task.worker.length; i++){
			if(task.worker[i]===thisWorker) {
				isWorker = true;
				break;
			}
		}

		if(!isWorker){
	    	//throw new Meteor.Error("not-worker");
	    	return;
		}

		Tasks.update(taskId,{$set: { progress: newProgress}});
        console.log(task.progress);
	},

});