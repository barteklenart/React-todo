import React from 'react';

import TodoList from './TodoList';
import UniceId from '../utils/uniceid';

// require('./todo.scss');

class Todo extends React.Component {
	constructor(){
		super();
		this.state = {
			todo: []
		}
	}

	addTask(){
		const taskname = document.getElementById( 'taskname' );
		const tasktime = document.getElementById( 'tasktime' );
		const newTodoArr = this.state.todo;
		const taskNameString = taskname.value.trim().replace(/\s\s+/g, ' ');
		
		const tasks = {
			'taskname': taskNameString,
			'tasktime': tasktime.value
		}
		
		if( taskname.value === '' )
			return;

		newTodoArr.push( tasks );

		taskname.value = '';
		taskname.focus();
		tasktime.value = '';

		this.setState( {
			todo: newTodoArr
		} );
	}

	addClassToLast(){
		const allLiElements = Array.from( document.querySelectorAll( 'ul li' ) );

		if( allLiElements.length == 0 )
			return;

		allLiElements.map( ( val ) => { 
			val.classList.remove( 'open' );
		} );

		const lastElement = document.querySelector( 'ul li:last-of-type' );
		lastElement.classList.add( 'open' );
	}

	classRuner(){
		setTimeout( this.addClassToLast, 10 )
	}

	removeAfterDone( el, checker ){
		el.classList.add( 'done' );
		const elToFind = el.querySelector( '.content' ).innerText;
		const newTodoArr = this.state.todo.filter( e => {
			return e.taskname != elToFind 
		} );
		const alert = document.querySelector( '.info-alert' );
		alert.classList.add( 'done' );

		setTimeout( () => {
			el.classList.remove( 'done' );
			alert.classList.remove( 'done' );
			this.setState({
				todo: newTodoArr
			})
			checker.classList.remove( 'checked' )
		}, 1000 );
	}

	removeElement( el ){
		el.classList.add( 'remove' );
		const elToFind = el.querySelector( '.content' ).innerHTML;
		const newTodoArr = this.state.todo.filter( e => {
			return e.taskname != elToFind 
		} );

		el.classList.remove( 'remove' );
		this.setState({
			todo: newTodoArr
		})
	}

	handleKeyPress( e ){
		if( e.key !== 'Enter' )
			return;

		this.addTask();
	}

	render(){
		const todoList = this.state.todo.map( ( val, key ) => {
			const { taskname, tasktime } = val
			const isFirst = key == 0 ? 'first' : '';

			return <TodoList 
						key={ key } 
						id={ UniceId() } 
						iterate={ key } 
						isFirst={ isFirst } 
						taskname={ taskname }  
						tasktime={ tasktime } 
						handleEvent={ this.removeElement.bind(this) } 
						handleChecked={ this.removeAfterDone.bind(this) } 
					/>

		});

		return (
			<div>
				<h1 className="todo-header">TO DO LIST</h1>
				<p>
					<label for="input">Task: </label>
					<input 
						type="text" 
						id="taskname" 
						onKeyPress={ this.handleKeyPress.bind(this) }
					/>
				</p>
				<p>
					<label for="input-time">End Time: </label>
					<input 
						id="tasktime" 
						name="exit-time" 
						type="time" 
						onKeyPress={ this.handleKeyPress.bind(this) }
					/>
				</p>
				<button 
					onClick={ this.addTask.bind( this ) } 
					id="add" 
					className="add-button">Add task</button>
				<div className="separator">
					<img src="img/separator.png" alt=""/>
				</div>
				<ul>
					{ todoList }
					{ this.classRuner() }
				</ul>
				<div className="separator">
					<img src="img/separator.png" alt="" />
				</div>
				<div className="info-alert">
					<img src="img/hart.png" alt="" />
					<span className="info-alert-text">Good job!</span>
				</div>
			</div>
		)
	}
}

module.exports = Todo;