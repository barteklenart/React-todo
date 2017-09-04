import React from 'react';

class TodoList extends React.Component {

	removeElement( e ){
		const target = e.target;
		this.props.handleEvent( target.parentNode );
		console.log( target.parentNode );
	}

	checkedElement( e ){
		const target = e.target;
		target.classList.add( 'checked' );
		this.props.handleCheked( target.parentNode, target );
	}

	render(){
		const iterate = this.props.iterate + 1;
		return (
			<li data-key={ this.props.id } className={ this.props.isFirst }>
				<span className="left-shape"></span>
				<div className="task-content">
					<span className="content">{ this.props.taskname }</span>
					<span className="time">{ `${this.props.tasktime} Wykonaj zadanie ${iterate}` }</span>
				</div>
				<span className="check" onClick={ this.checkedElement.bind(this) }></span>
				<span className="del" onClick={ this.removeElement.bind(this) }>X</span>
			</li>
		)
	}
}

module.exports = TodoList;