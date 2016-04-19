App = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
	    return {
	      sortBy: 'deadline'
	    }
	  },
	
	getMeteorData() {
	    if(this.state.sortBy ==='priority'){
	      	return {
	      	tasks: Tasks.find({},{sort:{priority: -1}}).fetch(),
	      	currentUser: Meteor.user()
	      	}
	    }
	    else if(this.state.sortBy==='deadline'){
	      	return {
	      	tasks: Tasks.find({},{sort:{deadline: 1}}).fetch(),
	      	currentUser: Meteor.user()
	      	}
	    }
	    else{
	      	return {
	      	tasks: Tasks.find({},{sort:{createdAt: -1}}).fetch(),
	      	currentUser: Meteor.user()
	      	}
	    }
	},

	renderTasks() {
	    // Get tasks from this.data.tasks
	    return this.data.tasks.map((task) => {	 
	      //console.log(task);
	      return <Task
	        key={task._id}
	        task={task} />;
	    });
	},

	handleSort(){
		var sortValue = ReactDOM.findDOMNode(this.refs.sort).value;
		console.log("CHANGE TO " + sortValue);
		 this.setState({
     		 sortBy: sortValue
    });
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
			<div className="row">
    			<div className="four columns">
    				<img src="logo.png"/>
    			</div>
    			<div className="eight columns">
	    			<header>		
						<AccountsUIWrapper />
						
						<select ref="sort" onChange={this.handleSort} >
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
							<option value="5">5 - Emergency</option>
							<option value="4">4 - High Priority</option>
							<option value="3">3 - Medium Priority</option>
							<option value="2">2 - Low Priority</option>
							<option value="1">1 - No Priority</option>
							</select>

						<input type="submit" value="submit"/>
						</form>
					</header>
					<ul>
		          {this.renderTasks()}
		        </ul>

			    </div>
			  </div>
				
				
	      </div>
	      );
	}
});