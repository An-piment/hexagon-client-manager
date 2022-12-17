import React, { Component } from 'react';
import styles from './ManageUser.module.css'
import { getUsers, updateUser, addUser } from '../../components/functions/userManager';
import { alertMessage, formError} from '../../components/functions/alert';

export default class ManageUser extends Component {
	state = {
		nome: '',
		idade: '',
		estado_civil: '',
		cpf: '',
		cidade: '',
		estado: '',
		id: ''
	};

	async componentDidMount () {
		let users = await getUsers();
		const { type } = this.props;
		if ( type === "add" ) {
			this.setState({
				id: users[users.length-1].id + 1,
				estado_civil: 'Solteiro(a)',
				estado: 'AC',
			});
			return;
		}

		const { id } = this.props.match.params;
		users = users.find((user) => user.id === parseInt(id));
		const { nome, idade, cpf, estado_civil, cidade, estado } = users;

		this.setState({
			id,
			nome,
			idade,
			estado_civil,
			cpf,
			cidade,
			estado,
		});
	}

	handleChange = ({ target }) => {
		const { name, value } = target;
		this.setState({
			[name]: value,
		});
	};

	handleBack = () => {
		const { history } = this.props;
		history.push('/');
	}

	handleSave = async () => {
		if (Object.values(this.state).some((state) => state === '')) {
			formError()
			return;
		}
		const { nome, idade, cpf, estado_civil, cidade, estado, id } = this.state;
		const { type } = this.props;
		let personId, message, option;
		if (type === 'edit') {
			personId = this.props.match.params.id;
			message = `Tem certeza que deseja atualizar os dados do usuário ${nome}?`;
			option = "atualizado";
		}
		else {
			personId = id;
			message = `Tem certeza que deseja adicionar o usuário?`;
			option = "adicionado";
		}

		const { history } = this.props;
		const data = {
			id: personId,
			nome,
			idade,
			cpf,
			estado_civil,
			cidade,
			estado
		};
		const alertResult = await alertMessage(message, option);
		if (alertResult === 'success') {
			if ( type === 'edit') await updateUser(personId, data)
			else addUser(personId, data)
			history.push('/');
		}
	}

	createCivilStateOptions = () => {
		const civilStates = ["Solteiro(a)", "Casado(a)", "Separado(a)","Divorciado(a)","Viúvo(a)"];
		const { estado_civil } = this.state;
		return civilStates.map((civilState, index) => (
			<option 
				value={ civilState }
				key={ index }
				selected={ estado_civil === civilState }
			>{ civilState }</option>
		));
	}

	createStateOptions = () => {
		const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
		const { estado } = this.state;
		return states.map((state, index) => (
			<option 
				value={ state }
				key={ index }
				selected={ estado === state }
			>
				{ state }
			</option>
		));
	}	

	render() {
		const { nome, idade, cpf, cidade } = this.state;
		const { type } = this.props;
		return (
			<>
				<section className={ styles.editBox }>
					<h1 className={ styles.editUserTitle }>
						{type === "edit" ? "Editar Usuário" : "Adicionar Usuário"}
					</h1>
					<div className={ styles.nameCPF}>
						<div className={`form-floating mb-3 ${ styles.infoInput }`}>
							<input 
								type="text"
								className="form-control"
								placeholder="Digite um nome"
								name="nome"
								value={ nome }
								onChange={ this.handleChange }
							/>
							<label htmlFor="floatingInput">Nome</label>
						</div>					
						<div className={`form-floating mb-3 ${ styles.infoInput }`}>
							<input 
								type="number"
								className="form-control"
								placeholder="Digite um CPF"
								name="cpf"
								value={ cpf }
								onChange={ this.handleChange }
							/>
							<label htmlFor="floatingInput">CPF</label>
						</div>
					</div>
					<div className={ styles.ageCivilState}>
						<div className={ `form-floating mb-3 ${ styles.ageInput }` }>
							<input 
								type="number"
								className="form-control"
								placeholder="Digite a idade"
								name="idade"
								value={ idade }
								onChange={ this.handleChange }
							/>
							<label htmlFor="floatingInput">Idade</label>
						</div>
						<div className={ styles.civilStateInput }>
							Estado Civil
							<select 
								className={ `form-select form-select-sm ${ styles.civilStateInput }` } 
								onChange={ this.handleChange }
								name="estado_civil"
							>
								{ this.createCivilStateOptions() }
							</select>
						</div>
					</div>
					<div className={ styles.stateCity }>
						<div className="form-floating mb-3">
							<input 
								type="text"
								className="form-control"
								placeholder="Digite uma cidade"
								name="cidade"
								value={ cidade }
								onChange={ this.handleChange }
							/>
							<label htmlFor="floatingInput">Cidade</label>
						</div>						
						<div className={ styles.stateInput }>
							Estado
							<select 
								className={ `form-select form-select-sm ${ styles.stateInput }` }
								onChange={ this.handleChange }
								name="estado"
							>
								{ this.createStateOptions() }
							</select>
						</div>			
					</div>
				</section>
				<section className={ styles.buttonArea }>
					<button 
						type="button" 
						className="btn btn-success"
						onClick={ this.handleSave }
					>
						{ type === "edit" ? "Salvar" : "Adicionar" }
					</button>
					<button 
						type="button"
						className="btn btn-primary"
						onClick={ this.handleBack }
					>
						Voltar
					</button>
				</section>
			</>
		);
	}
}
