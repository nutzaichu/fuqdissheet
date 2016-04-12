 // Task component - represents a single todo item
 Task = React.createClass({
   propTypes: {
    task: React.PropTypes.object.isRequired,
   },
   
   joinTask() {
	    Meteor.call("addWorker",this.props.task._id);
	},

   render() {
   	var dif = moment(this.props.task.deadline).fromNow();
   	return (
         <li>
         <span className="task">
           <strong>{this.props.task.text}</strong> &nbsp; 
           {this.props.task.username} &nbsp; 
           {dif} &nbsp; 
           {this.props.task.priority} &nbsp; 
           {this.props.task.worker} &nbsp; 
         </span>
         <button className="delete" onClick={this.joinTask}>Join</button>
         </li>
         )
   }
 });