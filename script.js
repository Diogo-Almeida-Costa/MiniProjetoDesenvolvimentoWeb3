document.addEventListener('DOMContentLoaded', 
    () => 
    {
        const form = document.getElementById('task-form');

        form.addEventListener('submit',
            (e) =>
            {
                e.preventDefault();

                const task = {
                    title: document.getElementById('title').value,
                    date: document.getElementById('date').value,
                    comment: document.getElementById('comment').value,
                    priority: document.getElementById('priority').value,
                    notify: document.getElementById('notify').checked,
                    createdAt: new Date().toISOString()
                };

                console.log('Tarefa cadastrada: ', task);

                form.reset();
            }
        );
    }
);