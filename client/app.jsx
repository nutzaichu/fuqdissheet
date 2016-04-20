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
    				<img className="logo" src="logo.png"/>
<<<<<<< HEAD
    				<p className="FuqText"> Fuq Dis Sheet, <br/> I'm done. </p>
    				<p className="smallText"> Your Last To-Do Task Manager </p>
=======
>>>>>>> ccffae1d94635bddb9fccf3e59ba2b5bade48f51
    			</div>
    			<div className="eight columns">
	    			<header>		
		    				<p className="insertNewText">Insert New Task</p>
		    				<div className="signInButton">
							<AccountsUIWrapper />
							</div>
						<br/>
						
							<input className="inputTaskBox"
								type="text"
								ref="textInput"
								placeholder="I really want to get this done" 
								/>
							<br/>
							
							<form className="new-task" onSubmit={this.handleSubmit} >
								<p> Set Due Date : </p>
								<input 
								type="date" 
								ref="deadline"
								/>
								<p> Set Priority : </p>

								<select ref="priority">
								<option value="5">5 - Emergency</option>
								<option value="4">4 - High Priority</option>
								<option value="3">3 - Medium Priority</option>
								<option value="2">2 - Low Priority</option>
								<option value="1">1 - No Priority</option>
								</select>

							<input type="submit" value="submit"/>
							</form>
						
						<select ref="sort" onChange={this.handleSort} >
						  <option value="deadline">deadline</option>
						  <option value="priority">priority</option>
						  <option value="createdAt">dateCreated</option>
						</select>

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