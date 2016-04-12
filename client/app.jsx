App = React.createClass({

	mixins: [ReactMeteorData],
	
	getMeteorData() {
		
	    return {
	      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
	      currentUser: Meteor.user()
	    }
	},

	renderTasks() {
	    // Get tasks from this.data.tasks
	    return this.data.tasks.map((task) => {	 
	    	console.log(task)
	      return <Task
	        key={task._id}
	        task={task} />;
	    });
	},
	
	handleSort(event){
		event.preventDefault();
		sortBy = ReactDOM.findDOMNode(this.refs.sort).value;
	},

	handleSubmit(event) {
		event.preventDefault();
	    // Find the text field via the React ref
	    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
	    var deadline = ReactDOM.findDOMNode(this.refs.deadline).value;
	    var priority = ReactDOM.findDOMNode(this.refs.priority).value;
	    Meteor.call("addTask",text,deadline,priority);


	    // Clear form
	    ReactDOM.findDOMNode(this.refs.textInput).value = "";
	},

	render() {
		return (
			<div className="container">
			<header>
			<h1>Fuq dis sheet</h1>
			<AccountsUIWrapper />
			
			<select ref="sort" onchange={this.handleSort}>
			  <option value="deadline">deadline</option>
			  <option value="priority">priority</option>
			  <option value="createdAt">dateCreated</option>
			</select>

			<form className="new-task" onSubmit={this.handleSubmit} >
			
			<input
			type="text"
			ref="textInput"
			placeholder="Type to add new tasks" 
			/>

			<input 
			type="date" 
			ref="deadline"
			/>

			<select ref="priority">
			<option value="p5">5</option>
			<option value="p4">4</option>
			<option value="p3">3</option>
			<option value="p2">2</option>
			<option value="p1">1</option>
			</select>

			<input type="submit" value="submit"/>
			</form>
			</header>
		<ul>
          {this.renderTasks()}
        </ul>
      </div>
      );
	}
});