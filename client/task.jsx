 // Task component - represents a single todo item
 Task = React.createClass({
   propTypes: {
    task: React.PropTypes.object.isRequired,
   },
  
  updateProgress(){
    var newProgress = ReactDOM.findDOMNode(this.refs.newProgress).value;
    Meteor.call("updateProgress",this.props.task._id,newProgress);
  },

  joinTask() {
	    Meteor.call("addWorker",this.props.task._id);
	},


   render() {
    var showInput = false;
    if(Meteor.userId()) showInput = true;
    else showInput = false;

   	var dif = moment(this.props.task.deadline).fromNow();
   	return (
         <li>
         <span className="task">
           <strong>{this.props.task.text}</strong> &nbsp; 
           {this.props.task.username} &nbsp; 
           {dif} &nbsp; 
           {this.props.task.priority} &nbsp; 
           {showInput ? <input type="range" min="0" max="100" 
                  ref="newProgress"
                  value={this.props.task.progress} 
                  onChange={this.updateProgress} />
                  : ''}
           &nbsp; 
           {this.props.task.worker} &nbsp;  
           {showInput ? <button className="delete" onClick={this.joinTask}>Join</button> : ''}
           </span>
         </li>
         )
   }
 });