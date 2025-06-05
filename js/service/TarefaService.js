import { Tarefa } from '../model/Tarefa';

const FIREBASE_BASE_URL = "https://tarefa-desenvolvimento-web-default-rtdb.firebaseio.com/tarefas.json";

export class TarefaService
{
    async addTarefa(dadosTarefa)
    {
        try
        {
            const resposta = await fetch(FIREBASE_BASE_URL, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dadosTarefa),
                }
            );

            if(!resposta.ok)
            {
                throw new Error("Erro ao adicionar tarefa");
            }

            const data = await resposta.json();
            return data;
        } 
        catch(error)
        {
            console.error("Erro ao salvar tarefa: ", error);
            throw new Error("Algo não deu certo ao salvar tarefa");
        }
    }

    async tarefasFetch()
    {
        try
        {
            const resposta = await fetch(FIREBASE_BASE_URL);

            if(!resposta.ok)
            {
                throw new Error("Erro ao carregar tarefas");
            }

            const objetosTarefa = await resposta.json();
            const listaTarefas = [];

            if(objetosTarefa)
            {
                for(const key in objetosTarefa)
                {
                    const tarefa = new Tarefa({
                        id: key,
                        title: objetosTarefa[key].title,
                        date: objetosTarefa[key].date,
                        comment: objetosTarefa[key].comment,
                        priority: objetosTarefa[key].priority,
                        notify: objetosTarefa[key].notify,
                        created: objetosTarefa[key].created,
                    });
                    listaTarefas.push(tarefa);
                }
            }
            return listaTarefas;
        }
        catch(error)
        {
            console.error("Erro ao buscar tarefas", error);
            throw new Error("Algo deu errado ao buscar tarefas");
        }
    }

    async updateTarefa(tarefaId, dadoAlterado)
    {
        const url = `https://tarefa-desenvolvimento-web-default-rtdb.firebaseio.com/tarefas/tarefas/${tarefaId}.json`;

        try
        {
            const resposta = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadoAlterado),
            });

            if(!resposta.ok)
            {
                throw new Error("Erro para atualizar tarefa");
            }
            return await resposta.json();
        }
        catch(error)
        {
            console.error("Erro ao atualizar tarefa:", error);
            throw new Error("Algo deu errado ao atualizar a tarefa");
        }
    }

    async deletarTarefa(tarefaId)
    {
        const url = `https://tarefa-desenvolvimento-web-default-rtdb.firebaseio.com/tarefas/${tarefaId}.json`;

        try
        {
            const resposta = await fetch(url, {
                method: "DELETE",
            });

            if(!resposta.ok)
            {
                throw new Error("Erro para remover tarefa");
            }
            return true;
        }
        catch(error)
        {
            console.error("Erro para deletar tarefa:", error);
            throw new Error("Algo deu errado para deletar a tarefa");
        }
    }
}