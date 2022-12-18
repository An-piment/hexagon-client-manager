import Swal from "sweetalert2";

export const alertMessage = (message, action) => Swal.fire({
  title: 'Atenção !!!',
  text: message,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Sim'
}).then(async (result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Concluído!',
      `O usuário foi ${action}.`,
      'success'
    )
    return 'success'
  } else return 'cancel';
});

export const formError = () => Swal
  .fire({
    icon: 'error',
    title: 'Atenção !!!',
    text: 'Todos os campos precisam ser preenchidos!',
  });
