App = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
	    return {
	      sortBy: 'deadline',
	      isFormOpen: false
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

	toggleForm() {
		this.setState( {isFormOpen: ! this.state.isFormOpen} )
	},

	render() {
		return (
			<div className="container">
			<div className="row">
    			<div className="four columns">
    				<img className="logo" src="logo.png"/>
    				<h2 className="FuqText"> Fuq Dis Sheet, <br/> I'm done. </h2>
    				<p className="smallText"> Your last task manager </p>
    				<div className="creators">
    					<label>Created by</label>
    					<p>Jirat Onaree</p>
    					<p>Napat Changphasuk</p>
    					<p>Nuttapol Puntavachirapan</p>
    					<label>Inspired by their sheets</label>
    				</div>
    			</div>
    			<div className="eight columns">
	    			<header>		
		    				<h3 className="insertNewText">All Tasks</h3>
		    				<button 
		    					style={{'float': 'right'}} 
		    					onClick={this.toggleForm}
		    					className="button-primary"
		    				>
		    					{
		    						this.state.isFormOpen ?
		    							'x Close' : '+ New Task'
		    					}
		    				</button>
		    				<div className="signInButton">
								<AccountsUIWrapper />
							</div>
							
							{
								this.state.isFormOpen ?
									<form className="new-task" onSubmit={this.handleSubmit} >
									<div className="row" style={{'paddingTop': '5px'}}>
										<label style={{'color': 'rgb(117,191,232)'}}>Insert New Task</label>
									</div>
									  <div className="row">
									    <div className="six columns">
									      <label for="exampleEmailInput">Set Due Date</label>
									      <input 
									      	className="u-full-width"
											type="date" 
											ref="deadline"
											id="dateInput"
											/>
									      
									    </div>
									    <div className="six columns">
									      <label for="exampleRecipientInput">Set Priority</label>
									      <select className="u-full-width" id="exampleRecipientInput" ref="priority">
									        <option value="5">5 - Emergency</option>
											<option value="4">4 - High Priority</option>
											<option value="3">3 - Medium Priority</option>
											<option value="2">2 - Low Priority</option>
											<option value="1">1 - No Priority</option>
									      </select>
									      
									    </div>
									  </div>
									  <label for="exampleMessage">Task Detail</label>
									  <textarea className="u-full-width" className="inputTaskBox"
										ref="textInput"
										placeholder="I really want to get this done" ></textarea>
									  <input className="button-primary" type="submit" value="submit"/>
									  <hr/>
								</form> : ''
							}
						<label className="sort">Sort By :</label>
						<select ref="sort" 
							onChange={this.handleSort} 
							className="sort-dropdown"
						>
						  <option value="deadline">deadline</option>
						  <option value="priority">priority</option>
						  <option value="createdAt">dateCreated</option>
						</select>

					</header>
					
		          {this.renderTasks()}
		        

			    </div>
			  </div>
				
				
	      </div>
	      );
	}
});