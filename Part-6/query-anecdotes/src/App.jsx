import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })

  const updateAnecdoteVote = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (newVotes) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      const updatedAnecdotes = anecdotes.map((item) =>
        item.id === newVotes.id ? newVotes : item,
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    },
  })

  const handleVote = (anecdote) => {
    const anecdotes = queryClient.getQueryData(['anecdotes'])

    const newVotes = anecdotes
      .map((item) =>
        item.id === anecdote.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : item,
      )
      .find((a) => a.id === anecdote.id)
    // console.log(newVotes)
    updateAnecdoteVote.mutate(newVotes)
  }

  /*This replaces useEffect to fetch data from server*/
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  // const anecdotes = [
  //   {
  //     content: 'If it hurts, do it more often',
  //     id: '47145',
  //     votes: 0,
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
