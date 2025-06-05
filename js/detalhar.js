document.addEventListener('DOMContentLoaded', () => 
{
    const parametros = new URLSearchParams(location.search);
    const id = parametros.get('id');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefa = tarefas.find(t => String(t.id) === id);
    const detalhar = document.querySelector('#task-detail .card-body');

    console.log("ID da URL:", id);
    console.log("Tarefa carregadas:", tarefa);


    if(tarefa)
    {
        const now = new Date();
        const dueDate = tarefa.date ? new Date(tarefa.date) : null;
        const atrasada = dueDate && dueDate < now;
        detalhar.innerHTML = `
            <h5 class="card-title"> ${tarefa.title} </h5>
            <p><strong>Data da tarefa:</strong> ${tarefa.date || '—'}</p>
            <p><strong>Data de criação:</strong> ${new Date(tarefa.created).toLocaleString()}</p>
            <p><strong>Comentário:</strong> ${tarefa.comment || '—'}</p>
            <p><strong>Prioridade:</strong> ${tarefa.priority}</p>
            <p><strong>Status:</strong> <span class="${atrasada ? 'text-danger' : 'text-success'}">${atrasada ? 'Atrasada' : 'No prazo'}</span></p>
        `;
    }
    else
    {
        detalhar.innerHTML = '<p class="text-danger"> Tarefa não encontrada. </p>';
    }

    document.getElementById('back-btn').addEventListener('click', () => 
    {
        window.location.href = 'index.html';
    });
});