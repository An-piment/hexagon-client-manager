import React, { Component } from 'react';
import UserTable from '../../components/usertable/UserTable';
import Search from '../../components/search/Search';
import { getUsers } from '../../components/functions/userManager';
import styles from './MainPage.module.css'
import { showUsersOnPage, createPagination } from '../../components/functions/pagination';


export default class MainPage extends Component {
	state = {
		users: [],
		name: undefined,
		cpf: undefined,
		cidade: undefined,
		estado: undefined,
		currentPage: 1,
		usersPerPage: 2,
	};

	handlePagination = (currentPage) => {
		this.setState({
			currentPage,
		});
	}

	updateUsers = async () => {
		const users = await getUsers();
		this.setState({
			users,
		});
	};

	handleChange = ({ target }) => {
		const { name, value } = target;
		this.setState({
			[name]: value,
		});
	};

	filterUsers = (users) => {
		const { name, cpf, cidade, estado } = this.state;
		let filteredUsers = users;
		if (name) {
			filteredUsers = filteredUsers.filter(({ nome }) => 
				nome.toLowerCase().includes(name.toLowerCase()));
		}
		if (cpf) filteredUsers = filteredUsers.filter((user) => user.cpf.includes(cpf));
		if (cidade) filteredUsers = filteredUsers.filter((user) => 
			user.cidade.toLowerCase().includes(cidade.toLowerCase()));
		if (estado) filteredUsers = filteredUsers.filter((user) => 
			user.estado.toLowerCase().includes(estado.toLowerCase()));
		return filteredUsers;
	};

	async componentDidMount() {
		await this.updateUsers();
	}

	render() {
		const { users, name, cpf, cidade, estado, currentPage, usersPerPage } = this.state;
		const { history } = this.props;
		const filterInfos = {
			name,
			cpf,
			cidade,
			estado,
		};
		const filteredUsers = this.filterUsers(users);
		const paginationUsers = showUsersOnPage(filteredUsers, usersPerPage, currentPage)

		return (
			<div>
				<Search handleChange={ this.handleChange } filter={ filterInfos } />
				<div className={ styles.usersContainer }>
					<button
						type="button"
						className={ `btn btn-primary ${styles.buttonAdd}` }
						onClick={ () => history.push('/add') }
					>
						Adicionar
					</button>
					<UserTable users={ paginationUsers } handleChange={ this.updateUsers }/>
				</div>
				<nav aria-label="...">
					<ul 
						className="pagination pagination-lg"
					>
						{ createPagination(filteredUsers, usersPerPage, currentPage, this.handlePagination) }
					</ul>
				</nav>
			</div>
		);
	}
}
