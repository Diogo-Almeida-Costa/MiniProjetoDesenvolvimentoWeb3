document.addEventListener('DOMContentLoaded', 
    () => 
    {
        const form = document.getElementById('task-form');
        const listarElementos = document.getElementById('task-list');
        const mensagemVazia = document.getElementById('empty-message');
        let tarefas = [];

        form.addEventListener('submit',
            (e) =>
            {
                e.preventDefault();

                const tarefa = {
                    id: Date.now(),
                    title: document.getElementById('title').value,
                    date: document.getElementById('date').value,
                    comment: document.getElementById('comment').value,
                    priority: document.getElementById('priority').value,
                    notify: document.getElementById('notify').checked,
                };

                console.log('Tarefa cadastrada: ', tarefa);

                tarefas.push(tarefa);

                carregarTarefas();

                form.reset();
            }
        );

        function carregarTarefas()
        {
            listarElementos.innerHTML = '';

            if(tarefas.length === 0)
            {
                mensagemVazia.style.display = 'block';
                return;
            }

            mensagemVazia.style.display = 'none';

            tarefas.forEach(tarefa => 
            {
                const col = document.createElement('div');
                col.className = 'col-12 col-md-6';

                const card = document.createElement('div');
                card.className = 'card border-${tarefa.priority} mb-3';

                const body = document.createElement('div');
                body.className = 'card-body d-flex justify-content-between align-items-start';

                const info = document.createElement('div');
                info.innerHTML = `
                    <h5 class="card-title text-${tarefa.priority}"> ${tarefa.title} </h5>
                    <p class="card-text"><small class="text-muted"> ${tarefa.date || 'Sem data'} </small></p>
                    <p class="card-text"> ${tarefa.comment || ''} </p>
                `;

                const btnDiv = document.createElement('div');
                btnDiv.className = 'd-flex flex-column gap-2';
                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-outline-danget btn-sm';
                btnDelete.textContent = 'Remover';
                btnDelete.addEventListener('click', () => removerTarefa(tarefa.id));

                btnDiv.appendChild(btnDelete);
                body.append(info, btnDiv);
                card.appendChild(body);
                col.appendChild(card);
                listarElementos.appendChild(col);
            }
            );
        }

        function removerTarefa(id)
        {
            tarefas = tarefas.filter(t => t.id !== id);
            carregarTarefas();
        }
    }
);



