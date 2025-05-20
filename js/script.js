document.addEventListener('DOMContentLoaded', 
    () => 
    {
        const form = document.getElementById('task-form');
        const listarElementos = document.getElementById('task-list');
        const mensagemVazia = document.getElementById('empty-message');
        let tarefas = [];
        const filtros = document.getElementById('sort-tasks');
        const btnForm = document.getElementById('form-btn');
        const btnCancelar = document.getElementById('cancel-edit');
        const editarId = document.getElementById('edit-id');

        const salvo = localStorage.getItem('tarefas');
        tarefas = salvo ? JSON.parse(salvo) : [];

        carregarTarefas();

        form.addEventListener('submit',
            (e) =>
            {
                e.preventDefault();

                const idEdit = editarId.value;
                const idNum = idEdit ? Number(idEdit) : Date.now();
                const dataCriada = idEdit ? tarefas.find(t => t.id === idNum).created : new Date().toISOString();

                const tarefa = {
                    id: idNum,
                    title: document.getElementById('title').value.trim(),
                    date: document.getElementById('date').value,
                    comment: document.getElementById('comment').value.trim(),
                    priority: document.getElementById('priority').value,
                    notify: document.getElementById('notify').checked,
                    created: dataCriada
                };


                if(idEdit)
                {
                    tarefas = tarefas.map(t => t.id === idNum ? tarefa : t);
                }
                else
                {
                    tarefas.push(tarefa);
                }

                localStorage.setItem('tarefas', JSON.stringify(tarefas));

                resetarForm();
                carregarTarefas();
            }
        );

        filtros.addEventListener('change', () => carregarTarefas());

        btnCancelar.addEventListener('click', () => 
        {
            resetarForm();
        });

        function resetarForm()
        {
            form.reset();
            editarId.value = '';
            btnForm.textContent = 'Adicionar Tarefa';
        }

        function carregarTarefas()
        {
            listarElementos.innerHTML = '';

            const ordenado = [...tarefas];

            const ordenar = filtros.value;

            ordenado.sort((a, b) => 
            {
                switch(ordenar)
                {
                    case 'createdAsc': return new Date(a.created) - new Date(b.created);
                    case 'createdDesc': return new Date(b.created) - new Date(a.created);
                    case 'dueAsc': return (a.date ? new Date(a.date) : 0) - (b.date ? new Date(b.date) : 0);
                    case 'dueDesc': return (b.date ? new Date(b.date) : 0) - (a.date ? new Date(a.date) : 0);
                    case 'priority': return a.priority.localeCompare(b.priority);
                    case 'alpha': return a.title.localeCompare(b.title);
                    default: return 0;
                }
            }
            );

            if(ordenado.length === 0)
            {
                mensagemVazia.style.display = 'block';
                return;
            }

            mensagemVazia.style.display = 'none';

            ordenado.forEach(tarefa => 
            {
                const col = document.createElement('div');
                col.className = 'col-12 col-md-6';

                const card = document.createElement('div');
                card.className = `card border-${tarefa.priority} mb-3`;

                const body = document.createElement('div');
                body.className = 'card-body d-flex justify-content-between align-items-start';

                const info = document.createElement('div');
                info.innerHTML = `
                    <h5 class="card-title text-${tarefa.priority}"> ${tarefa.title} </h5>
                    <p class="card-text"><small class="text-muted"> ${tarefa.date || 'Sem data'} </small></p>
                    <p class="card-text"><small class="text-muted"> Priodade da tarefa: ${tarefa.priority} </small></p>
                `;

                const btnDiv = document.createElement('div');
                btnDiv.className = 'd-flex flex-column gap-2';
                const btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-outline-danget btn-sm';
                btnDelete.textContent = 'Remover';
                btnDelete.addEventListener('click', () => removerTarefa(tarefa.id));
                const btnDetalhe = document.createElement('button');
                btnDetalhe.className = 'btn btn-outline-secondary btn-sm';
                btnDetalhe.textContent = 'Detalhar';
                btnDetalhe.addEventListener('click', () => 
                {
                    window.location.href = `detalhe.html?id=${tarefa.id}`;
                });
                const btnEdicao = document.createElement('button');
                btnEdicao.className = 'btn btn-outline-warning btn-sm';
                btnEdicao.textContent = 'Editar';
                btnEdicao.addEventListener('click', () =>
                {
                    editarId.value = tarefa.id;
                    document.getElementById('title').value = tarefa.title;
                    document.getElementById('date').value = tarefa.date;
                    document.getElementById('comment').value = tarefa.comment;
                    document.getElementById('notify').checked = tarefa.notify;
                    document.getElementById('priority').value = tarefa.priority;
                    btnForm.textContent = 'Salvar Alterações';
                }
                );

                btnDiv.appendChild(btnDetalhe);
                btnDiv.appendChild(btnDelete);
                btnDiv.appendChild(btnEdicao);
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
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            carregarTarefas();
        }
    }
);