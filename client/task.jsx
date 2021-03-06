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
	    Meteor.call("joinTask",this.props.task._id);
	},

  unjoinTask() {
      Meteor.call("unjoinTask",this.props.task._id);
  },  

  deleteTask() {
      Meteor.call("deleteTask",this.props.task._id);
  },  

   render() {
    var showInput = false;
    if(Meteor.userId()) showInput = true;
    else showInput = false;

    var showJoin = false;
    var showLeave = false;
    var isExisted = false;
    
    if (Meteor.user()) {
      var thisWorker  = Meteor.user().username || Meteor.user().profile.name;

      for(var i=0; i<this.props.task.worker.length; i++){
        if(this.props.task.worker[i]===thisWorker) {
          isExisted = true;
          break;
        }
      }
      if(isExisted) showLeave = true;
      else showJoin = true;
    }

   	var dif = moment(this.props.task.deadline).fromNow();
    var pri = this.props.task.priority
    var priClass = classNames('priority', {five: pri == '5'}, {four: pri == '4'}, {three: pri == '3'}, {two: pri == '2'}, {one: pri == '1'})
   	return (
         <div className="row">
            <div className="twelve columns">
              <div className="task">
                <div className={priClass}></div>
               <h4>{this.props.task.text}</h4> 
               <p className="creator">created by &nbsp;
                  <strong>{this.props.task.username}</strong> &nbsp; 
                  {moment(this.props.task.createdAt).fromNow()} 
                </p>
                {showInput ? 
                    <i className="fa fa-trash delete" 
                        aria-hidden="true"
                        onClick={this.deleteTask}

                    >
                    </i> 
                    : ''
                }
                <hr/>
                <div className="sub row">
                  <div className="six columns verticle-border">
                    <p>Due Date :&nbsp;{moment(this.props.task.deadline).format('DD MMMM YYYY')}</p>
                    <label>{dif}</label>
                    
                    <h1>{this.props.task.progress}% <span className="done">done</span></h1>

                    {showInput ? <input type="range" min="0" max="100" 
                      ref="newProgress"
                      value={this.props.task.progress} 
                      onChange={this.updateProgress}/>
                      : ''}
                  </div>


                  <div className="six columns workers">
                    <p>All Workers</p>
                    <ul>
                      {this.renderWorkers()}
                    </ul>  
               {showJoin ? <button className="join button-primary" onClick={this.joinTask}>Join</button> : ''}
               {showLeave ? <button className="unjoin" onClick={this.unjoinTask}>Leave</button> : ''}
               
                  
                  </div>
                </div>

             </div>
            </div>
         </div>
         )
   },
   renderWorkers() {
    if (this.props.task.worker.length == 0)
      return <label>No Worker...</label>
    return this.props.task.worker.map(worker => {
      return <li key={worker}>{worker}</li>
    })
   }
 });