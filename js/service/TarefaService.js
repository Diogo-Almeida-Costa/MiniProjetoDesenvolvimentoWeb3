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
        const url = ``;
    }
}