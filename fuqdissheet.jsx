// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");

Meteor.methods({
	addTask(text,deadline,priority) {
		if (! Meteor.userId()) {
	    	throw new Meteor.Error("not-authorized");
	    }
	   Tasks.insert({
	    	text: text,
	    	createdAt: new Date(),
	    	deadline: deadline,
	    	priority: priority,
	    	owner: Meteor.userId(),
	    	username: Meteor.user().username || Meteor.user().profile.name,
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
	    console.log(newWorker);
		if(!duplicate) Tasks.update(taskId,{$push: { worker: newWorker}});
	}

});