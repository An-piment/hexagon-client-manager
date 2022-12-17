import React, { Component } from 'react';
import styles from './UserTable.module.css';
import Delete from '../../images/delete.svg';
import Edit from '../../images/edit.svg';
import { Link } from 'react-router-dom';
import { alertMessage } from '../functions/alert';
import { deleteUser } from '../functions/userManager';

export default class UserTable extends Component {
  handleDelete = async (nome, id) => {
    const { handleChange } = this.props;
    const alertResult = await alertMessage(
      `Tem certeza que deseja deletar o usuário ${nome}? Essa ação é irreversível!`,
      'deletado');
      if (alertResult === "success") {
        await deleteUser(id);
        await handleChange();
      }
  }

  displayUser = (users) => users
    .map(({ id, nome, idade, estado_civil, cpf, cidade, estado }) => (
      <tr key={ id }>
      <td>{ id }</td>
      <td>{ nome }</td>
      <td>{ idade }</td>
      <td>{ estado_civil }</td>
      <td>{ cpf }</td>
      <td>{ cidade }</td>
      <td>{ estado }</td>
      <td>
        <Link to={ `/edit/${id}` }>
          <button 
            type="button"
            className="btn btn-outline-info optionsButton"
          >
            <img src={ Edit } alt="Edit Button" />
          </button>             
        </Link>           
        <button 
          type="button"
          className="btn btn-outline-danger optionsButton"
          onClick={ () => this.handleDelete(nome, id) }
        >
          <img src={ Delete } alt="Delete Button" />
        </button>         
      </td>   
      </tr>
    ))
  
	render() {
    const { users } = this.props;
		return (
			<main className={ styles.userTable }>
        <table className={ styles.users }>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Estado Civil</th>
            <th>CPF</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Opções</th>
          </tr>
          { this.displayUser(users) }
        </table>				
			</main>
		)
	}
}
