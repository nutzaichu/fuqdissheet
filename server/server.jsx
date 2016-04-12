// Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function () {
  	return Tasks.find();
  });